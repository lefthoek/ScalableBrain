resource "aws_iam_policy" "root_bucket_public_read" {
  name   = "${var.resources_prefix}-public-read-policy"
  path   = "/"
  policy = data.aws_iam_policy_document.public_read.json
}
