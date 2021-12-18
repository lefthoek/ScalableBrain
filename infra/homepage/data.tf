data "aws_iam_policy_document" "public_read" {
  statement {
    actions = ["s3:GetObject"]
    principals {
      type        = "*"
      identifiers = ["*"]
    }

    resources = [
      "arn:aws:s3:::${var.root_domain_name}/*"
    ]

  }
}
