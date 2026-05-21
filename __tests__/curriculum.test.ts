import { curriculum, foundationTrainingDays, getExerciseForDay } from "@/modules/cbt/curriculum";

describe("curriculum", () => {
  it("defines a 14-practice foundation in order", () => {
    expect(foundationTrainingDays).toBe(14);
    expect(curriculum).toHaveLength(14);
    expect(curriculum.map((exercise) => exercise.day)).toEqual(Array.from({ length: 14 }, (_, index) => index + 1));
  });

  it("clamps exercise lookup to the foundation range", () => {
    expect(getExerciseForDay(0).day).toBe(1);
    expect(getExerciseForDay(99).day).toBe(14);
  });
});
