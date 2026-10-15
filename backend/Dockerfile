FROM ubuntu:20.04
# Setup user 
RUN useradd -ms /bin/bash sandbox

#Setup environment 
WORKDIR /home/sandbox

#update the ubuntu machine 
RUN apt update && apt upgrade -y

#install nano and curl 
RUN apt install nano curl -y 

RUN curl -fsSL https://deb.nodesource.com/setup_24.x | bash - && apt-get install -y nodejs

#configuring 

RUN echo "PS1='\w '" >> /home/sandbox/.bashrc

WORKDIR /home/sandbox/app