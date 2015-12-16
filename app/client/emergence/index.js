Template.emergence_main.events({
  "submit .search": function(event, template){
    event.preventDefault();
    let doi = event.target.search_text.value
    console.log('found it', doi)
    Router.go("/emergence/doi/" + doi);
  }
});
