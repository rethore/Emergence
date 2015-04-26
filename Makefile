ROOT_DIR := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

default: stop run_local
	sleep 1
	open http://docker:49500/landing
	docker logs -f webapp	

build:
	docker build -t webapp .

run: 
	docker run -d -p 49500:5000 --name webapp webapp

tests:
	docker run webapp python /opt/webapp/tests.py

stop:
	docker stop webapp
	docker rm webapp

run_local:
	docker run -d -p 49500:5000 -v $(ROOT_DIR)/webapp:/opt/webapp --name webapp webapp
	docker ps 

deploy:
	ssh synnefo2 "echo hello; ls -lrtkh; cd fractalflows.com; git pull; make stop; make build; make run"