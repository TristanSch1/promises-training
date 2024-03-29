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
      await a;
      await createPromise("D");
    };

    const e = async () => {
      await Promise.all([b, c]);
      await createPromise("E");
    };

    await Promise.all([a, b, c, d, e]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    createPromise("A").then(() => {
      Promise.all([
        Promise.all([createPromise("B"), createPromise("C")]).then(() =>
          createPromise("E")
        ),
        createPromise("D"),
      ]);
    });
  };

export default {
  makeMixedExercise: skipExercise(mixed),
  makeAsyncAwaitExercise: skipExercise(asyncAwait),
  makeThenCatchExercise: skipExercise(thenCatch),
};
