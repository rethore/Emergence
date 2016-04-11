## Not working, please fix
# Setup a simple meteor webapp
# You can build the docker image with:
#   $ docker build -t yourname/app .
# Then you can run your meteor image with
#
# $  docker run -d \
#        -e ROOT_URL=http://yourapp.com \
#        -e MONGO_URL=mongodb://url \
#        -e MONGO_OPLOG_URL=mongodb://oplog_url \
#        -p 8080:80 \
#        yourname/app

FROM ubuntu:latest
MAINTAINER Pierre-Elouan Rethore <pe@retho.re>

RUN apt-get update -y \
 && apt-get install -y curl \
 && apt-get clean

RUN export LC_ALL=en_US.UTF-8
RUN curl -sL https://install.meteor.com | sed s/--progress-bar/-sL/g | /bin/sh
RUN mkdir /app
ADD . /app
WORKDIR /app

ENV IP 82.196.13.8
ENV PORT 80

CMD meteor --port $(IP):$(PORT)
