resource "aws_ssm_parameter" "homepage_bucket" {
  name  = "${local.parameter_prefix}/buckets/homepage"
  type  = "SecureString"
  value = local.root_bucket
}

resource "aws_ssm_parameter" "homepage_distribution_d" {
  name  = "${local.parameter_prefix}/distribution/id"
  type  = "SecureString"
  value = aws.cloudfront_distribution.root_distribution.id
}
