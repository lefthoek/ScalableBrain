resource "aws_ssm_parameter" "homepage_bucket" {
  name  = "${local.parameter_prefix}/buckets/homepage"
  type  = "SecureString"
  value = local.root_bucket
}
