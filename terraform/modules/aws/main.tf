resource "aws_instance" "ec2_instance" {
  ami           = data.aws_ami.ubuntu.id
  count         = "${var.number_of_instances}"
  instance_type = "${var.instance_type}"
  key_name      = aws_key_pair.deployer.key_name
}

resource "aws_key_pair" "deployer" {
  key_name   = "backend-key-par"
  public_key = var.ssh_public_key
}