resource "aws_iam_policy" "event_bus_write_access" {
  name   = "${local.event_bus}-write-access-policy"
  path   = "/"
  policy = data.aws_iam_policy_document.event_bus_write_access.json
}

resource "aws_iam_policy" "datalake_bucket_read_access" {
  name   = "${local.datalake_bucket}-read-access-policy"
  path   = "/"
  policy = data.aws_iam_policy_document.datalake_bucket_read_access.json
}

resource "aws_iam_policy" "datalake_bucket_write_access" {
  name   = "${local.datalake_bucket}-write-access-policy"
  path   = "/"
  policy = data.aws_iam_policy_document.datalake_bucket_write_access.json
}
