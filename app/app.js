Router.configure({
    layoutTemplate: 'main' // this is the main template
});


if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);
  Session.setDefault("stuff", 0);

  var stuffs = [
    'datasets, source code & results', 'simulation & experimental results',
    'mathematical formulations', 'analysis, methods & observations', 'assumptions, hypothesis & methodologies',
  ];

  Template.Landing.helpers({
    stuff: () => stuffs[Session.get('stuff')],
  });

  Meteor.setInterval( function () {
        Session.set("stuff", (Session.get("stuff") + 4)%stuffs.length);
        console.log(Session.get("dateval"));
    }, 2000 );


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


// THIS IS NOT WORKING...
    //javascript jquery code to make navigation bar turn white background when scrolling starts
  $(document).ready(function(){
     var scroll_start = 0;
     var startchange = $('.nav');
     var offset = startchange.offset();
     $(document).scroll(function() {
        scroll_start = $(this).scrollTop();
        if(scroll_start > offset.top) {
            $('.navbar-default').css('background-color', 'rgb(255,255,255)');
            $('.navbar-default').css('border-color', 'rgb(231,76,60)');
         } else {
            $('.navbar-default').css('background-color', 'transparent');
            $('.navbar-default').css('border-color', 'rgba(231, 231, 231, 0)');
        }
     });
  });


  //
  // $(document).ready(function(){
  // //Examples of how to assign the Colorbox event to elements
  // $(".group1").colorbox({rel:'group1'});
  // $(".group2").colorbox({rel:'group2', transition:"fade"});
  // $(".group3").colorbox({rel:'group3', transition:"none", width:"75%", height:"75%"});
  // $(".group4").colorbox({rel:'group4', slideshow:true});
  // $(".ajax").colorbox();
  // $(".youtube").colorbox({iframe:true, innerWidth:640, innerHeight:390});
  // $(".vimeo").colorbox({iframe:true, innerWidth:500, innerHeight:409});
  // $(".iframe").colorbox({iframe:true, width:"80%", height:"80%"});
  // $(".inline").colorbox({inline:true, width:"50%"});
  // $(".callbacks").colorbox({
  //   onOpen:function(){ alert('onOpen: colorbox is about to open'); },
  //   onLoad:function(){ alert('onLoad: colorbox has started to load the targeted content'); },
  //   onComplete:function(){ alert('onComplete: colorbox has displayed the loaded content'); },
  //   onCleanup:function(){ alert('onCleanup: colorbox has begun the close process'); },
  //   onClosed:function(){ alert('onClosed: colorbox has completely closed'); }
  //   });
  //   $('.non-retina').colorbox({rel:'group5', transition:'none'})
  //   $('.retina').colorbox({rel:'group5', transition:'none', retinaImage:true, retinaUrl:true});
  //
  //   //Example of preserving a JavaScript event for inline calls.
  //   $("#click").click(function(){
  //   $('#click').css({"background-color":"#f00", "color":"#fff", "cursor":"inherit"}).text("Open this window again and this message will still be here.");
  //   return false;
  //   });
  //   });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


Router.route('/', {
    name: 'home',
    template: 'home'
});
Router.route('/about');
Router.route('/HowItWorks');