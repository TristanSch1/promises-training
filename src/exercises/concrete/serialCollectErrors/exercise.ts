type Context = {
  postData: (data: string) => Promise<string>;
};

export default ({ postData }: Context) =>
  async (list: Array<string>) => {
    const results: { successes: string[]; errors: unknown[] } = {
      successes: [],
      errors: [],
    };

    for (const data of list) {
      try {
        results.successes.push(await postData(data));
      } catch (error) {
        results.errors.push(error);
      }
    }

    return results;
  };
