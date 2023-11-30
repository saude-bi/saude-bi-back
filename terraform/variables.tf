# You can add more variables here as needed

variable "instance_name" {
        description = "Name of the instance to be created"
        default = "saude-bi-backend"
}

variable "instance_type" {
        default = "t2.small"
}

variable "number_of_instances" {
        description = "number of instances to be created"
        default = 1
}

variable "ami_key_pair_name" {
        default = "tomcat"
}

variable "ssh_public_key" {
        description = "ssh public key"
}