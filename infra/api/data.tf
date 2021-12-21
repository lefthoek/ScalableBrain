data "aws_iam_policy_document" "websockets_tables_access" {
  statement {
    actions = [
      "dynamodb:Query",
      "dynamodb:Scan",
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:UpdateItem",
      "dynamodb:DeleteItem"
    ]

    resources = [
      aws_dynamodb_table.websockets_connections_table.arn,
      aws_dynamodb_table.websockets_subscriptions_table.arn,
    ]
  }
}
