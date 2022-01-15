import { AuthLookup } from "./AuthLookup";
import { ProviderType } from "@lefthoek/types";

const mockPromise = jest.fn();

jest.mock("@lefthoek/adapters", () => ({
  __esModule: true, // this property makes it work
  DynamoDBAdapter: function () {
    return {
      fetch: mockPromise,
      write: mockPromise,
    };
  },
}));

describe("AuthLookup", () => {
  beforeEach(() => {
    mockPromise.mockClear();
  });

  it("gets auth data if provider id and provider type exist", async () => {
    const authLookup = new AuthLookup({ table_name: "xxx" });

    expect(authLookup).toBeDefined();

    const authData = {
      team_id: "XYX",
      provider_id: "XXX",
      provider_type: "SLACK",
      access_token: "XXXX",
    };
    mockPromise.mockResolvedValue(authData);

    expect(
      await authLookup.fetch({
        provider_id: "XXX",
        provider_type: ProviderType.Slack,
      })
    ).toBeTruthy();
    expect(mockPromise).toBeCalledTimes(1);
  });

  it("returns null if provider id and provider type do not exist", async () => {
    const authLookup = new AuthLookup({ table_name: "xxx" });

    expect(authLookup).toBeDefined();

    mockPromise.mockResolvedValue(null);

    expect(
      await authLookup.fetch({
        provider_id: "YYY",
        provider_type: ProviderType.Slack,
      })
    ).toBeNull();

    expect(mockPromise).toBeCalledTimes(1);
  });

  it("put an item", async () => {
    const authLookup = new AuthLookup({ table_name: "xxx" });
    expect(authLookup).toBeDefined();

    const authData = {
      team_id: "XYX",
      provider_id: "XXX",
      provider_type: ProviderType.Slack,
      access_token: "XXXX",
    };

    mockPromise.mockResolvedValue(authData);
    expect(await authLookup.write(authData)).toBe(authData);
    expect(mockPromise).toBeCalledTimes(1);
  });
});
