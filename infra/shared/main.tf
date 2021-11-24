resource "aws_s3_bucket" "datalake_bucket" {
  bucket = local.datalake_bucket
  acl    = "private"

  tags = {
    ProjectName = var.project_name
    Environment = var.environment_name
  }
}
