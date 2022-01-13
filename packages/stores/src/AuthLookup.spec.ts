import { AuthLookup } from "./AuthLookup";
import { ProviderType } from "@lefthoek/types";

jest.mock("aws-sdk", () => {
  return {
    config: {
      update() {
        return {};
      },
    },
    DynamoDB: {
      DocumentClient: jest.fn(() => {
        return {
          get: () => {
            return {
              promise: () => {
                return {
                  Item: "XXX",
                };
              },
            };
          },
        };
      }),
    },
  };
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
});
