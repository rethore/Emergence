UI.registerHelper("process", function(text){
  var rego = new RegExp('(?:\#[0-9a-z]*)','g');
  var new_text = text;
  while (match=rego.exec(text)) {
    let vec = Vector.findOne({_id:match[0].replace("#","")});
    new_text = new_text.replace(match[0], (vec)? '<a href="/emergence/' + vec.type + '/' + vec.slug + '">"'+vec.title+'"</a>' : "blabla");
    console.log("found:", match[0], new_text, vec)
  }
  return new_text
}
)

Template.EmergenceVector.helpers({
  vector: () => Session.get("vect"),
});

// Remap the elements object into an array for easier processing
let element_array = Object.keys(Meteor.elements).sort().map(e=>Meteor.elements[e]);

Template.VectorRelationships.helpers({
  relationship: () => element_array,
  item() {
    let idval = (Session.get("vect"))? (typeof Session.get("vect").target === "object")? {"$in": Session.get("vect").target} : {"$in":[Session.get("vect").target]} : null;
    return Vector.find({"$or": [
      {type:this.id, target:Session.get("vectkey")},
      {type:this.id, _id:idval} ]})
  },
});

Template.VectorRelationships.helpers({
  github_stats: () => {return {
    n_commits:2,
    n_forks:4,
    n_open_issues:5,
    n_closed_issues:10,
    n_stars:12,
    n_subscribers:250,
  }},
});

Template.VectorSummary.helpers({
  event_type: () => "github_event",
  summaries: () => [
    {text: "blabla"},
    {text: "blabla2"},
  ],
  edit: () => null,
});
