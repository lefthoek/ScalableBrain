output "event_bus_write_access_policy" {
  value = aws_iam_policy.event_bus_write_access.arn
}

output "auth_lookup_table_write_access_policy" {
  value = aws_iam_policy.auth_lookup_table_write_access.arn
}

output "auth_lookup_table_read_access_policy" {
  value = aws_iam_policy.auth_lookup_table_read_access.arn
}
