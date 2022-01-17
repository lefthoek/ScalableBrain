import { S3Adapter } from "./S3Adapter";

describe("S3", () => {
  beforeEach(() => {
    mock.mockClear();
  });

  it("throws without a tablename", () => {
    expect(() => new S3Adapter({ bucket_name: "" })).toThrow();
    expect(() => new S3Adapter({ bucket_name: "xxxx" })).not.toThrow();
  });

  it("touches a file or path", async () => {
    const adapter = new S3Adapter({ bucket_name: "XXX" });
    expect(adapter).toBeDefined();
    mock.mockReturnValue({ promise: () => ({}) });
    const response = await adapter.touch({ path: "/abc" });
    expect(response).toBe("/abc");
    expect(mock).toBeCalledTimes(1);
    expect(mock).toBeCalledWith({
      Body: undefined,
      Bucket: "XXX",
      Key: "/abc",
    });
  });

  it("deletes file or path", async () => {
    const adapter = new S3Adapter({ bucket_name: "XXX" });
    expect(adapter).toBeDefined();
    mock.mockReturnValue({ promise: () => ({}) });
    const response = await adapter.deleteFile({ path: "/abc" });
    expect(response).toBe("/abc");
    expect(mock).toBeCalledTimes(1);
    expect(mock).toBeCalledWith({
      Bucket: "XXX",
      Key: "/abc",
    });
  });

  it("writes a file", async () => {
    const adapter = new S3Adapter({ bucket_name: "XXX" });
    expect(adapter).toBeDefined();
    mock.mockReturnValue({ promise: () => ({}) });
    const response = await adapter.writeFile({
      path: "/abc",
      data: "HELLO WORLD",
    });
    expect(response).toBe("/abc");
    expect(mock).toBeCalledTimes(1);
    expect(mock).toBeCalledWith({
      Body: "HELLO WORLD",
      Bucket: "XXX",
      Key: "/abc",
    });
  });

  it("reads valid JSON files", async () => {
    const adapter = new S3Adapter({ bucket_name: "XXX" });
    expect(adapter).toBeDefined();
    mock.mockReturnValue({ promise: () => ({ Body: '{"title": "HELLO"}' }) });
    const response = await adapter.readJSON({
      path: "/abc",
    });
    expect(response.title).toBe("HELLO");
    expect(mock).toBeCalledTimes(1);
    expect(mock).toBeCalledWith({
      Bucket: "XXX",
      Key: "/abc",
    });
  });

  it("throws on invalid JSON files", async () => {
    const adapter = new S3Adapter({ bucket_name: "XXX" });
    expect(adapter).toBeDefined();
    mock.mockReturnValue({ promise: () => ({ Body: "//\\" }) });
    await expect(
      adapter.readJSON({
        path: "/abc",
      })
    ).rejects.toThrow();
  });
});

const mock = jest.fn();

jest.mock("aws-sdk", () => {
  return {
    S3: jest.fn(() => {
      return {
        putObject: (args: AWS.S3.PutObjectRequest) => mock(args),
        deleteObject: (args: AWS.S3.DeleteObjectRequest) => mock(args),
        getObject: (args: AWS.S3.GetObjectRequest) => mock(args),
      };
    }),
  };
});
