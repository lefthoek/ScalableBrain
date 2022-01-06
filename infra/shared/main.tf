resource "aws_cloudwatch_event_bus" "event_bus" {
  name = local.event_bus

  tags = {
    ProjectName = var.project_name
    Environment = var.environment_name
  }
}

resource "aws_dynamodb_table" "auth_lookup_table" {
  name           = local.auth_lookup_table
  hash_key       = "provider_id"
  range_key      = "provider_type"
  read_capacity  = 1
  write_capacity = 1

  attribute {
    name = "team_id"
    type = "S"
  }

  attribute {
    name = "provider_type"
    type = "S"
  }

  tags = {
    ProjectName = var.project_name
    Environment = var.environment_name
  }
}

