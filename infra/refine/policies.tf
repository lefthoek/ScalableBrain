resource "aws_iam_policy" "knowledge_base_bucket_read_access" {
  name   = "${local.knowledge_base_bucket}-read-access-policy"
  path   = "/"
  policy = data.aws_iam_policy_document.knowledge_base_bucket_read_access.json
}

resource "aws_iam_policy" "knowledge_base_bucket_write_access" {
  name   = "${local.knowledge_base_bucket}-write-access-policy"
  path   = "/"
  policy = data.aws_iam_policy_document.knowledge_base_bucket_write_access.json
}
