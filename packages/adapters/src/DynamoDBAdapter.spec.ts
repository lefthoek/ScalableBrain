import { DynamoDBAdapter } from "./DynamoDBAdapter";

describe("DynamoDB", () => {
  beforeEach(() => {
    mock.mockClear();
  });

  it("throws without a tablename", () => {
    expect(() => new DynamoDBAdapter({ table_name: "" })).toThrow();
    expect(() => new DynamoDBAdapter({ table_name: "xxxx" })).not.toThrow();
  });

  it("gets an item when it exists", async () => {
    const ddb = new DynamoDBAdapter({ table_name: "xxx" });
    expect(ddb).toBeDefined();
    mock.mockReturnValue({ promise: () => ({ Item: "AAA" }) });

    expect(
      await ddb.fetch({
        key1: "AAA",
        key2: "AAA",
      })
    ).toBeTruthy();
    expect(mock).toBeCalledTimes(1);
  });

  it("returns null when item doesn't exist", async () => {
    const ddb = new DynamoDBAdapter({ table_name: "xxx" });
    expect(ddb).toBeDefined();
    mock.mockReturnValue({ promise: () => ({ Item: null }) });
    expect(
      await ddb.fetch({
        key1: "BBB",
        key2: "BBB",
      })
    ).toBeNull();

    expect(mock).toBeCalledTimes(1);
  });

  it("return the item after write", async () => {
    const ddb = new DynamoDBAdapter({ table_name: "xxx" });

    expect(ddb).toBeDefined();

    const data = {
      key1: "BBB",
      key2: "BBB",
    };

    mock.mockReturnValue({ promise: () => ({}) });
    expect(await ddb.write(data)).toBe(data);

    expect(mock).toBeCalledTimes(1);
  });
});

const mock = jest.fn();

jest.mock("aws-sdk", () => {
  return {
    DynamoDB: {
      DocumentClient: jest.fn(() => {
        return {
          put: (args: AWS.DynamoDB.DocumentClient.PutRequest) => mock(args),
          get: (args: AWS.DynamoDB.DocumentClient.GetItemInput) => mock(args),
        };
      }),
    },
  };
});
