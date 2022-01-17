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
    const eventBusReply = { success: true };
    const event = {
      detailType: "SOMETHING...",
      detail: {},
    };
    mock.mockResolvedValue(eventBusReply);
    handlerMock.mockResolvedValue(event);
    const wrapper = serviceHandlerWrapper(handlerMock);
    await wrapper(
      { "detail-type": event.detailType, detail: event.detail },
      null,
      cbMock
    );
    expect(handlerMock).toHaveBeenCalledWith(event, expect.anything());
    expect(mock).toBeCalledWith(event);
    expect(cbMock).toHaveBeenCalledWith(null, eventBusReply);
  });
});

const mock = jest.fn();
const handlerMock = jest.fn();
const cbMock = jest.fn();

jest.mock("@lefthoek/adapters", () => ({
  __esModule: true, // this property makes it work
  EventBridgeAdapter: function () {
    return {
      put: mock,
    };
  },
}));
