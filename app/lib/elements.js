Meteor.elements = {
  github: {
    text: "Github",
    icon: "fa-github-square",
    modal: {
      template: "githubModal",
      base_url: "http://github.com/",
      title: "Register a new github repository",
      callback: function(event, template){
        console.log("github", event, template);
        let comment = event.target.Modalcomment.value;
        let user = event.target.namespace.value;
        let repo = event.target.reponame.value;
        let doi = event.target.doi.value;
        console.log("github", event, template, comment, user, repo, doi);
        return {doi: doi, type:"github", user, repo, comment};
      },
    },
  },

  gitlab: {
    text: "Gitlab",
    icon: "fa-git",
    modal: {
      template: "githubModal",
      base_url: "http://gitlab.com/",
      title: "Register a new gitlab repository",
      callback: function(event, template){
        console.log("gitlab", event, template);
      },
    },
  },

  bitbucket: {
    id: "bitbucket",
    text: "Bitbucket",
    icon: "fa-bitbucket-square",
    modal: {
      template: "githubModal",
      base_url: "",
      title: "Register a new bitbucket repository",
      callback: function(event, template){
        console.log("bitbucket", event, template);
      },
    },
  },

  osf: {
    id: "osf",
    text: "Open Science Framework",
    icon: "fa-sun-o",
    modal: {
      template: "SharedWorkspace",
      title: "Register a new Open Science Framework workspace",
      callback: function(event, template){
        console.log("osf", event, template);
      },
    },
  },

  sharepoint: {
    id: "sharepoint",
    text: "Sharepoint",
    icon: "fa-windows",
    modal: {
      template: "SharedWorkspace",
      title: "Register a new Sharepoint workspace",
      callback: function(event, template){
        console.log("sharepoint", event, template);
      },
    },
  },

  dropbox: {
    id: "dropbox",
    text: "Dropbox",
    icon: "fa-dropbox",
    modal: {
      template: "SharedDirectory",
      title: "Register a new Dropbox shared directory",
      callback: function(event, template){
        console.log("dropbox", event, template);
      },
    },
  },

  box: {
    id: "box",
    text: "Box",
    icon: "fa-cube",
    modal: {
      template: "SharedDirectory",
      title: "Register a new Box shared directory",
      callback: function(event, template){
        console.log("box", event, template);
      },
    },
  },

  googledrive: {
    id: "googledrive",
    text: "Google Drive",
    icon: "fa-google",
    modal: {
      template: "SharedDirectory",
      title: "Register a new Google Drive shared directory",
      callback: function(event, template){
        console.log("google", event, template);
      },
    },
  },

  owncloud: {
    id: "owncloud",
    text: "OwnCloud",
    icon: "fa-cloud",
    modal: {
      template: "SharedDirectory",
      title: "Register a new OwnCloud shared directory",
      callback: function(event, template){
        console.log("bitbucket", event, template);
      },
    },
  },

};
