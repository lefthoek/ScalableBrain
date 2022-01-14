import { AuthLookup } from "./AuthLookup";
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

describe("AuthLookup", () => {
  beforeEach(() => {
    mockPromise.mockClear();
  });

  test("throw without a tablename", () => {
    expect(() => new AuthLookup({ table_name: "" })).toThrow();
    expect(() => new AuthLookup({ table_name: "xxxx" })).not.toThrow();
  });

  test("get an item", async () => {
    const authLookup = new AuthLookup({ table_name: "xxx" });

    expect(authLookup).toBeDefined();

    expect(
      await authLookup.get({
        provider_id: "XXX",
        provider_type: ProviderType.Slack,
      })
    ).toBeTruthy();

    expect(
      await authLookup.get({
        provider_id: "YYY",
        provider_type: ProviderType.Slack,
      })
    ).toBeNull();

    expect(mockPromise).toBeCalledTimes(2);
  });

  test("put an item", async () => {
    const authLookup = new AuthLookup({ table_name: "xxx" });

    expect(authLookup).toBeDefined();

    const authData = {
      team_id: "XYX",
      provider_id: "XXX",
      provider_type: ProviderType.Slack,
      access_token: "XXXX",
    };
    expect(await authLookup.write(authData)).toBe(authData);

    expect(mockPromise).toBeCalledTimes(1);
  });
});
