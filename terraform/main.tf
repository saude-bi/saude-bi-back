provider "aws" {
  region = "us-east-1"  # Substitua pela sua região
}

module "aws_instance" {
  source = "./modules/aws"
  ssh_public_key = var.ssh_public_key
}

module "github_environment" {
  source = "./modules/github"
  public_ip = module.aws_instance.instance_public_ip
}