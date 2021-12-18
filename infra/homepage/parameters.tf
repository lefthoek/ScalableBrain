resource "aws_ssm_parameter" "function_role" {
  name  = "${local.parameter_prefix}/buckets/homepage"
  type  = "SecureString"
  value = local.root_bucket
}
