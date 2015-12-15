Meteor.publish("uri", function () {
   return URI.find();
 });

Meteor.publish("events", () => Events.find());

var github = new GitHub({
    version: "3.0.0", // required
    timeout: 5000     // optional
});

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
});
