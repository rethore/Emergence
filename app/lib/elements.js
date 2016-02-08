

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
      template: "Question",
      title: "Register a related scientific question",
      callback(event, template) {
        console.log("github", event, template);
        let comment = event.target.Modalcomment.value;
        let user = event.target.namespace.value;
        let repo = event.target.reponame.value;
        let doi = event.target.doi.value;
        let userid = Meteor.userId();
        console.log("github", event, template, comment, user, repo, doi);
        return {doi: doi, type:"github", user, repo, userid, comment};
      },
    },
  },

  question: {
    id: "question",
    text: "Scientific Question",
    icon: "fa-question-circle",
    modal: {
      template: "Question",
      title: "Add relationship to scientific questions",
      callback(event, template) {
        // console.log("question", event, template);
        let question = event.target.question.value
        let comment = event.target.Modalcomment.value;
        let userid = Meteor.userId();
        let doi = event.target.doi.value;
        // console.log("question", {doi, type:"question", user, question, comment});
        return {doi, type:"question", userid, question, comment};
      },
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
      callback(event, template) {
        let model = event.target.model.value
        let comment = event.target.Modalcomment.value;
        let userid = Meteor.userId();
        let doi = event.target.doi.value;
        return {doi, type:"model", userid, model, comment};
      },
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
