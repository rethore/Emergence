// THIS IS PUT ON THE SHELF :'-(
// Session.setDefault('counter', 0);
// Session.setDefault("stuff", 0);
//
// var stuffs = [
//   'datasets', 'scripts & source code', 'simulation results', 'experimental results',
//   'detailed mathematical formulations', 'detailed analysis', 'assumptions, hypothesis & methodologies',
// ];

// Template.Landing.helpers({
//   stuff: () => stuffs[Session.get('stuff')],
// });
//
// Meteor.setInterval( function () {
//       Session.set("stuff", (Session.get("stuff") + 4)%stuffs.length);
//       console.log(Session.get("dateval"));
//   }, 2000 );

  Template.modal.rendered = function() {
    $('#myModal').on('show.bs.modal', function(event) {
      var modal, src;
      modal = $(this);
      return modal.find('iframe').attr('src', src = "https://www.youtube.com/embed/DGvStTJftHU?showinfo=0&autoplay=1"); // just replace the video_I DGvStTJftHU
    });
    return $('#myModal').on('hide.bs.modal', function(event) {
      var modal;
      modal = $(this);
      return modal.find('iframe').attr('src', '');
    });
  };


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

Template.Mailing.events({
	'submit form#mailing-list':function(e){
      e.preventDefault();
	  var contactForm = $(e.currentTarget);
	  var fname = contactForm.find('#userName').val();
	  var email = contactForm.find('#emailAddress').val();
		//isFilled and isEmail are my helper methods, which checks if variable exists or is email address valid
	  if(isEmail(email) && isFilled(fname) && isFilled(email)){
        var dataText = "Message from: " + fname + " " +  "\rEmail: " + email;
        Meteor.call('sendEmail', dataText);
        // reset field
        $('#userName').val('');
        $('#emailAddress').val('');
        //alert("Thanks for signing up! We'll email you occasionally with updates about Emergence from Fractal Flows!");
		//throwAlert is my helper method which creates popup with message
		//throwAlert('Email send.', 'success');
		//}else{
		//	throwAlert('An error occurred. Sorry', 'error');
		//	return false;
		//
		//
        contactForm.replaceWith("<div><p>Thanks for signing up! We'll email you occasionally with updates about Emergence from Fractal Flows.</p></div>");
      }else{
        alert("An error occurred. Sorry.");
      }
	}
});

function isEmail(address) {
  return /^[A-Z0-9'.1234z_%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(address);
};

function isFilled(field) {
    if (field === '') {
      throw new Meteor.Error("Please enter a ", field);
      return false
    }else{
      return true
    }
};
