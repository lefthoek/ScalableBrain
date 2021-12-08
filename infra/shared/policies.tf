resource "aws_iam_policy" "event_bus_write_access" {
  name   = "${local.event_bus}-write-access-policy"
  path   = "/"
  policy = data.aws_iam_policy_document.event_bus_write_access.json
}

