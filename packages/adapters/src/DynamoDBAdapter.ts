import AWS from "aws-sdk";
const ddb = new AWS.DynamoDB.DocumentClient();

class DynamoDBAdapter {
  table_name: string;

  constructor({ table_name }: { table_name: string | undefined }) {
    if (!table_name) {
      throw new Error("The table name must be set in your environment");
    }
    this.table_name = table_name;
  }
  async fetch(Key: Record<string, string>) {
    const params = {
      TableName: this.table_name,
      Key,
    };
    const { Item } = await ddb.get(params).promise();
    return Item as Record<string, string> | null;
  }

  async write(Item: Record<string, string>) {
    try {
      await ddb.put({ TableName: this.table_name, Item }).promise();
      return Item;
    } catch (e) {
      console.log(e);
      throw new Error(JSON.stringify(e));
    }
  }
}

export { DynamoDBAdapter };
