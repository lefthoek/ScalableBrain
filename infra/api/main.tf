resource "aws_dynamodb_table" "websockets_connections_table" {
  name           = local.websockets_connections_table
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "websockets_subscriptions_table" {
  name           = local.websockets_subscriptions_table
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "topic"
    type = "S"
  }

  attribute {
    name = "connectionId"
    type = "S"
  }

  global_secondary_index {
    name            = "ConnectionIndex"
    hash_key        = "connectionId"
    write_capacity  = 1
    read_capacity   = 1
    projection_type = "ALL"
  }

  global_secondary_index {
    name            = "TopicIndex"
    hash_key        = "topic"
    write_capacity  = 1
    read_capacity   = 1
    projection_type = "ALL"
  }
}
