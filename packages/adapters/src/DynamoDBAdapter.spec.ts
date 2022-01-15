import { DynamoDBAdapter } from "./DynamoDBAdapter";
import { ProviderType } from "@lefthoek/types";

const mockPromise = jest.fn();

jest.mock("aws-sdk", () => {
  return {
    DynamoDB: {
      DocumentClient: jest.fn(() => {
        return {
          put() {
            return { promise: mockPromise };
          },
          get({ Key: { provider_id } }: { Key: { provider_id: string } }) {
            const authData = {
              team_id: "XYX",
              provider_id: "XXX",
              provider_type: "SLACK",
              access_token: "XXXX",
            };
            const Item = provider_id === "XXX" ? authData : null;
            return {
              promise: mockPromise.mockResolvedValue({
                Item,
              }),
            };
          },
        };
      }),
    },
  };
});

describe("DynamoDB", () => {
  beforeEach(() => {
    mockPromise.mockClear();
  });

  it("throw without a tablename", () => {
    expect(() => new DynamoDBAdapter({ table_name: "" })).toThrow();
    expect(() => new DynamoDBAdapter({ table_name: "xxxx" })).not.toThrow();
  });

  it("get an item", async () => {
    const ddb = new DynamoDBAdapter({ table_name: "xxx" });

    expect(ddb).toBeDefined();

    expect(
      await ddb.fetch({
        provider_id: "XXX",
        provider_type: ProviderType.Slack,
      })
    ).toBeTruthy();

    expect(
      await ddb.fetch({
        provider_id: "YYY",
        provider_type: ProviderType.Slack,
      })
    ).toBeNull();

    expect(mockPromise).toBeCalledTimes(2);
  });

  it("put an item", async () => {
    const ddb = new DynamoDBAdapter({ table_name: "xxx" });

    expect(ddb).toBeDefined();

    const authData = {
      team_id: "XYX",
      provider_id: "XXX",
      provider_type: ProviderType.Slack,
      access_token: "XXXX",
    };
    expect(await ddb.write(authData)).toBe(authData);

    expect(mockPromise).toBeCalledTimes(1);
  });
});
