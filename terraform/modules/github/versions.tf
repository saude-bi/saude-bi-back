terraform {
  required_version = ">= 0.13"
  required_providers {
    github = {
      source  = "integrations/github"
      version = ">=5.0.0"
      configuration_aliases = [ github.alias ]
    }
  }
}