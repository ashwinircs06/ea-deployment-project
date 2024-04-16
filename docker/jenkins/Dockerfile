FROM jenkins/jenkins:lts
WORKDIR /var/jenkins_home/workspace
USER root
RUN apt-get update && apt-get install vim -y
RUN apt-get install default-jdk -y
RUN apt-get install maven -y
RUN java --version
RUN mvn --version
RUN if [ ! -f /root/.ssh/id_rsa ]; then \
    ssh-keygen -t rsa -b 4096 -C "docker-jenkins-key" -f /root/.ssh/id_rsa -q -N ""; \
    fi
