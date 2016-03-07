var standard_register = function(self, event, template, vect) {
  // Create the two new vectors

  Meteor.call('new_vect',
    targets=[],
    text=event.target.details.value,
    user=Meteor.userId(),
    type=self.id,
    title=event.target.title.value,
    slug=slugify(event.target.title),
    function(err, res){
      // This is a callback to register the second vector using the
      // id of the first vector
      if (err) {
        console.log('error in first new_vect call', err, res)
      } else {
        Meteor.call('new_vect',
          targets=[res, vect._id],
          text=event.target.comment.value,
          user=Meteor.userId(),
          type='relationship',
          title=`Relationship between #${res} and #${self.vect._id}`)
      }
    });
};

Meteor.elements = {
  comment: {
    id: "comment",
    text: "Comment",
    icon: "fa-commenting-o",
  },

  github: {
    id: "github",
    text: "Github",
    icon: "fa-github-square",
    modal: {
      template: "githubModal",
      title: "Integrate with a related github repository",
      register: function(self, event, template, vect) {
        console.log("github", event, template);
        // let user = event.target.namespace.value;
        // let repo = event.target.reponame.value;
        // let userid = Meteor.userId();
        // console.log("github", event, template, comment, user, repo, doi);
        //
        // Meteor.call('new_vect',
        //   targets = [],
        //   text = "",
        //   user = userid,
        //   namespace = event.target.namespace.value,
        //   repo = event.target.reponame.value,
        //   type = "github",
        //   title = event.target.title.value,
        //   slug = slugify(event.target.title),
        //   function(err, res){
        //     // This is a callback to register the second vector using the
        //     // id of the first vector
        //     if (err) {
        //       console.log('error in first new_vect call', err, res)
        //     } else {
        //       Meteor.call('new_vect',
        //         targets = [res, vect._id],
        //         text = event.target.Modalcomment.value,
        //         user = Meteor.userId(),
        //         type = 'relationship',
        //         title = `Relationship between #${res} and #${self.vect._id}`)
        //     }
        //   });
      },
    },
  },

  question: {
    id: "question",
    text: "Scientific Question",
    icon: "fa-question-circle",
    modal: {
      template: "ModalStandard",
      title: "Add relationship to scientific questions",
      register: standard_register,
    },
  },

  doi: {
    id: "doi",
    text: "DOI",
    icon: "fa-file-text-o"
  },

  model: {
    id: "model",
    text: "Model",
    icon: "fa-question-circle",
    modal: {
      template: "Model",
      title: "Add relationship to scientific model",
      register: standard_register,
    },
  },

  gitlab: {
    id: "gitlab",
    text: "Gitlab",
    icon: "fa-git",
    // modal: {
    //   template: "githubModal",
    //   base_url: "http://gitlab.com/",
    //   title: "Register a new gitlab repository",
    //   callback: function(event, template){
    //     console.log("gitlab", event, template);
    //   },
    // },
  },

  bitbucket: {
    id: "bitbucket",
    text: "Bitbucket",
    icon: "fa-bitbucket-square",
    // modal: {
    //   template: "githubModal",
    //   base_url: "",
    //   title: "Register a new bitbucket repository",
    //   callback: function(event, template){
    //     console.log("bitbucket", event, template);
    //   },
    // },
  },

  osf: {
    id: "osf",
    text: "Open Science Framework",
    icon: "fa-sun-o",
    // modal: {
    //   template: "SharedWorkspace",
    //   title: "Register a new Open Science Framework workspace",
    //   callback: function(event, template){
    //     console.log("osf", event, template);
    //   },
    // },
  },

  sharepoint: {
    id: "sharepoint",
    text: "Sharepoint",
    icon: "fa-windows",
    // modal: {
    //   template: "SharedWorkspace",
    //   title: "Register a new Sharepoint workspace",
    //   callback: function(event, template){
    //     console.log("sharepoint", event, template);
    //   },
    // },
  },

  dropbox: {
    id: "dropbox",
    text: "Dropbox",
    icon: "fa-dropbox",
    // modal: {
    //   template: "SharedDirectory",
    //   title: "Register a new Dropbox shared directory",
    //   callback: function(event, template){
    //     console.log("dropbox", event, template);
    //   },
    // },
  },

  box: {
    id: "box",
    text: "Box",
    icon: "fa-cube",
    // modal: {
    //   template: "SharedDirectory",
    //   title: "Register a new Box shared directory",
    //   callback: function(event, template){
    //     console.log("box", event, template);
    //   },
    // },
  },

  googledrive: {
    id: "googledrive",
    text: "Google Drive",
    icon: "fa-google",
    // modal: {
    //   template: "SharedDirectory",
    //   title: "Register a new Google Drive shared directory",
    //   callback: function(event, template){
    //     console.log("google", event, template);
    //   },
    // },
  },

  owncloud: {
    id: "owncloud",
    text: "OwnCloud",
    icon: "fa-cloud",
    // modal: {
    //   template: "SharedDirectory",
    //   title: "Register a new OwnCloud shared directory",
    //   callback: function(event, template){
    //     console.log("bitbucket", event, template);
    //   },
    // },
  },

};
