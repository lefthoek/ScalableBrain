variable "project_name" {
  type = string
}

variable "environment_name" {
  type = string
}

variable "policies" {
  type = list
}

variable "slack_credentials" {
  type = map
}

locals {
  module_name       = "mine"
  resources_prefix  = "${var.project_name}-${var.environment_name}-${local.module_name}"
  parameter_prefix  ="/${var.project_name}/${var.environment_name}/${local.module_name}"
  function_role     = "${local.resources_prefix}-function-role"
  auth_lookup_table = "${local.resources_prefix}-auth-lookup-table"
}
