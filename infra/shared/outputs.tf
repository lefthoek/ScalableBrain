output "datalake_bucket_read_access_policy" {
  value = aws_iam_policy.datalake_bucket_read_access.arn
}

output "datalake_bucket_write_access_policy" {
  value = aws_iam_policy.datalake_bucket_write_access.arn
}
