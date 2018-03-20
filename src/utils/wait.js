// @flow

const timeout = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const sleep = async (ms: number, fn: (...any) => void, ...args: any) => {
  await timeout(ms)
  return fn(...args)
}

export { timeout, sleep }
