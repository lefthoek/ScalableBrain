import AWS from "aws-sdk";
import type { AuthLookupData } from "@lefthoek/types";
const ddb = new AWS.DynamoDB.DocumentClient();

type IdKeys = "provider_id" | "provider_type";
type AuthInput = Pick<AuthLookupData, IdKeys>;

class DynamoDBAdapter {
  table_name: string;

  constructor({ table_name }: { table_name: string | undefined }) {
    if (!table_name) {
      throw new Error("The table name must be set in your environment");
    }
    this.table_name = table_name;
  }
  async fetch({ provider_id, provider_type }: AuthInput) {
    const params = {
      TableName: this.table_name,
      Key: { provider_id, provider_type },
    };
    const { Item } = await ddb.get(params).promise();
    return Item as AuthLookupData | null;
  }

  async write(data: AuthLookupData) {
    try {
      await ddb.put({ TableName: this.table_name, Item: data }).promise();
      return data;
    } catch (e) {
      console.log(e);
      throw new Error(JSON.stringify(e));
    }
  }
}
export { DynamoDBAdapter };
