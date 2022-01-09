variable "project_name" {
  type = string
}

variable "environment_name" {
  type = string
}

variable "policies" {
  type = list(string)
}

locals {
  module_name           = "refine"
  resources_prefix      = "${var.project_name}-${var.environment_name}-${local.module_name}"
  parameter_prefix      = "/${var.project_name}/${var.environment_name}/${local.module_name}"
  function_role         = "${local.resources_prefix}-function-role"
  auth_lookup_table     = "${local.resources_prefix}-auth-lookup-table"
  knowledge_base_bucket = "${local.resources_prefix}-knowledge-base-bucket"
}
