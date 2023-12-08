data "github_repository" "repo" {
  full_name = var.repo_name
}

resource "github_repository_environment" "backend_env" {
  provider = github.alias

  repository       = data.github_repository.repo.id
  environment      = "deploy-ci"
}

resource "github_actions_environment_secret" "test_secret" {
  provider = github.alias

  repository       = data.github_repository.repo.id
  environment      = github_repository_environment.backend_env.environment
  secret_name      = "test_secret_name"
  plaintext_value  = var.public_ip
}