import AWS from "aws-sdk";
import type { AuthLookupData, Maybe } from "@lefthoek/types";

const ddb = new AWS.DynamoDB.DocumentClient();
type AuthInput = Pick<AuthLookupData, "provider_id" | "provider_type">;
interface LookupTable<I, T> {
  get: (input: I) => Promise<Maybe<T>>;
  write: (team: AuthLookupData) => Promise<AuthLookupData>;
}

class AuthLookup implements LookupTable<AuthInput, AuthLookupData> {
  table_name: string;

  constructor({ table_name }: { table_name?: string }) {
    if (!table_name) {
      throw new Error("The table name must be set in your environment");
    }
    this.table_name = table_name;
  }

  async getAccessToken(input: AuthInput) {
    const item = await this.get(input);
    if (!item) {
      throw new Error("this team does not exist");
    }
    return item.access_token;
  }

  async get({ provider_id, provider_type }: AuthInput) {
    const params = {
      TableName: this.table_name,
      Key: { provider_id, provider_type },
    };
    const { Item } = await ddb.get(params).promise();
    return Item as AuthLookupData | null;
  }

  async write(team: AuthLookupData) {
    try {
      await ddb.put({ TableName: this.table_name, Item: team }).promise();
      return team;
    } catch (e) {
      console.log(e);
      throw new Error(JSON.stringify(e));
    }
  }
}
export { AuthLookup };
