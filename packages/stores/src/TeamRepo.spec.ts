import { TeamRepo } from "./TeamRepo";
import { S3Adapter } from "@lefthoek/adapters";
import { ProviderType } from "@lefthoek/types";

describe("TeamRepo", () => {
  beforeEach(() => {
    mock.mockClear();
  });

  it("gets team data if team exist", async () => {
    const adapter = new S3Adapter({ bucket_name: "XXX" });
    const teamRepo = new TeamRepo({ adapter });
    expect(teamRepo).toBeDefined();

    const teamData = { id: "XYZ" };
    mock.mockResolvedValue(teamData);
    expect(await teamRepo.fetch(teamData)).toBeTruthy();
    expect(mock).toBeCalledTimes(1);
    expect(mock).toBeCalledWith({ path: "XYZ/meta.json" });
  });

  it("writes team data", async () => {
    const adapter = new S3Adapter({ bucket_name: "XXX" });
    const teamRepo = new TeamRepo({ adapter });
    expect(teamRepo).toBeDefined();

    const teamData = {
      id: "XYZ",
      name: "ABC",
      providers: [{ type: ProviderType.Slack, id: "ZZZ", name: "BCD" }],
    };
    mock.mockResolvedValue(teamData);
    expect(await teamRepo.write(teamData)).toBeTruthy();
    expect(mock).toBeCalledWith({
      path: "XYZ/",
    });

    expect(mock).toBeCalledWith({
      path: "XYZ/meta.json",
      data: teamData,
    });

    expect(mock).toBeCalledTimes(2);
  });
});

const mock = jest.fn();

jest.mock("@lefthoek/adapters", () => ({
  __esModule: true, // this property makes it work
  S3Adapter: function () {
    return {
      readJSON: mock,
      writeJSON: mock,
      touch: mock,
    };
  },
}));
