// @flow

const timeout = (ms: number): Promise<mixed> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const sleep = async (ms: number, fn: (...any) => any, ...args: any): any => {
  await timeout(ms)
  return fn(...args)
}

export { timeout, sleep }
