



Template.DOI_Navbar.helpers({
  publication: {
    title: 'Emergence from Fractal Flows',
    journal: 'Emergence Science',
    year: 2015,
    author: [
      {first: 'Imad', last: 'Abdallah'},
      {first: 'Pierre-Elouan', last: 'Rethore'},
    ],
    },
  item: () => [
    {
      text: "Access Publication",
      href: ""
    },
    {
      text: "Related",
      icon: "fa-link",
      items: [
        {
          text: "URL/DOI",
          icon: "fa-link"
        },
        {
          text: "Slideshow",
          icon: "fa-desktop"
        },
        {
          text: "Video",
          icon: "fa-film"
        }
      ]
    },
    {
      text: "Discuss",
      icon: "fa-comments-o",
      items: [
        {
          text: "Comment",
          icon: "fa-comments-o"
        },
        {
          text: "Review",
          icon: "fa-gavel"
        },
        {
          text: "Raise a Question",
          icon: "fa-question-circle"
        }
      ]
    },
    {
      text: "Extend",
      icon: "fa fa-arrows-v",
      items: [
        {
          text: "Summarise",
          icon: "fa-compress"
        },
        {
          text: "Popularize",
          icon: "fa-globe"
        },
        {
          text: "Add a keywords",
          icon: "fa-list"
        }
      ]
    },
    {
      text: "Register",
      items: [
        {
          text: "Author",
          icon: "fa-user",
          modal: {
            model: "Author",
            title: "Register a new Author",
            id: "authorModal",
            address: "/author"
          }
        },
        {
          text: "Hypothesis",
          icon: "fa-question-circle",
          modal: {
            id: "hypothesisModal"
          }
        },
        {
          text: "Method",
          icon: "fa-cogs",
          modal: {
            id: "methodModal"
          }
        },
        {
          text: "Result",
          icon: "fa-star-o",
          modal: {
            id: "resultModal"
          }
        },
        {
          text: "Dataset",
          icon: "fa-database",
          modal: {
            id: "datasetModal"
          }
        },
        {
          text: "Reproduction",
          icon: "fa-clone",
          modal: {
            id: "reproductionModal"
          }
        },
        {
          text: "Version",
          icon: "fa-code-fork",
          modal: {
            id: "versionModal"
          }
        }
      ]
    },
    {
      text: "Integrate",
      items: [
        {
          text: "Workspaces",
          separator: false
        },
        {
          text: "Open Science Framework",
          icon: "fa-sun-o"
        },
        {
          text: "Sharepoint",
          icon: "fa-windows"
        },
        {
          text: "Repositories",
          separator: true
        },
        {
          text: "Github,",
          icon: "fa-github-square",
          modal: {
            id: "githubModal"
          }
        },
        {
          text: "Gitlab",
          icon: "fa-git",
          modal: {
            model: "GitHub",
            title: "Register a new gitlab repository",
            id: "gitlabModal",
            address: "/gitlab"
          }
        },
        {
          text: "Bitbucket",
          icon: "fa-bitbucket-square",
          modal: {
            model: "GitHub",
            title: "Register a new bitbucket repository",
            id: "bitbucketModal",
            address: "/bitbucket"
          }
        },
        {
          text: "Files",
          separator: true
        },
        {
          text: "Dropbox",
          icon: "fa-dropbox"
        },
        {
          text: "Box",
          icon: "fa-cube"
        },
        {
          text: "Google Drive",
          icon: "fa-google"
        },
        {
          text: "OwnCloud",
          icon: "fa-cloud"
        },
        {
          text: "Open Access Publications",
          separator: true
        },
        {
          text: "Zenodo",
          icon: "fa-file-text-o"
        },
        {
          text: "Figshare",
          icon: "fa-file-image-o"
        },
        {
          text: "Authora",
          icon: "fa-file-text-o"
        },
        {
          text: "Wikipedia",
          icon: "fa-wikipedia-w",
          href: "http://datadryad.org"
        },
        {
          text: "Data Dryad",
          icon: "fa-database"
        },
        {
          text: "Social Media",
          separator: true
        },
        {
          text: "Facebook",
          icon: "fa-facebook-square"
        },
        {
          text: "LinkedIn",
          icon: "fa-linkedin-square"
        },
        {
          text: "ResearchGate",
          icon: "fa-building-o"
        },
        {
          text: "Reddit",
          icon: "fa-reddit-square"
        },
        {
          text: "Google",
          icon: "fa-google-plus"
        },
        {
          text: "Twitter",
          icon: "fa-twitter-square"
        }
      ]
    },
    {
      text: "Request",
      items: [
        {
          text: "To the Authors",
          separator: false
        },
        {
          text: "Figure"
        },
        {
          text: "Reproduction material"
        },
        {
          text: "Data / Code"
        },
        {
          text: "Full PDF"
        },
        {
          text: "To the Readers",
          separator: true
        },
        {
          text: "Review"
        },
        {
          text: "Reproduction"
        }
      ]
    },
    {
      text: "Donate",
      href: "https://coinkite.com/pay/04815AF9C7-2C4BC4",
      icon: "fa-bitcoin"
    },
    {
      text: "Emerge",
      href: "#"
    }
  ]
});
