Meteor.subscribe("uri");
Meteor.subscribe("events");

Session.setDefault("events", []);


// Used for switch-case scenario in the templates
UI.registerHelper("equals", function (a, b) {
  return (a == b);
});
UI.registerHelper('formatTime', function(context, options) {
  if(context)
    return moment(context).format('MM/DD/YYYY, hh:mm');
});

UI.registerHelper('shortSHA', function(sha){
  return sha.slice(0, 5)
});

Template.DOI_Summary.helpers({
  summary: function() { return "Summary of " + this.doi },
});

Template.DOI_Citations.helpers({
  citation: [{names: "Rethore et al.", year: 2013},
             {names: "Abdallah et al.", year: 2013}],
});

Template.DOI_CitedBy.helpers({
  citation: [{names: "Rethore et al.", year: 2013},
             {names: "Abdallah et al.", year: 2013}],
});


Template.DOI_Related.helpers({
  event: function() {
    return Events.find({doi: this.doi})},
});

Template.DOI_Related.events({
  "click .rest-call": function(event, template){
      Meteor.call('github', 'rethore', 'waketor', this.doi);

    // NOT REACTIVE ENOUGH!?!
    //   HTTP.get(url, function(err, res) {
    //     if (err) {
    //       console.log('damn', err);
    //     } else {
    //       if (res.statusCode === 200) {
    //         var new_res = res.data.slice();
    //         Session.set('events', new_res);
    //         Tracker.autorun();
    //         console.log('success!', res);
    //     }
    //   }
    // });
  },
});
