Meteor.methods({
  sendEmail: function (text) {
    check([text], [String]);

    this.unblock();

    Email.send({
      to: "imad.abdallah.81@gmail.com",
      from: "imad.abdallah.81@gmail.com",
      subject: "New user signup",
      text: text
    });
  }
});
