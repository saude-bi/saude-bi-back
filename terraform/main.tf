provider "aws" {
  region = "us-east-1"  # Substitua pela sua região
}

provider "github" {
  alias = "alias"

  token = var.token
  owner = "saude-bi"
  organization = "saude-bi"
}

module "aws_instance" {
  source = "./modules/aws"
  ssh_public_key = var.ssh_public_key
}

module "github_environment" {
  source = "./modules/github"
  public_ip = one(module.aws_instance[*].instance_public_ip)

  providers = {
    github.alias = github.alias
  }
}