Meteor.subscribe("vector");
Session.setDefault("vect", undefined);
Session.setDefault("vectkey", undefined);

var doiRegex = '(10[.][0-9]{4,}(?:[.][0-9]+)*/(?:(?![%"#? ])\\S)+)'
var doiTextPrefix = 'doi\\:'
findoi = function (opts) {
  opts = opts || {}
  return opts.exact ? new RegExp('(?:^' + doiRegex + '$)') :
                      new RegExp('(?:' + doiRegex + ')', 'g')
}


Template.emergence_main.events({
  "submit .search": function(event, template){
    event.preventDefault();
    var text = event.target.search_text.value;
    // Test if it's a doi using regex
    if (findoi({exact:true}).test(text)) {
      console.log('found it', text);
      Router.go(`/emergence/doi/${text}`);
      Session.set('DOI', text);
    } else {
      var keys = text.replace(/ /g, '+');
      Router.go(`/emergence/search/${keys}`);
    }
  }
});
