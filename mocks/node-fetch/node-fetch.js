export default function createFetchMock() {
  return jest.fn().mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve()
  }));
}
