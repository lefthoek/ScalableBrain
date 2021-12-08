resource "aws_s3_bucket" "raw_data_bucket" {
  bucket = local.raw_data_bucket
  acl    = "private"

  tags = {
    ProjectName = var.project_name
    Environment = var.environment_name
  }
}

resource "aws_dynamodb_table" "auth_lookup_table" {
  name           = local.auth_lookup_table
  hash_key       = "team_id"
  range_key      = "platform_type"
  read_capacity  = 1
  write_capacity = 1

  attribute {
    name = "team_id"
    type = "S"
  }

  attribute {
    name = "platform_type"
    type = "S"
  }

  tags = {
    ProjectName = var.project_name
    Environment = var.environment_name
  }
}

