variable "root_domain_name" {}
variable "certificate_arn" {}
variable "zone_id" {}

module "www" {
  source           = "../website"
  subdomain_prefix = "www"
  root_domain_name = var.root_domain_name
  certificate_arn  = var.certificate_arn
  zone_id          = var.zone_id
}

