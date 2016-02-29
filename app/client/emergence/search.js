var promiseVal = new ReactiveVar("")
Session.setDefault("result", null);
//
// Template.Search.onCreated(function(){
//   // HTTP.getPromise("http://api.crossref.org/works?query="+this.keys)
//   //   .then(response => $("#http-ok-result").text(response.content))
//   //   .catch(err => $("#http-err-result").text(err))
//   console.log(this, this.keys)
//
// })
//
// Template.Search.helpers({
//
//   results: () => promiseVal.get(),
// });
//
// Template.Search.events({
//   "click #foo": function(event, template){
//
//   }
// });

Template.Search.events({
  "submit #id_search": function(event, template) {
    event.preventDefault();
    console.log('new key pressed', event.target.item_text.value);
    var key = event.target.item_text.value.replace(/ /g, '+');
    HTTP.get("https://api.crossref.org/works?query="+key, (err, res) => {
      if (err) console.log('ERROR:',err);
      console.log("crossref", "https://api.crossref.org/works?query="+key, err, res);
      Router.go(`/emergence/search/${key}`);
    })
  }
})
