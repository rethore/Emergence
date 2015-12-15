


if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);
  Session.setDefault("stuff", 0);





  var stuffs = [
    'datasets', 'scripts & source code', 'simulation results', 'experimental results',
    'detailed mathematical formulations', 'detailed analysis', 'assumptions, hypothesis & methodologies',
  ];


  // THIS IS PUT ON THE SHELF :'-(
  // Template.Landing.helpers({
  //   stuff: () => stuffs[Session.get('stuff')],
  // });
  //
  // Meteor.setInterval( function () {
  //       Session.set("stuff", (Session.get("stuff") + 4)%stuffs.length);
  //       console.log(Session.get("dateval"));
  //   }, 2000 );


  Template.Team.helpers({
    members: () => [{
        'name': 'Imad Abdallah',
        'title': 'CEO - Founder',
        'experience': 'MSc & PhD wind energy.<br>Senior mechanical engineer in wind energy.',
        'img': 'team/01.jpg',
        'meta':[
          { 'url': 'https://dk.linkedin.com/in/imadabdallah',
            'icon': 'fa-linkedin-square'},
          { 'url': 'mailto:imad.abdallah.81@gmail.com',
            'icon': 'fa-envelope-square'}],
      }, {
        'name': 'Pierre-Elouan Rethore',
        'title': 'CTO - Founder',
        'experience': 'MSc Comp.Sc. MSc & PhD Wind Energy.<br>Senior researcher in wind energy and computer science.',
        'img': 'team/02.jpg',
        'meta': [{
          'url':'https://dk.linkedin.com/in/rethore',
          'icon': 'fa-linkedin-square' },{
          'url':'https://github.com/rethore',
          'icon': 'fa-github-square' },{
          'email': 'mailto:rethore@fractalflows.com',
          'icon': 'fa-envelope-square'
        }],
      }],
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
