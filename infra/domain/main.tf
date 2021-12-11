variable "root_domain_name" {}

resource "aws_route53_zone" "zone" {
  name = var.root_domain_name
}

resource "aws_route53_record" "validation" {
  zone_id = "${aws_route53_zone.zone_id}"
  name = "${aws_acm_certificate.default.domain_validation_options.0.resource_record_name}"
  type = "${aws_acm_certificate.default.domain_validation_options.0.resource_record_type}"
  records = ["${aws_acm_certificate.default.domain_validation_options.0.resource_record_value}"]
  ttl = "300"
}

resource "aws_acm_certificate" "certificate" {
  provider = "aws.acm"
  domain_name               = "*.${var.root_domain_name}"
  validation_method         = "DNS"
  subject_alternative_names = [var.root_domain_name]
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "default" {
  provider = "aws.acm"
  certificate_arn = "${aws_acm_certificate.default.arn}"
  validation_record_fqdns = [
    "${aws_route53_record.validation.fqdn}",
  ]
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
