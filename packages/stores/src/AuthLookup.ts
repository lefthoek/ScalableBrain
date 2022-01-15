import type { AuthLookupData, Store } from "@lefthoek/types";
import { DynamoDBAdapter } from "@lefthoek/adapters";

type IdKeys = "provider_id" | "provider_type";
type AuthInput = Pick<AuthLookupData, IdKeys>;

class AuthLookup implements Store<AuthLookupData, IdKeys> {
  adapter: DynamoDBAdapter;

  constructor({ adapter }: { adapter: DynamoDBAdapter }) {
    this.adapter = adapter;
  }

  async getAccessToken(input: AuthInput) {
    const item = await this.adapter.fetch(input);
    if (!item) {
      throw new Error("this team does not exist");
    }
    return item.access_token;
  }

  async fetch(input: AuthInput) {
    return (await this.adapter.fetch(input)) as AuthLookupData | null;
  }

  async write(data: AuthLookupData) {
    return (await this.adapter.write(data)) as AuthLookupData;
  }
}
export { AuthLookup };
