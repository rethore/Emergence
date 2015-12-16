// Router.configure({
//     layoutTemplate: 'main' // this is the main template
// });

// Landing page routes ---------------------------------------------------------
Router.route('/', {
    name: 'home',
    template: 'home'
});
Router.route('/about');
Router.route('/HowItWorks');

// Emergence routes ------------------------------------------------------------
Router.route('/emergence/doi/:doi*', function() {
    this.render('DOI', {data: {doi: this.params.doi}})
});

Router.route("/emergence", {
  name:"emergence",
  template:"emergence_main",
});
