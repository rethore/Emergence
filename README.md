# http://fractalflows.com Website repository
This repo contains all the necessary files to build and deploy the website.
The website is based on Flask, a minimalistic python webframework, and Bootstrap, a shiny template.

## How to run this thing?


### Directly running the webapp using python
* In the webapp directory do a
    
    $ pip install -r requirements.txt

* Then simply run the app.py:

    $ python app.py

* Point your webbrowser to the docker ip address: [http://127.0.0.1:5000/landing](http://127.0.0.1:5000/landing)

### With Docker:
* You will need to install [Docker on your machine](http://docs.docker.com/installation/windows/). 
* Start docker (note the IP address that it gives you in the terminal)
* Clone this git repository
* In the docker terminal:

    $ docker build -t webapp .
    $ docker run -d -p 49500:5000 --name webapp webapp

* Point your webbrowser to the docker ip address: http://xxx.xxx.xxx.xxx:49500/landing

### Automatic deployment
* Once the changes have been commited and pushed to the repo, just do:

    $ make deploy
