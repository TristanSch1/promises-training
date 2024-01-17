import { ExerciseContext } from "../../../lib/Exercise.js";
import { skipExercise } from "../../../lib/skipExercise.js";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const firstSet = [
      createPromise("A"),
      createPromise("B"),
      createPromise("C"),
    ];
    const secondSet = [
      createPromise("D"),
      createPromise("E"),
      createPromise("F"),
    ];
    await Promise.all(firstSet);
    await Promise.all(secondSet);
  };

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    await Promise.all([
      createPromise("A"),
      createPromise("B"),
      createPromise("C"),
    ]);
    await Promise.all([
      createPromise("D"),
      createPromise("E"),
      createPromise("F"),
    ]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    Promise.all([
      createPromise("A"),
      createPromise("B"),
      createPromise("C"),
    ]).then(() => {
      Promise.all([createPromise("D"), createPromise("E"), createPromise("F")]);
    });
  };

export default {
  makeMixedExercise: skipExercise(mixed),
  makeAsyncAwaitExercise: skipExercise(asyncAwait),
  makeThenCatchExercise: skipExercise(thenCatch),
};
