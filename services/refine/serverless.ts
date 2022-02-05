import type { AWS } from "@serverless/typescript";

import { plugins, provider, custom, functions } from "./serverless/index";

const serverlessConfiguration: AWS = {
  service: "scalable-brain-refine",
  frameworkVersion: "3",
  configValidationMode: "error",
  useDotenv: true,
  plugins,
  provider,
  custom,
  functions,
};

module.exports = serverlessConfiguration;
