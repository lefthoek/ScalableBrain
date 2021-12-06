variable "SLACK_CLIENT_ID" {
  type      = string
  default   = ""
  sensitive = true
}

variable "SLACK_CLIENT_SECRET" {
  type      = string
  default   = ""
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

  required_version = "~> 1.0.0"
}

provider "aws" {
  profile = "default"
  region  = "eu-west-1"
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
  policies = [
    local.lambda_basic_execution_role,
    module.shared.event_bus_write_access_policy,
    module.shared.datalake_bucket_read_access_policy,
    module.shared.datalake_bucket_write_access_policy
  ]
}
