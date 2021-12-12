terraform {
  required_providers {
    aws = {
      source                = "hashicorp/aws"
      version               = ">= 3.54.0"
      configuration_aliases = [aws.us]
    }
  }
}

variable "root_domain_name" {}


resource "aws_route53_zone" "zone" {
  provider = aws.us
  name = var.root_domain_name
}

resource "aws_route53_record" "validation" {
  provider = aws.us
  for_each = {
    for dvo in aws.us_certificate.certificate.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 300
  type            = each.value.type
  zone_id         = aws_route53_zone.zone.zone_id
}


resource "aws.us_certificate" "certificate" {
  provider = aws.us
  domain_name               = var.root_domain_name
  validation_method         = "DNS"
  subject_alternative_names = ["*.${var.root_domain_name}"]
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws.us_certificate_validation" "default" {
  provider = aws.us
  certificate_arn = aws.us_certificate.certificate.arn
  validation_record_fqdns = [for record in aws_route53_record.validation : record.fqdn]
  timeouts {
    create = "60m"
  }
}

output "domain_name" {
  value = var.root_domain_name
}

output "zone_id" {
  value = aws_route53_zone.zone.zone_id
}

output "certificate_arn" {
  value = aws.us_certificate.certificate.arn
}
