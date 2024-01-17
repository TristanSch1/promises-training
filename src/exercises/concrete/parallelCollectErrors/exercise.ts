import { chunk } from "lodash";

type Context = {
  postData: (data: string) => Promise<string>;
};

export default ({ postData }: Context) =>
  async (list: Array<string>) => {
    const chunks: string[][] = chunk(list, 5);

    const result: { successes: string[]; errors: unknown[] } = {
      successes: [],
      errors: [],
    };

    for (const chunk of chunks) {
      await Promise.all(
        chunk.map((data) =>
          postData(data)
            .then((res) => result.successes.push(res))
            .catch((e) => result.errors.push(e))
        )
      );
    }

    return result;
  };
