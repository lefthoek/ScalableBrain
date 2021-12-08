data "aws_iam_policy_document" "event_bus_write_access" {
  statement {
    actions = [
      "events:PutEvents"
    ]

    resources = [
      aws_cloudwatch_event_bus.event_bus.arn
    ]
  }
}

