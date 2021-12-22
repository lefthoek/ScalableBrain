data "aws_iam_policy_document" "lambda_role_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

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

data "aws_iam_policy_document" "websockets_apigateway_access" {
  statement {
    actions = [
      "execute-api:*"
    ]

    resources = [
      aws_apigatewayv2_api.websockets_api.execution_arn,
      "${aws_apigatewayv2_api.websockets_api.execution_arn}/*"
    ]
  }
}
