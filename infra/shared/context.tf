variable "project_name" {
  type = string
}

variable "environment_name" {
  type = string
}

locals {
  module_name       = "shared"
  resources_prefix  = "${var.project_name}-${var.environment_name}-${local.module_name}"
  parameter_prefix  ="/${var.project_name}/${var.environment_name}/${local.module_name}"
  event_bus         = "${local.resources_prefix}-event-bus"
}
