Meteor.publish("uri", () => URI.find());
Meteor.publish("events", () => Events.find());

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
  register: function(doi) {
    if (typeof URI.findOne({doi}) == "undefined") {
      crossref(doi);
    }
  },
  google: function(query) {
    console.log('in google', query);

    // xray('http://reddit.com', '.content')(function(err, title) {
    //   if (err) {
    //     console.log('danm', err);
    //   } else {
    //   console.log('in xray', title); // Google
    // }});

    let res = Async.runSync(function(done) {
      console.log('in Async');
      xray('http://google.com', 'title')(function(err, title) {
        if (err) {
          console.log('danm', err);
          done(err, null);
        } else {
        console.log('in xray', title); // Google
        done(null, title);
      }
    })})
    console.log('res', res);
},
});
