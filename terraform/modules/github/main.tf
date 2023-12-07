data "github_repository" "repo" {
  full_name = var.repo_name
}

resource "github_repository_environment" "backend_env" {
  repository       = data.github_repository.repo.name
  environment      = "deploy-ci"
}

resource "github_actions_environment_secret" "test_secret" {
  repository       = data.github_repository.repo.name
  environment      = github_repository_environment.backend_env.environment
  secret_name      = "test_secret_name"
  plaintext_value  = templatefile(
    "${path.module}/templates/known_hosts.tpl",
    { 
      known_hosts = var.public_ip
    }
  )
}