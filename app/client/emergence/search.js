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
