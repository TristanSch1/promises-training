type Context = {
  postData: (data: string) => Promise<void>;
};

export default ({ postData }: Context) => {
  let lastTask = Promise.resolve();

  return async (data: string) => {
    const run = async () => {
      await postData(data);
    };

    const task = lastTask.then(run);

    lastTask = task;

    await task;
  };
};
