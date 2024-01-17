type Context = {
  postData: (data: string) => Promise<string>;
};

export default ({ postData }: Context) =>
  async (list: Array<string>) => {
    const results: string[] = [];
    for (const data of list) {
      try {
        results.push(await postData(data));
      } catch (error) {
        // ignore
      }
    }

    return results;
  };
