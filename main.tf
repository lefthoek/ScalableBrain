variable "TFC_WORKSPACE_NAME" {
  type    = string
  default = ""
}

locals {
  project_name                = "scalable_brain"
  lambda_basic_execution_role = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  environment_name            = var.TFC_WORKSPACE_NAME != "" ? trimprefix(var.TFC_WORKSPACE_NAME, "scalable_brain-") : terraform.workspace
}

terraform {
  backend "remote" {
    organization = "lefthoek"
    workspaces {
      prefix = "scalable_brain-"
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
  environment_name = local.environment_name
}

module "infra" {
  source           = "./infra/mineSlack"
  project_name     = local.project_name
  environment_name = local.environment_name
  policies = [
    local.lambda_basic_execution_role,
    module.shared.datalake_bucket_read_access_policy,
    module.shared.datalake_bucket_write_access_policy
  ]
}
