import type { AWS } from "@serverless/typescript";

const plugins: AWS["plugins"] = [
  "serverless-esbuild",
  "serverless-offline",
  "serverless-plugin-monorepo",
];

export default plugins;
