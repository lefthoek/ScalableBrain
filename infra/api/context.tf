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
  module_name                    = "api"
  resources_prefix               = "${var.project_name}-${var.environment_name}-${local.module_name}"
  parameter_prefix               = "/${var.project_name}/${var.environment_name}/${local.module_name}"
  function_role                  = "${local.resources_prefix}-function-role"
  websockets_api                 = "${local.resources_prefix}-websockets-api"
  websockets_tables              = "${local.resources_prefix}-websockets-tables"
  websockets_connections_table   = "${local.resources_prefix}-websockets-connections-table"
  websockets_subscriptions_table = "${local.resources_prefix}-websockets-subscriptions-table"
}
