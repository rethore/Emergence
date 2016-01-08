Meteor.methods({
  sendEmail: function (text) {
    //check([text], [String]);

    this.unblock();

    Email.send({
      to: "imad.abdallah.81@gmail.com",
      from: "imad.abdallah.81@gmail.com",
      subject: "New user signup",
      text: text
    });
    console.log('I just sent you an email:', text);
  }
});


//Meteor.methods({
//  isEmailValid: function(address) {
//    check(address, String);
//
//    // modify this with your key
//    var result = HTTP.get('https://api.mailgun.net/v2/address/validate', {
//      auth: 'api:pubkey-XXXXXXXXXXXXX',
//      params: {address: address.trim()}
//    });
//
//    if (result.statusCode === 200) {
//      // is_valid is the boolean we are looking for
//      return result.data.is_valid;
//    } else {
//      // the api request failed (maybe the service is down)
//      // consider giving the user the benefit of the doubt and return true
//      return true;
//    }
//  }});

