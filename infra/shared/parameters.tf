resource "aws_ssm_parameter" "event_bus" {
  name  = "${local.parameter_prefix}/event_bus"
  type  = "SecureString"
  value = aws_cloudwatch_event_bus.event_bus.arn
}

resource "aws_ssm_parameter" "auth_lookup_table" {
  name  = "${local.parameter_prefix}/tables/auth_lookup"
  type  = "SecureString"
  value = local.auth_lookup_table
}
