#/bin/bash
# This script basically do the following:
# * ssh in synnefo2, the virtual machine where the site is running. 
# * pull the latest changes 
# * stop the currently running docker
# * build the new docker container
# * run the new container

ssh synnefo2 /bin/bash << EOF 
cd fractalflows.com
git pull
ls -lrtkh
make stop
make build
make run
EOF