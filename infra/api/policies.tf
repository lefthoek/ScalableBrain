resource "aws_iam_policy" "websockets_tables_access" {
  name   = "${local.websockets_tables}-access-policy"
  path   = "/"
  policy = data.aws_iam_policy_document.websockets_tables_access.json
}
