resource "aws_iam_policy" "raw_data_bucket_read_access" {
  name   = "${local.raw_data_bucket}-read-access-policy"
  path   = "/"
  policy = data.aws_iam_policy_document.raw_data_bucket_read_access.json
}

resource "aws_iam_policy" "raw_data_bucket_write_access" {
  name   = "${local.raw_data_bucket}-write-access-policy"
  path   = "/"
  policy = data.aws_iam_policy_document.raw_data_bucket_write_access.json
}
