import { ExerciseContext } from "../../../lib/Exercise.js";
import { skipExercise } from "../../../lib/skipExercise.js";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {};

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const b = async () => {
      await a;
      await createPromise("B");
    };

    const c = async () => {
      await a;
      await createPromise("C");
    };

    const d = async () => {
      await b();
      createPromise("D");
    };

    const e = async () => {
      await c();
      createPromise("E");
    };
    const f = async () => {
      await Promise.all([d, e]);
      createPromise("F");
    };

    await Promise.all([a, b, c, d, e, f]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  async () => {};

export default {
  makeMixedExercise: skipExercise(mixed),
  makeAsyncAwaitExercise: skipExercise(asyncAwait),
  makeThenCatchExercise: skipExercise(thenCatch),
};
