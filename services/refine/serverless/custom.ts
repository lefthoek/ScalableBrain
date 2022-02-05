import type { AWS } from "@serverless/typescript";
import { custom as base } from "@lefthoek/serverless-config";

const custom: AWS["custom"] = {
  ...base,
  service_name: "refine",
  auth_lookup_table:
    "${ssm:/${self:custom.shared_parameter_prefix}/tables/auth_lookup}",
  knowledge_base_bucket:
    "${ssm:/${self:custom.service_parameter_prefix}/buckets/knowledge_base}",
  init_team: "${self:custom.function_prefix}-init-team",
};

export default custom;
