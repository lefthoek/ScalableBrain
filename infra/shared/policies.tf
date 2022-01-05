resource "aws_iam_policy" "event_bus_write_access" {
  name   = "${local.event_bus}-write-access-policy"
  path   = "/"
  policy = data.aws_iam_policy_document.event_bus_write_access.json
}


resource "aws_iam_policy" "auth_lookup_table_read_access" {
  name   = "${local.auth_lookup_table}-read-access-policy"
  path   = "/"
  policy = data.aws_iam_policy_document.auth_lookup_table_read_access.json
}

resource "aws_iam_policy" "auth_lookup_table_write_access" {
  name   = "${local.auth_lookup_table}-write-access-policy"
  path   = "/"
  policy = data.aws_iam_policy_document.auth_lookup_table_write_access.json
}
