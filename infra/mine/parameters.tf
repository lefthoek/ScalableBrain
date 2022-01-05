resource "aws_ssm_parameter" "function_role" {
  name  = "${local.parameter_prefix}/roles/function"
  type  = "SecureString"
  value = aws_iam_role.function_role.arn
}

resource "aws_ssm_parameter" "slack_signing_secret" {
  name  = "${local.parameter_prefix}/credentials/slack/signing_secret"
  type  = "SecureString"
  value = var.slack_credentials.signing_secret
}

resource "aws_ssm_parameter" "raw_data_bucket_name" {
  name  = "${local.parameter_prefix}/buckets/raw_data"
  type  = "SecureString"
  value = local.raw_data_bucket
}
