resource "aws_s3_bucket" "knowledge_base_bucket" {
  bucket = local.knowledge_base_bucket
  acl    = "private"

  tags = {
    ProjectName = var.project_name
    Environment = var.environment_name
  }
}
