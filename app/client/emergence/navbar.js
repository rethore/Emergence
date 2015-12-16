
UI.registerHelper("there_is", function(value){
  return this.hasOwnProperty(value)
});

Template.DOI_Navbar.helpers({
  publication: function(){
    let publi = URI.findOne({doi: this.doi});
    if ( typeof publi == "undefined" ) {
      Meteor.call('register', doi=this.doi);
      return {
          title: 'loading ...',
      }
    } else {
      return publi;
    }},

//   {
//     title: 'Emergence from Fractal Flows',
//     journal: 'Emergence Science',
//     year: 2015,
//     author: [
//       {first: 'Imad', last: 'Abdallah'},
//       {first: 'Pierre-Elouan', last: 'Rethore'},
//     ],
//     url: "http://google.com"
// },
});

var menu = [
  {text: "Access Publication", href: this.url},
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
    {text: "Author", icon: "fa-user",
      modal: {
        model: "Author",
        title: "Register a new Author",
        id: "authorModal",
        address: "/author"
      }},
    {text: "Hypothesis", icon: "fa-question-circle",
      modal: {id: "hypothesisModal"}},
    {text: "Method", icon: "fa-cogs",
      modal: {id: "methodModal"}},
    {text: "Result", icon: "fa-star-o",
      modal: {id: "resultModal"}},
    {text: "Dataset", icon: "fa-database",
      modal: {id: "datasetModal"}},
    {text: "Reproduction", icon: "fa-clone",
      modal: {id: "reproductionModal"}},
    {text: "Version", icon: "fa-code-fork",
      modal: {id: "versionModal"}}]},
  {text: "Integrate", items: [
    {text: "Workspaces", separator: false},
    {text: "Open Science Framework", icon: "fa-sun-o"},
    {text: "Sharepoint", icon: "fa-windows"},
    {text: "Repositories", separator: true},
    {text: "Github,", icon: "fa-github-square",
      modal: {id: "githubModal"}},
    {text: "Gitlab", icon: "fa-git",
      modal: {
        model: "GitHub",
        title: "Register a new gitlab repository",
        id: "gitlabModal",
        address: "/gitlab"
      }},
    {text: "Bitbucket", icon: "fa-bitbucket-square",
      modal: {
        model: "GitHub",
        title: "Register a new bitbucket repository",
        id: "bitbucketModal",
        address: "/bitbucket"
      }},

    {text: "Files", separator: true},
    {text: "Dropbox", icon: "fa-dropbox"},
    {text: "Box", icon: "fa-cube"},
    {text: "Google Drive", icon: "fa-google"},
    {text: "OwnCloud", icon: "fa-cloud"},

    {text: "Open Access Publications", separator: true},
    {text: "Zenodo", icon: "fa-file-text-o"},
    {text: "Figshare", icon: "fa-file-image-o"},
    {text: "Authora", icon: "fa-file-text-o"},
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
  }
];

// Add a slugified id from the text
var menu = menu.map(function(obj1){
  obj1.id = slugify(obj1.text);
  if (obj1.hasOwnProperty('items')) {
    obj1.items = obj1.items.map(function(obj2){
      obj2.id = slugify(obj2.text);
      return obj2;
    });
  }
  return obj1
});


Template.DOI_Menubar.helpers({
  item: () => menu,
});


Template.DOI_Menubar.events({
  "click .navbar_link": function(event, template){
      let id = event.target.id;

      // Get the corresponding item in the menu list (I know it's ugly, sorry)
      // The .filter((e)=>e) is used to remove the empty/undefined elements in the
      // arrays
      let item = menu.map(function(e){
        if (e.id == id) return e;
        if (e.hasOwnProperty('items')) {
          // We do the same for the nested items
          return e.items.map(function(e2){
            if (e2.id == id) return e2}).filter((e3)=>e3)[0]}
      }).filter((e)=>e)[0];

      console.log(id, item);
      Session.set('modalcontext', {
          title: event.target.text,
          body: "body",
          callback: "github_callback",
          helps: "here is some help",
      });
      $('#modal').modal('show');
      //console.log('click', event, template);
  }
});
