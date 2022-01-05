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

data "aws_iam_policy_document" "auth_lookup_table_read_access" {
  statement {
    actions = [
      "dynamodb:Query",
      "dynamodb:Scan",
      "dynamodb:GetItem",
    ]

    resources = [
      aws_dynamodb_table.auth_lookup_table.arn,
    ]
  }
}

data "aws_iam_policy_document" "auth_lookup_table_write_access" {
  statement {
    actions = [
      "dynamodb:PutItem",
      "dynamodb:UpdateItem",
      "dynamodb:DeleteItem"
    ]

    resources = [
      aws_dynamodb_table.auth_lookup_table.arn,
    ]
  }
}

