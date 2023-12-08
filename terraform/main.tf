provider "aws" {
  region = "us-east-1"  # Substitua pela sua região
}

provider "github" {
  alias = "alias"

  token = var.token
  owner = "saude-bi"
}

module "aws_instance" {
  source = "./modules/aws"
  ssh_public_key = var.ssh_public_key
}

