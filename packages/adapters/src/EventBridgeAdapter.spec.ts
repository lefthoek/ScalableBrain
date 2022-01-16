import { EventBridgeAdapter } from "./EventBridgeAdapter";

const mock = jest.fn();
jest.mock("aws-sdk", () => {
  return {
    EventBridge: jest.fn(() => {
      return {
        putEvents: (args: AWS.EventBridge.PutEventsRequest) => mock(args),
      };
    }),
  };
});

describe("EventBridge", () => {
  beforeEach(() => {
    mock.mockClear();
  });

  const validConfig = { handler_name: "xxx", event_bus_name: "yyy" };

  it("needs a handler_name and event_bus_name", () => {
    const invalid = { handler_name: "", event_bus_name: "" };
    expect(() => new EventBridgeAdapter(invalid)).toThrow();
    expect(() => new EventBridgeAdapter(validConfig)).not.toThrow();
  });

  it("puts formatted events on the bus", async () => {
    const adapter = new EventBridgeAdapter(validConfig);

    expect(adapter).toBeDefined();

    const event = {
      detailType: "DID_SOMETHING",
      detail: { title: "HELLO WORLD" },
    };

    mock.mockReturnValue({ promise: () => ({}) });

    const reply = await adapter.put(event);

    expect(reply).toBe(event.detail);
    expect(mock).toBeCalledTimes(1);
    expect(mock).toBeCalledWith({
      Entries: [
        {
          DetailType: event.detailType,
          Detail: JSON.stringify(event.detail, null, 2),
          EventBusName: validConfig.event_bus_name,
          Source: validConfig.handler_name,
        },
      ],
    });
  });
});
