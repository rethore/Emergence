# Setup a simple flask webapp

FROM ubuntu:14.10

MAINTAINER Pierre-Elouan Rethore <pire@dtu.dk>

RUN apt-get update
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y -q \
    curl \
    python-all \
    python-pip \
    wget

ADD ./webapp/requirements.txt /opt/webapp/

WORKDIR /opt/webapp
RUN pip install -r requirements.txt

EXPOSE 5000

ADD ./webapp /opt/webapp/

CMD ["python", "app.py"]