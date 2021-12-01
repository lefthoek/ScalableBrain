resource "aws_ssm_parameter" "function_role" {
  name  = "${local.parameter_prefix}/function_roles/mine"
  type  = "SecureString"
  value = aws_iam_role.function_role.arn
}


resource "aws_ssm_parameter" "auth_lookup_table" {
  name  = "${local.parameter_prefix}/tables/auth_lookup"
  type  = "SecureString"
  value = local.auth_lookup_table
}
