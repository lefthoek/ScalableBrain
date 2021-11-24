variable "project_name" {
  type = string
}

variable "environment_name" {
  type = string
}

variable "policies" {
  type = list
}

locals {
  module_name       = "shared"
  resources_prefix  = "${var.project_name}-${var.environment_name}-${local.module_name}"
  parameter_prefix  = "/${var.project_name}/${var.environment_name}/${local.name}"
  datalake_bucket   = "${local.resources_prefix}-datalake-bucket"
}
