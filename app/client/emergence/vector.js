Session.setDefault("modalcontext", undefined);


/* Process a text and replace the emergence hashkeys by the title
 * adds a link to the corresponding emergence page
 */
var template = (vect) => (vect.slug)? `<a href="/emergence/${vect.type}/${vect.slug}">"${vect.title}"</a>`:
                                      `<a href="/emergence/hash/${vect.id}">"${vect.title}"</a>`;
UI.registerHelper("process", function(text){
  var rego = new RegExp('(?:\#[0-9a-zA-Z]*)','g');
  var new_text = text;
  while (match=rego.exec(text)) {
    let vec = Vector.findOne({_id:match[0].replace("#","")});
    var new_text = new_text.replace(match[0], (vec)? template(vec) : match[0]);
  }
  console.log('processing', new_text);
  return new_text
});
UI.registerHelper("process_nolinks", function(text){
  var rego = new RegExp('(?:\#[0-9a-zA-Z]*)','g');
  var new_text = text;
  while (match=rego.exec(text)) {
    let vec = Vector.findOne({_id:match[0].replace("#","")});
    var new_text = new_text.replace(match[0], (vec)? `<span class="nolinks">"${vec.title}"</span>` : match[0]);
  }
  console.log('processing', new_text);
  return new_text
});


Template.VectorText.events({
  "submit .comment_form": function(e, t){
    e.preventDefault();
    let text = e.target.textarea.value;
    let title = "";
    let user = Meteor.userId();
    e.target.textarea.value = "";
    // e.target.title.value = "";
    console.log(text);
    Meteor.call("new_vect", [Session.get("vectkey")], text, user, 'comment', title, null);
  },
});

Template.EmergenceVector.helpers({
  vector(){
    let vectkey = Session.get("vectkey")
    let new_vect = Vector.findOne({id: vectkey});
    if (! typeof new_vect === "undefined") Session.set("vect", new_vect)
    return Session.get("vect", new_vect)},
});

// Remap the elements object into an array for easier processing
let element_array = Object.keys(Meteor.elements).sort().map(e=>Meteor.elements[e]);

Template.VectorRelationships.helpers({
  relationship: () => element_array,
  item: function() {
    var self = this
    // get all the ids that are contained in the current object targets
    let idval = (Session.get("vect"))? (typeof Session.get("vect").targets === "object")? {"$in": Session.get("vect").targets} : {"$in":[Session.get("vect").targets]} : null;
    // get both the current targets and the other vectores that have this key in their target
    let rel = Vector.find({"$or": [{targets:Session.get("vectkey")}, {_id:idval} ]});
    // This get all the target ids and ids
    let all_id = [].concat.apply([], rel.map(e=>[].concat([e._id], e.targets))).filter(e=>(e === Session.get("vectkey"))? undefined : e);
    //console.log('all ids', all_id);
    return Vector.find({type:self.id, _id:{'$in':all_id}})
  },
  find_relationships: function(id){
    return Vector.find({type:"relationship", '$and':[{targets:Session.get("vectkey")}, {targets:id}]})
  }
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


Template.VectorJSON.helpers({
  data() {
    return JSON.stringify(this, undefined, 2);
  },
});
