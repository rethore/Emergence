Meteor.subscribe("uri");
Meteor.subscribe("events");
Meteor.subscribe("relationships");

Session.setDefault("events", []);
Session.setDefault("modalcontext", undefined);


UI.registerHelper("equals", (a, b) => (a == b));
UI.registerHelper('formatTime', c =>  moment(c).format('MM/DD/YYYY, hh:mm'));
UI.registerHelper('shortSHA', sha => sha.slice(0, 5));
UI.registerHelper("not_undefined", val => !val);
UI.registerHelper("undefined", val => (typeof val === "undefined"));


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
    return Events.find({doi: this.doi}, {sort:{created_at:-1}})},
  checked: function() {
    return Session.get("checked_git_repo_"+this.origine.user+'_'+this.origine.repo);
  },
});

Template.DOI_Related.events({
  "click .rest-call": function(event, template){
      Meteor.call('populate', this.doi);
  },
});

Template.DOI_pdf.helpers({
  src: function() {
    let uri = URI.findOne({doi: this.doi})
    return !uri? "" : uri.hasOwnProperty('pdf_src')? uri.pdf_src: ""
  },
});

Template.DOI_pdf.events({
  "click .get_pdf": function(event, template){
    console.log('in DOIpdf client');
      Meteor.call('scihub', this.doi);
  },
});
