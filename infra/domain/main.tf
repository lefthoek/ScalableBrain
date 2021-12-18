variable "root_domain_name" {}


resource "aws_route53_zone" "zone" {
  name = var.root_domain_name
}

resource "aws_acm_certificate" "certificate" {
  domain_name               = "*.${var.root_domain_name}"
  validation_method         = "EMAIL"
  subject_alternative_names = [var.root_domain_name]
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
