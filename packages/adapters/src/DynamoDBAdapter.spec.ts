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
          get() {
            return { promise: mockPromise };
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

  it("throws without a tablename", () => {
    expect(() => new DynamoDBAdapter({ table_name: "" })).toThrow();
    expect(() => new DynamoDBAdapter({ table_name: "xxxx" })).not.toThrow();
  });

  it("gets an item when it exists", async () => {
    const ddb = new DynamoDBAdapter({ table_name: "xxx" });
    expect(ddb).toBeDefined();
    mockPromise.mockResolvedValue({ Item: "AAA" });

    expect(
      await ddb.fetch({
        key1: "AAA",
        key2: "AAA",
      })
    ).toBeTruthy();
    expect(mockPromise).toBeCalledTimes(1);
  });

  it("returns null when item doesn't exist", async () => {
    const ddb = new DynamoDBAdapter({ table_name: "xxx" });
    expect(ddb).toBeDefined();
    mockPromise.mockResolvedValue({ Item: null });
    expect(
      await ddb.fetch({
        key1: "BBB",
        key2: "BBB",
      })
    ).toBeNull();

    expect(mockPromise).toBeCalledTimes(1);
  });

  it("return the item after write", async () => {
    const ddb = new DynamoDBAdapter({ table_name: "xxx" });

    expect(ddb).toBeDefined();

    const data = {
      key1: "BBB",
      key2: "BBB",
    };

    expect(await ddb.write(data)).toBe(data);

    expect(mockPromise).toBeCalledTimes(1);
  });
});
