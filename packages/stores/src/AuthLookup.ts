import AWS from "aws-sdk";
import type { AuthLookupData } from "@lefthoek/types";

const ddb = new AWS.DynamoDB.DocumentClient();

class AuthLookup {
  table_name: string;

  constructor({ table_name }: { table_name?: string }) {
    if (!table_name) {
      throw new Error("The table name must be set in your environment");
    }
    this.table_name = table_name;
  }

  async get({
    team_id,
    provider_type,
  }: Pick<AuthLookupData, "team_id" | "provider_type">) {
    const params = {
      TableName: this.table_name,
      Key: { team_id, provider_type },
    };
    const { Item } = await ddb.get(params).promise();
    if (!Item && !Item!.access_token) {
      throw new Error("this team does not exist");
    }
    return Item as AuthLookupData;
  }

  async write({ access_token, ...team }: AuthLookupData) {
    try {
      const Item = { ...team, access_token };
      await ddb.put({ TableName: this.table_name, Item }).promise();
      return team;
    } catch (e) {
      console.log(e);
      throw new Error(JSON.stringify(e));
    }
  }
}
export { AuthLookup };
