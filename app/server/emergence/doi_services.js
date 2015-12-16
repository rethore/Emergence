Meteor.publish("uri", () => URI.find());
Meteor.publish("events", () => Events.find());
Meteor.publish("relationships", () => Relationships.find());

var github = new GitHub({
    version: "3.0.0", // required
    timeout: 5000     // optional
});

var crossref = function(doi) {
  let url = 'http://api.crossref.org/works/' + doi;
  HTTP.get(url, function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(res);

      URI.insert({doi,
        url: res.data.message.URL,
        title: res.data.message.title,
        author: res.data.message.author.map( function(curr, i, arr) { return {
          first: curr.given,
          last: curr.family,
          affiliation: curr.affiliation,
        }}),
        issn: res.data.message.issn,
        issue: res.data.message.issue,
        date: res.data.message.issued["date-parts"][0],
        journal: res.data.message["container-title"][res.data.message["container-title"].length-1],
        publisher: res.data.message.publisher,
        year: res.data.message.issued["date-parts"][0][0],
      });
    }
  })
};

var X_Ray = Meteor.npmRequire("x-ray");
var xray = new X_Ray();

Meteor.methods({
  populate: function(doi) {
    Relationships.find({doi: doi, type: "github"})
      .forEach(function(c1) {
        github.events.getFromRepo({user:c1.user, repo:c1.repo})
          .forEach(function(c2) {
            // Check that the event isn't already in the db
            let item = Events.findOne({doi:doi, id:c2.id});
            if (typeof item === 'undefined') {
              // Add the event, with the doi and the origine
              Events.insert(Object.assign(c2, {doi:doi, origine:{user:c1.user, repo:c1.repo}}));
    }})})},

  /*
   * Get all the events from a repo and record the new ones in the event db
   */
  github: function(user, repo, doi) {
    github.events.getFromRepo({user, repo})
      .forEach(function(curr, i, arr){
        // Check that the event isn't already in the db
        let item = Events.findOne({doi:doi, id:curr.id});
        if (typeof item == 'undefined') {
          // Add the event, with the doi and the origine
          Events.insert(Object.assign(curr, {doi, origine:{user, repo}}));
  }})},

  /*
   * register is registering the URI in the database by calling several online
   * services
   */
  register: function(doi) {
    if (typeof URI.findOne({doi}) == "undefined") {
      crossref(doi);
    }
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
