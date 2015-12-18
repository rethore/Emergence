Meteor.publish("uri", () => URI.find());
Meteor.publish("events", () => Events.find());
Meteor.publish("relationships", () => Relationships.find());

var github = new GitHub({
    version: "3.0.0", // required
    timeout: 5000     // optional
});

var fs = Npm.require('fs');
github_creds = YAML.safeLoad(fs.readFileSync(process.env.PWD + '/.github', 'utf8'));
console.log('path to github creds:',process.env.PWD + '/.github');
// OAuth2 Key/Secret
github.authenticate({
    type: "oauth",
    key: github_creds.GITHUB_ID,
    secret: github_creds.GITHUB_SECRET
})


var crossref = function(doi) {
  let url = 'http://api.crossref.org/works/' + doi;
  HTTP.get(url, function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
      let msg = res.data.message;

      URI.insert({doi,
        url: msg.URL,
        title: msg.title,
        author: msg.author.map(o => ({
          first: o.given,
          last: o.family,
          affiliation: o.affiliation,
        })),
        issn: msg.issn,
        issue: msg.issue,
        date: msg.issued["date-parts"][0],
        journal: msg["container-title"][msg["container-title"].length-1],
        publisher: msg.publisher,
        year: msg.issued["date-parts"][0][0],
      });
    }
  })
};

var X_Ray = Meteor.npmRequire("x-ray");
var xray = new X_Ray();

function computeCommits (user, repo) {
  return new Promise(function(resolve, reject) {
    github.repos.getCommits({user, repo, per_page:100}, promoteError(reject, function(res) {
      followPages(resolve, reject, 0, res);
    }));
  });
}

function followPages (resolve, reject, result, res) {
  result = result + res.length;
  if (github.hasNextPage(res)) {
    github.getNextPage(res, promoteError(reject, function(res) {
      followPages(resolve, reject, result, res);
    }));
  }
  else {
    resolve(result);
  }
}

function promoteError (reject, resolve) {
  return function(err, res) {
    if (err) {
      if (err.hasOwnProperty("message") && /rate limit exceeded/.test(err.message)) {
        rateLimitExceeded = true;
      }

      console.error("caught error: %s", err);
      reject(err);
    }
    else {
      resolve(res);
    }
  };
}

// var gitcommits = new Promise((resolve) => {
//   github.repos.getCommits({user, repo, per_page:1}, (err, res)=>{
//    console.log('stats1', err, res);
//    github.getNextPage(res, (err, res) => {
//      console.log('stats2', err, res);
//    })
//     }
//   })
// });

Meteor.methods({
  /*
   * Populate the Event db using the registered relationships
   */
  populate: function(doi) {
    let github_stats = Relationships.find({doi: doi, type: "github"})
      .map(({user, repo}) => {
        console.log('in populate', user, repo)
        if (!URI.findOne({user, repo, type: "github"})) URI.insert({user, repo, type: "github"})
        github.events.getFromRepo({user, repo, per_page:100})
          .forEach((c2) => {
            if (!Events.findOne({doi, id:c2.id})) {
              // Add the event, with the doi and the origine
              Events.insert(Object.assign(c2, {doi:doi, origine:{user, repo}}));
            }});
        console.log('next page?',github.hasNextPage())
        // TODO: Figure out the next page thing
        github_stats = Meteor.call("github_stats", user, repo);
        github_stats.n_commits = Meteor.call("github_commits", user, repo);
        github_stats.n_closed_issues = Meteor.call("github_closed_issues", user, repo)
        return github_stats
      }) //map
      .reduce((s1, s2)=> {  // Now lets add those github_stats together
        for( var el in s1 ) {
          if( s2.hasOwnProperty( el ) ) {
            s1[el] = s1[el] + s2[el];
          }
        }
        return s1;
      });
      console.log('finally', github_stats);
      URI.update({doi}, {$set: {stats:{github:github_stats}}});
  },

  /*
   * Get all the events from a repo and record the new ones in the event db
   *
   */
  github: function(user, repo, doi) {
    if (!URI.find({user, repo, type: "github"})) URI.insert({user, repo, type: "github"})
    github.events.getFromRepo({user, repo, per_page:100})
      .forEach((c) => {
        // Check that the event isn't already in the db
        if (!Events.findOne({doi:doi, id:c.id})) {
          // Add the event, with the doi and the origine
          Events.insert(Object.assign(c, {doi, origine:{user, repo}}));
  }})},


  /*
   * Get the stats from github
   */
   github_stats: function(user, repo) {
     console.log('inside github stats', user, repo);
     let rep_data = github.repos.get({user, repo})
     let github_stats = {
        n_forks: rep_data.forks_count,
        n_stars: rep_data.stargazers_count,
        n_open_issues: rep_data.open_issues,
        n_subscribers: rep_data.subscribers_count,
      };
     URI.update({type:"github", user, repo}, {$set:github_stats});
     return github_stats;
    },

    github_closed_issues: function(user, repo) {
      var issues = github.issues.repoIssues({user, repo, state:"closed"});
      console.log('issues', issues.length);
      return issues.length
    },

    github_commits: function(user, repo) {
      // TODO: This is very slow for large repos!
      let n_commits_promise = computeCommits(user, repo);
      let n_commits = Promise.await(n_commits_promise);
      URI.update({type:"github", user, repo}, {$set:{n_commits}});
      console.log('n_commits', n_commits);
      return n_commits;
   },

  /*
   * register is registering the URI in the database by calling several online
   * services
   */
  register: function(doi) {
    if (!URI.findOne({doi})) crossref(doi)
  },

  /*
   * Sci-Hub is providing a link to the full text pdf.
   *
   * x-ray is crashing if sci-hub is crashing, so it's not very stable.
   * There must be a way to catch the error of xray in order to avoid that,
   * but I haven't fount it yet
   * UNTIL THEN DO NOT USE.
   *
   * TODO: detect when the url is not responding before doing a query on xray
   */
  scihub: function(doi) {
    console.log('in scihub', doi);

    let {result, error} = Async.runSync(function(done) {
      url = 'http://sci-hub.io/' + doi;
      console.log('in Async', url);
      try { // <= TODO: fix this
        xray(url, "body div#content iframe@src")(function(err, embed_src) {
          if (err) {
            console.log('danm', err);
          } else {
          console.log('in xray', embed_src);
          done(err, embed_src);
          }
        })
      } catch (e) {
        console.log(e);
        done(e, null);
      }

    })
    if (error) {
      console.log('error', error)
    } else {
      console.log('res', result);
      URI.update({doi: doi}, {$set: {pdf_src: result}});
    }
  },

  register_relationship: function(item) {
    console.log("in the server", item);
    Relationships.insert(item);
    // Now update
    Meteor.call("populate", item.doi);
  },
});
