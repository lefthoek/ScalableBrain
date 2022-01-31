import type { AWS } from "@serverless/typescript";

import provider from "./serverless/provider";
import custom from "./serverless/custom";
import functions from "./serverless/functions";

const serverlessConfiguration: AWS = {
  service: "scalable-brain-refine",
  frameworkVersion: "3",
  configValidationMode: "error",
  useDotenv: true,
  plugins: [
    "serverless-esbuild",
    "serverless-offline",
    "serverless-plugin-monorepo",
  ],
  provider,
  custom,
  functions,
};

module.exports = serverlessConfiguration;
