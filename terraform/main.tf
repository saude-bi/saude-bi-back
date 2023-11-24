provider "aws" {
  region     = "us-east-1"  # Substitua pela sua região
  access_key = ""
  secret_key = ""
  token      = ""
}

resource "aws_instance" "ec2_instance" {
  ami = data.aws_ami.ubuntu.id
  count = "${var.number_of_instances}"
  instance_type = "${var.instance_type}"
  key_name = aws_key_pair.deployer.key_name
}
resource "aws_key_pair" "deployer" {
  key_name   = "deployer-key"
  public_key = ""
}