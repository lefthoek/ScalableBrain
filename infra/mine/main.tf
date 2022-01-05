resource "aws_s3_bucket" "raw_data_bucket" {
  bucket = local.raw_data_bucket
  acl    = "private"

  tags = {
    ProjectName = var.project_name
    Environment = var.environment_name
  }
}
