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

resource "aws_ssm_parameter" "websockets_api_id" {
  name  = "${local.parameter_prefix}/websockets_api/id"
  type  = "SecureString"
  value = aws_apigatewayv2_api.websockets_api.id
}

resource "aws_ssm_parameter" "slack_client_id" {
  name  = "${local.parameter_prefix}/credentials/slack/client_id"
  type  = "SecureString"
  value = var.slack_credentials.client_id
}

resource "aws_ssm_parameter" "slack_client_secret" {
  name  = "${local.parameter_prefix}/credentials/slack/client_secret"
  type  = "SecureString"
  value = var.slack_credentials.client_secret
}
