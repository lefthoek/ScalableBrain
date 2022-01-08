import AWS from "aws-sdk";

import type { FSAdapter } from "@lefthoek/types";

const s3 = new AWS.S3();

class S3Adapter implements FSAdapter {
  bucket_name: string;

  constructor({ bucket_name }: { bucket_name?: string }) {
    if (!bucket_name) {
      throw new Error("The bucket name must be set in your environment");
    }
    this.bucket_name = bucket_name;
  }

  async writeFile({ path, data }: { path: string; data?: any }) {
    await s3
      .putObject({
        Bucket: this.bucket_name,
        Key: path,
        Body: data,
      })
      .promise();
    return path;
  }

  async deleteFile({ path }: { path: string }) {
    await s3
      .deleteObject({
        Bucket: this.bucket_name,
        Key: path,
      })
      .promise();
    return path;
  }

  async readJSON({ path }: { path: string }) {
    console.log("P", path);
    try {
      const { Body } = await s3
        .getObject({ Bucket: this.bucket_name, Key: path })
        .promise();
      console.log("B", Body);
      const json = Body ? Body.toString("utf-8") : "{}";
      console.log("J", Body);
      return JSON.parse(json);
    } catch (e) {
      console.log("e", e);
    }
  }

  async writeJSON({ path, data }: { path: string; data: any }) {
    return await this.writeFile({ path, data: JSON.stringify(data, null, 2) });
  }

  async touch({ path }: { path: string }) {
    return await this.writeFile({ path });
  }
}

export { S3Adapter };
