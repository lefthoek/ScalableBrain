resource "aws_s3_bucket" "datalake_bucket" {
  bucket = local.datalake_bucket
  acl    = "private"

  tags = {
    ProjectName = var.project_name
    Environment = var.environment_name
  }
}

resource "aws_cloudwatch_event_bus" "event_bus" {
  name = local.event_bus

  tags = {
    ProjectName = var.project_name
    Environment = var.environment_name
  }
}

