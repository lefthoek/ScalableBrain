resource "aws_ssm_parameter" "function_role" {
  name  = "${local.parameter_prefix}/roles/function"
  type  = "SecureString"
  value = aws_iam_role.function_role.arn
}

resource "aws_ssm_parameter" "knowledge_base_bucket_name" {
  name  = "${local.parameter_prefix}/buckets/knowledge_base"
  type  = "SecureString"
  value = local.knowledge_base_bucket
}
