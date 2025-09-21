// Global in-memory storage for all endpoints
export let mockCarts: any = {
  evin123: {
    userId: "evin123",
    items: [],
    totalAmount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
};
