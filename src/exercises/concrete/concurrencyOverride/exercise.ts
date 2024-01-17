type Context = {
  fetchFirstData: (input: string) => Promise<string>;
  fetchSecondData: (input: string) => Promise<string>;
  setData: (data: string) => void;
};

export default ({ fetchFirstData, fetchSecondData, setData }: Context) => {
  let lastRunId: symbol | undefined = undefined;
  return async (input: string) => {
    const runId = Symbol();

    lastRunId = runId;

    const firstData = await fetchFirstData(input);

    if (lastRunId !== runId) {
      return;
    }

    const secondData = await fetchSecondData(firstData);

    if (lastRunId !== runId) {
      return;
    }

    setData(secondData);
  };
};
