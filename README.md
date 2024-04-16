### Install Docker
``` bash
sudo su
apt update
apt-get install apt-transport-https; apt-get install ca-certificates; apt-get install curl -y; apt-get install gnupg; apt-get install lsb-release
apt-get update; apt-get install docker.io -y
curl -L "https://github.com/docker/compose/releases/download/v2.18.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose; sudo chmod +x /usr/local/bin/docker-compose; docker-compose --version;
sudo usermod -aG docker ubuntu
```

### Setup Jenkins, Prometheus, Grafana
``` bash
docker-compose build --no-cache
docker-compose up -d
```
### Configure Jenkins
``` bash
chmod 666 /var/run/docker.sock
```
Visit AWS public IP in port 8080
``` bash
docker exec -it jenkins cat /var/jenkins_home/secrets/initialAdminPassword
Username: Admin, Password: Admin123, Full name: Administrator, Email: ashwinircs06@gmail.com
```
### Install Jenkins Plugin SSH Agent
``` bash
docker exec -it jenkins cat /root/.ssh/id_rsa.pub
vim /home/ubuntu/.ssh/authorized_keys
docker exec -it jenkins cat /root/.ssh/id_rsa
Add Credentials in jenkins with private key
chmod -R 700 /home/ubuntu/.ssh
chmod -R 755 /home/ubuntu
```
### Monitoring Setup
Visit AWS public IP in port 3000
Login --> Username: admin, Password: admin

### Install AWS CLI
``` bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
aws --version
```

### AWS IAM User

IAM --> Users --> Create --> Name --> Attach Policies Directly --> AdministratorAccess --> Next --> Create User

Click Username --> Create Access Key --> Command Line Interface (CLI) --> Next --> Provide Anything --> Create Access Key --> Show --> Save --> Done

Access key ID: AKIAQSZLSEXGOQCB7RO7

Access key Secret: ***********************

Default region name: ap-south-1

Default output format: JSON
``` bash
aws configure
cat ~/.aws/credentials
ssh-keygen -t rsa -b 4096 -C "ashwinircs06@gmail.com"
```
### Install Terraform
``` bash
https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli
sudo apt-get update && sudo apt-get install -y gnupg software-properties-common

wget -O- https://apt.releases.hashicorp.com/gpg | \
gpg --dearmor | \
sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg > /dev/null

gpg --no-default-keyring \
--keyring /usr/share/keyrings/hashicorp-archive-keyring.gpg \
--fingerprint

echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
https://apt.releases.hashicorp.com $(lsb_release -cs) main" | \
sudo tee /etc/apt/sources.list.d/hashicorp.list

sudo apt update
sudo apt-get install terraform
terraform -help
cd terraform
terraform init
terraform plan
terraform apply
```


