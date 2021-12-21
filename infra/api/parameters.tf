resource "aws_ssm_parameter" "function_role" {
  name  = "${local.parameter_prefix}/roles/function"
  type  = "SecureString"
  value = aws_iam_role.function_role.arn
}

resource "aws_ssm_parameter" "websockets_connections_table" {
  name  = "${local.parameter_prefix}/tables/websockets_connections"
  type  = "SecureString"
  value = local.websockets_connections_table
}

resource "aws_ssm_parameter" "websockets_subscriptions_table" {
  name  = "${local.parameter_prefix}/tables/websockets_subscriptions"
  type  = "SecureString"
  value = local.websockets_subscriptions_table
}
