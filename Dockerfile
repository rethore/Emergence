# Setup a simple flask webapp

FROM ubuntu:14.10

MAINTAINER Pierre-Elouan Rethore <pire@dtu.dk>

RUN apt-get update
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y -q \
    curl \
    python-all \
    python-pip \
    wget

ADD ./webapp /opt/webapp/

WORKDIR /opt/webapp
RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["python", "app.py"]