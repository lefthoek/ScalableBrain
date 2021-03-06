variable "project_name" {
  type = string
}

variable "environment_name" {
  type = string
}

variable "policies" {
  type = list(string)
}

variable "slack_credentials" {
  type = map(string)
}

locals {
  module_name       = "mine"
  resources_prefix  = "${var.project_name}-${var.environment_name}-${local.module_name}"
  parameter_prefix  = "/${var.project_name}/${var.environment_name}/${local.module_name}"
  function_role     = "${local.resources_prefix}-function-role"
  auth_lookup_table = "${local.resources_prefix}-auth-lookup-table"
  raw_data_bucket   = "${local.resources_prefix}-raw-data-bucket"
}
