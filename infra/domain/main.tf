terraform {
  required_providers {
    aws = {
      source                = "hashicorp/aws"
      version               = ">= 3.54.0"
      configuration_aliases = [aws.acm]
    }
  }
}

variable "root_domain_name" {}


resource "aws_route53_zone" "zone" {
  name = var.root_domain_name
}

resource "aws_route53_record" "validation" {
  provider = aws.acm
  for_each = {
    for dvo in aws_acm_certificate.certificate.domain_validation_options : dvo.domain_name => {
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


resource "aws_acm_certificate" "certificate" {
  provider = aws.acm
  domain_name               = var.root_domain_name
  validation_method         = "DNS"
  subject_alternative_names = ["*.${var.root_domain_name}"]
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "default" {
  provider = aws.acm
  certificate_arn = aws_acm_certificate.certificate.arn
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
  value = aws_acm_certificate.certificate.arn
}
