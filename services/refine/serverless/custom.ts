import type { AWS } from "@serverless/typescript";

const custom: AWS["custom"] = {
  esbuild: {
    loader: {
      ".graphql": "text",
    },
  },
  project_name: "scalable-brain",
  service_name: "refine",
  service_parameter_prefix:
    "${self:custom.project_name}/${opt:stage}/${self:custom.service_name}",
  shared_parameter_prefix: "${self:custom.project_name}/prod/shared",
  event_bus: "${ssm:/${self:custom.shared_parameter_prefix}/event_bus}",
  auth_lookup_table:
    "${ssm:/${self:custom.shared_parameter_prefix}/tables/auth_lookup}",
  knowledge_base_bucket:
    "${ssm:/${self:custom.service_parameter_prefix}/buckets/knowledge_base}",
  function_prefix:
    "${self:custom.project_name}-${self:custom.service_name}-${opt:stage}",
  init_team: "${self:custom.function_prefix}-init-team",
  function_role:
    "${ssm:/${self:custom.service_parameter_prefix}/roles/function}",
};

export default custom;
