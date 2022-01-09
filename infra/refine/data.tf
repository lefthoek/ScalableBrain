data "aws_iam_policy_document" "lambda_role_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

data "aws_iam_policy_document" "knowledge_base_bucket_read_access" {
  statement {
    actions = [
      "s3:ListBucket",
      "s3:GetObject",
    ]

    resources = [
      aws_s3_bucket.knowledge_base_bucket.arn,
      "${aws_s3_bucket.knowledge_base_bucket.arn}/*"
    ]
  }
}

data "aws_iam_policy_document" "knowledge_base_bucket_write_access" {
  statement {
    actions = [
      "s3:PutObject",
      "s3:PutObjectAcl"
    ]

    resources = [
      aws_s3_bucket.knowledge_base_bucket.arn,
      "${aws_s3_bucket.knowledge_base_bucket.arn}/*"
    ]
  }
}
