terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.43.0"
    }
  }

  required_version = ">= 1.2.0"
}

# Define the Provider
provider "aws" {
  region = "ap-south-1"   
}

# Retrieve default VPC ID
data "aws_vpc" "default" {
  default = true
}

# Define the Subnet
resource "aws_subnet" "ea_deployment_subnet" {
  vpc_id            = data.aws_vpc.default.id
  cidr_block        = "172.31.227.0/24"
  availability_zone = "ap-south-1b"
  map_public_ip_on_launch = true
  tags = {
    Name = "ea-deployment-public-subnet"
  }
}

# Define a security group
resource "aws_security_group" "ea_deployment_sg" {
  name = "ea-deployment-security-group"
  vpc_id = data.aws_vpc.default.id

  # Allow SSH access from anywhere
  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1" 
    cidr_blocks = ["0.0.0.0/0"] 
  }  
}

# Create EC2 instance
resource "aws_instance" "blue_new_instance" {
  ami             = "ami-007020fd9c84e18c7"
  instance_type   = "c5a.xlarge"
  security_groups = [aws_security_group.ea_deployment_sg.name]
  key_name        = "key"
  tags = {
    Name = "blue-new"
  }
}

resource "aws_instance" "green_new_instance" {
  ami             = "ami-007020fd9c84e18c7"
  instance_type   = "c5a.xlarge"
  security_groups = [aws_security_group.ea_deployment_sg.name]
  key_name        = "key"
  tags = {
    Name = "green-new"
  }
}

# Running this for test purpose
