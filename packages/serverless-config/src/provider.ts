import type { AWS } from "@serverless/typescript";

const provider: AWS["provider"] = {
  name: "aws",
  runtime: "nodejs14.x",
  iam: {
    role: "${self:custom.function_role}",
  },
  region: "eu-west-1",
};

export default provider;
