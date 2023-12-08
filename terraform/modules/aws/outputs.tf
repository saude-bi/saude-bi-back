output "instance_public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = "${one(aws_instance.ec2_instance[*].public_ip)}"
}
