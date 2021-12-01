resource "aws_iam_policy" "auth_lookup_table_access" {
  name   = "${local.auth_lookup_table}-access-policy"
  path   = "/"
  policy = data.aws_iam_policy_document.auth_lookup_table_access.json
}
