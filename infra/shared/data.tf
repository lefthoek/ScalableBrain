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

data "aws_iam_policy_document" "datalake_bucket_read_access" {
  statement {
    actions = [
      "s3:ListBucket",
      "s3:GetObject",
    ]

    resources = [
      aws_s3_bucket.datalake_bucket.arn,
      "${aws_s3_bucket.datalake_bucket.arn}/*"
    ]
  }
}

data "aws_iam_policy_document" "datalake_bucket_write_access" {
  statement {
    actions = [
      "s3:PutObject",
      "s3:PutObjectAcl"
    ]

    resources = [
      aws_s3_bucket.datalake_bucket.arn,
      "${aws_s3_bucket.datalake_bucket.arn}/*"
    ]
  }
}
