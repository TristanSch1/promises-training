type Context = {
  getData: (data: string) => Promise<string>;
};

export default ({ getData }: Context) =>
  async (data: string) => {
    const maxRetries = 3;

    let retries = 0;

    const errors: Error[] = [];

    try {
      await getData(data);
    } catch (error) {
      if (retries === maxRetries) {
        throw errors;
      }
      retries++;
      errors.push(error as Error);
    }
  };
