const handler: ProxyHandler<Record<string, string>> = {
  get(_target, prop) {
    return typeof prop === "string" ? prop : undefined;
  },
};

const proxy = new Proxy({}, handler);
export default proxy;
