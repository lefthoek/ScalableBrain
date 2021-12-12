variable "SLACK_CLIENT_ID" {
  type      = string
  sensitive = true
}

variable "SLACK_CLIENT_SECRET" {
  type      = string
  sensitive = true
}

variable "SLACK_SIGNING_SECRET" {
  type      = string
  sensitive = true
}

locals {
  project_name                = "scalable-brain"
  lambda_basic_execution_role = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

terraform {
  backend "remote" {
    organization = "lefthoek"
    workspaces {
      name = "scalable-brain"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 3.54.0"
    }
  }

  required_version = "~> 1.1.0"
}

provider "aws" {
  profile = "default"
  region  = "eu-west-1"
}

provider "aws" {
  profile = "default"
  alias   = "acm"
  region  = "us-east-1"
}


module "domain" {
  source           = "./infra/domain"
  root_domain_name = "zwarmer.com"
  providers = {
    aws.us = aws.acm
  }
}

module "homepage" {
  source           = "./infra/homepage"
  root_domain_name = module.domain.domain_name
  certificate_arn  = module.domain.certificate_arn
  zone_id          = module.domain.zone_id
}

module "shared" {
  source           = "./infra/shared"
  project_name     = local.project_name
  environment_name = "prod"
}

module "mine" {
  source           = "./infra/mine"
  project_name     = local.project_name
  environment_name = "dev"
  slack_credentials = {
    client_id      = var.SLACK_CLIENT_ID
    client_secret  = var.SLACK_CLIENT_SECRET
    signing_secret = var.SLACK_SIGNING_SECRET
  }
  policies = [
    local.lambda_basic_execution_role,
    module.shared.event_bus_write_access_policy,
  ]
}
