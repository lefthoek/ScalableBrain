resource "aws_s3_bucket" "root" {
  bucket = local.root_bucket
  acl    = "public-read"
  policy = aws_iam_policy.root_bucket_public_read.arn

  website {
    redirect_all_requests_to = "https://${module.www.domain_name}"
  }
}

resource "aws_cloudfront_distribution" "root_distribution" {
  origin {
    custom_origin_config {
      http_port              = "80"
      https_port             = "443"
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }
    domain_name = aws_s3_bucket.root.website_endpoint
    origin_id   = var.root_domain_name
  }

  enabled             = true
  default_root_object = "index.html"

  default_cache_behavior {
    viewer_protocol_policy = "redirect-to-https"
    compress               = true
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = var.root_domain_name
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  aliases = [var.root_domain_name]

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = var.certificate_arn
    ssl_support_method  = "sni-only"
  }
}

resource "aws_route53_record" "root" {
  zone_id = var.zone_id
  name    = ""
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.root_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.root_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

module "www" {
  source           = "../website"
  subdomain_prefix = "www"
  root_domain_name = var.root_domain_name
  certificate_arn  = var.certificate_arn
  zone_id          = var.zone_id
}
