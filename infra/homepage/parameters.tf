resource "aws_ssm_parameter" "homepage_bucket" {
  name  = "${local.parameter_prefix}/buckets/homepage"
  type  = "SecureString"
  value = "www.${local.root_bucket}"
}

resource "aws_ssm_parameter" "homepage_distribution_Id" {
  name  = "${local.parameter_prefix}/distribution/id"
  type  = "SecureString"
  value = aws_cloudfront_distribution.root_distribution.id
}
