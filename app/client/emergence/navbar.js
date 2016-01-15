UI.registerHelper("there_is", function(value){
  return this.hasOwnProperty(value)
});


Template.DOI_Navbar.helpers({
  publication: function(){
    let publi = URI.findOne({doi: this.doi});
    if ( typeof publi == "undefined" ) {
      Meteor.call('register', doi=this.doi);
      return {title: 'loading ...'}
    } else {return publi}},
});

var menu = [
  {text: "Related", icon: "fa-link", items: [
    {text: "URL/DOI", icon: "fa-link"},
    {text: "Slideshow", icon: "fa-desktop"},
    {text: "Video", icon: "fa-film"}]},
  {text: "Discuss", icon: "fa-comments-o", items: [
    {text: "Comment", icon: "fa-comments-o"},
    {text: "Review", icon: "fa-gavel"},
    {text: "Raise a Question", icon: "fa-question-circle"}]},
  {text: "Extend", icon: "fa fa-arrows-v", items: [
    {text: "Summarise", icon: "fa-compress"},
    {text: "Popularize", icon: "fa-globe"},
    {text: "Add a keyword", icon: "fa-list"}]},
  {text: "Register", items: [
    Meteor.elements.question,
    {text: "Hypothesis / Method", icon: "fa-question-circle"},
    {text: "Experiment", icon: "fa-cogs",},
    {text: "Observation", icon: "fa-star-o",},
    {text: "Result", icon: "fa-star-o",},
    {text: "Dataset", icon: "fa-database",},
    {text: "Reproduction", icon: "fa-clone",},
    {text: "Version", icon: "fa-code-fork",},
  ],},
  {text: "Integrate", items: [
    {text: "Workspaces", separator: false},
    Meteor.elements.osf,
    Meteor.elements.sharepoint,

    {text: "Repositories", separator: true},
    Meteor.elements.github,
    Meteor.elements.gitlab,
    Meteor.elements.bitbucket,

    {text: "Files", separator: true},
    Meteor.elements.dropbox,
    Meteor.elements.box,
    Meteor.elements.googledrive,
    Meteor.elements.owncloud,

    {text: "Open Access Publications", separator: true},
    {text: "Zenodo", icon: "fa-file-text-o"},
    {text: "Figshare", icon: "fa-file-image-o"},
    {text: "Authorea", icon: "fa-file-text-o"},
    {text: "Wikipedia", icon: "fa-wikipedia-w"},
    {text: "Data Dryad", icon: "fa-database", href: "http://datadryad.org"},

    {text: "Social Media", separator: true},
    {text: "Facebook", icon: "fa-facebook-square"},
    {text: "LinkedIn", icon: "fa-linkedin-square"},
    {text: "ResearchGate", icon: "fa-building-o"},
    {text: "Reddit", icon: "fa-reddit-square"},
    {text: "Google", icon: "fa-google-plus"},
    {text: "Twitter", icon: "fa-twitter-square"}]},
  {text: "Request", items: [
    {text: "To the Authors", separator: false},
    {text: "Figure"},
    {text: "Reproduction material"},
    {text: "Data / Code"},
    {text: "Full PDF"},
    {text: "To the Readers", separator: true},
    {text: "Review"},
    {text: "Reproduction"}]},
  {text: "Donate", icon: "fa-bitcoin",
    href: "https://coinkite.com/pay/04815AF9C7-2C4BC4"},
  {text: "Emerge",
    href: "#"
  },
  {text: "My portfolio",
    href: "#"
  }
].map((obj1) => { // Add a slugified id from the text
  obj1.id = slugify(obj1.text);
  if (obj1.hasOwnProperty('items')) {
    obj1.items = obj1.items.map((obj2) => {
      obj2.id = slugify(obj2.text);
      return obj2;
      });
  }
  return obj1
});


/*
 * Get the corresponding item in the menu list (I know it's ugly, sorry)
 * The .filter((e)=>e) is used to remove the empty/undefined elements in the
 * arrays
 */
function find_in_menu(id) {
  var item = menu.map(function(e){
    if (e.id == id) return e;
    if (e.hasOwnProperty('items')) {
      // We do the same for the nested items
      return e.items.map(function(e2){
        if (e2.id == id) return e2}).filter((e3)=>e3)[0]}
      }).filter((e)=>e)[0];
  return item
}

Template.DOI_Menubar.helpers({
  item: () => menu,
});


Template.DOI_Menubar.events({
  "click .navbar_link": function(event, template){
      // Get the corresponding item in the menu array
      let item = find_in_menu(event.target.id);
      item.doi = template.data.doi;
      // Update the modal with its content
      Session.set('modalcontext', item);
      // Show the modal
      $('#modal').modal('show');
  }
});


Template.ModalContext.helpers({
  show_modal: () => (!Session.get('modalcontext')), // not undefined
  modalcontext: () => Session.get('modalcontext'),
});


Template.MainModal.events({
  "submit .process": function(event, template){
    event.preventDefault();
    console.log("in submit", event, template)
    // Get the corresponding item in the menu array
    let item = find_in_menu(event.target.id);
    // Call the function defined in the menu
    var relationship = item.modal.callback(event, template);
    if (!Relationships.findOne(relationship)) {
        console.log('registering the following relationship: ', relationship);
        Meteor.call("register_relationship", relationship);
    } else {
      console.log("registration already existing")
    }
    $('#modal').modal('hide');
  }
});
