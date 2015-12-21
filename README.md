# http://fractalflows.com website repository
This repo contains all the necessary files to build and deploy the website.
The website is based on Meteor,a javascript webframework, and Bootstrap, a shiny template from tweeter.


## How to run this thing?
### Install Meteor
* OSX/Linux:
Install the latest official Meteor release from your terminal:


    $ curl https://install.meteor.com/ | sh

* Windows:

[Download the official Meteor installer](https://www.meteor.com/install)

### Run locally
Go into the `./app/` directory and start meteor

    $ meteor

### With Docker:
* You will need to install [Docker on your machine](http://docs.docker.com/installation/windows/). 
* Start docker (note the IP address that it gives you in the terminal)
* Clone this git repository
* In the docker terminal:


    $ cd app
    $ docker build -t webapp .
    $ docker run -d \
        -e ROOT_URL=http://yourapp.com \
        -e MONGO_URL=mongodb://url \
        -e MONGO_OPLOG_URL=mongodb://oplog_url \
        -p 8080:80 \
        webapp

* Point your webbrowser to the docker ip address: http://<your-docker-ip>:8080

* Look at the logs:

    
    $ docker logs -f webapp
