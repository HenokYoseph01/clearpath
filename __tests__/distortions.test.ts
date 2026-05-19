import { detectDistortions } from "@/modules/cbt/distortions";

describe("detectDistortions", () => {
  it("returns no matches for empty text", () => {
    expect(detectDistortions("")).toEqual([]);
  });

  it("detects catastrophising language", () => {
    expect(detectDistortions("Everything is ruined").map((item) => item.distortion)).toContain("catastrophising");
  });

  it("detects mind reading language", () => {
    expect(detectDistortions("They think I am strange").map((item) => item.distortion)).toContain("mindReading");
  });
});
