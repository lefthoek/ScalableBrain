resource "aws_ssm_parameter" "datalake_bucket_name" {
  name  = "${local.parameter_prefix}/buckets/datalake"
  type  = "SecureString"
  value = local.datalake_bucket
}
