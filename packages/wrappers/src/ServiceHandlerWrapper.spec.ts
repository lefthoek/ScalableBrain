import { serviceHandlerWrapper } from "./ServiceHandlerWrapper";

describe("ServiceHandlerWrapper", () => {
  beforeEach(() => {
    mock.mockClear();
  });

  it("throws without a valid handler", async () => {
    const handler = async () => {
      return {
        detailType: "SOMETHING",
        detail: {},
      };
    };
    const cb = jest.fn();
    const wrapper = serviceHandlerWrapper(handler);
    await expect(wrapper(null, null, cb)).rejects.toThrow();
  });

  it("puts an event on the bus with a valid handler", async () => {
    const handler = async () => {
      return {
        detailType: "SOMETHING",
        detail: {},
      };
    };
    const cb = jest.fn();
    const wrapper = serviceHandlerWrapper(handler);
    await wrapper({ "detail-type": "SOMETHING...", detail: {} }, null, cb);
    expect(cb).toHaveBeenCalledWith(null, undefined);
  });
});

const mock = jest.fn();

jest.mock("@lefthoek/adapters", () => ({
  __esModule: true, // this property makes it work
  EventBridgeAdapter: function () {
    return {
      put: mock,
    };
  },
}));
