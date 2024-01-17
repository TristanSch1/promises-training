type Context = {
  postData: (data: string) => Promise<string>;
  wait: (ms: number) => Promise<void>;
};

export default ({ postData, wait }: Context) =>
  async (data: string) => {
    let waitTime = 200;

    while (true) {
      try {
        return await postData(data);
      } catch (error) {
        await wait(waitTime);
        waitTime *= 2;
      }
    }
  };
