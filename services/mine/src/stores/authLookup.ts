import AWS from "aws-sdk";

import type { TeamRepoMetaData } from "@service_types/models";
type Credentials = { access_token: string };
type AuthTeam = Credentials & TeamRepoMetaData;

const ddb = new AWS.DynamoDB.DocumentClient();

class AuthLookup {
  table_name: string;

  constructor({ table_name }: { table_name?: string }) {
    if (!table_name) {
      throw new Error("The table name must be set in your environment");
    }
    this.table_name = table_name;
  }

  async get({ team_id, platform_type }: TeamRepoMetaData) {
    const params = {
      TableName: this.table_name,
      Key: { team_id, platform_type },
    };
    const { Item } = await ddb.get(params).promise();
    if (!Item && !Item!.access_token) {
      throw new Error("this team does not exist");
    }
    return Item as AuthTeam;
  }

  async write({ access_token, ...team }: AuthTeam) {
    try {
      const Item = { ...team, access_token };
      await ddb.put({ TableName: this.table_name, Item }).promise();
      return team;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
}
export default AuthLookup;
