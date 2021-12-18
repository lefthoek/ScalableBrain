variable "project_name" {
  type = string
}

variable "environment_name" {
  type = string
}

variable "root_domain_name" {}
variable "certificate_arn" {}
variable "zone_id" {}

locals {
  module_name      = "homepage"
  resources_prefix = "${var.project_name}-${var.environment_name}-${local.module_name}"
  parameter_prefix = "/${var.project_name}/${var.environment_name}/${local.module_name}"
  root_bucket      = var.root_domain_name
}
