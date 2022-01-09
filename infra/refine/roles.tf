resource "aws_iam_role" "function_role" {
  name               = local.function_role
  assume_role_policy = data.aws_iam_policy_document.lambda_role_assume_role_policy.json
  managed_policy_arns = concat(var.policies, [
    aws_iam_policy.knowledge_base_bucket_read_access.arn,
    aws_iam_policy.knowledge_base_bucket_write_access.arn,
  ])
}