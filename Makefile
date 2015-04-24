ROOT_DIR := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

build:
	docker build -t webapp .

run: 
	docker run -d -p 49500:5000 --name webapp webapp
	open http://docker:49500
	docker logs -f webapp
	

tests:
	docker run webapp python /opt/webapp/tests.py

stop:
	docker stop webapp
	docker rm webapp

run_local:
	docker run -d -p 49500:5000 -v $(ROOT_DIR)/webapp:/opt/webapp --name webapp webapp
	docker ps 
	open http://docker:49500/register
	docker logs -f webapp 