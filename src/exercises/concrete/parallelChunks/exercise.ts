import { chunk } from "lodash";

type Context = {
  postData: (data: string) => Promise<string>;
};

export default ({ postData }: Context) =>
  async (list: Array<string>) => {
    const chunks: string[][] = chunk(list, 5);

    const results: string[] = [];

    for (const chunk of chunks) {
      const chunkResults = await Promise.all(
        chunk.map((data) => postData(data))
      );
      results.push(
        ...(chunkResults.filter((result) => result !== undefined) as string[])
      );
    }

    return results;
  };
