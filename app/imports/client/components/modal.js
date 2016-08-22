
Template.ModalContext.helpers({
  show_modal: () => (!Session.get('modalcontext')), // not undefined
  modalcontext: () => Session.get('modalcontext'),
  vect: ()=>Session.get("vect"),
});


Template.MainModal.events({
  "submit .process": function(event, template){
    event.preventDefault();
    Meteor.elements[this.id].modal.register(this, event, template, Session.get('vect'));

    // Hiding the modal
    $('#modal').modal('hide');
  }
});
