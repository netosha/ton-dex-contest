const delay = async (timeMs: number) =>
  // eslint-disable-next-line no-promise-executor-return
  new Promise((r) => setTimeout(r, timeMs));

export default delay;
