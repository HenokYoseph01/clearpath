import { distortionDefinitions } from "@/constants/distortions";

describe("distortion learning content", () => {
  it("has deeper learning support for every thinking pattern", () => {
    Object.values(distortionDefinitions).forEach((definition) => {
      expect(definition.deeper.length).toBeGreaterThan(40);
      expect(definition.signs).toHaveLength(3);
      expect(definition.questions).toHaveLength(3);
      expect(definition.tryThis).toHaveLength(3);
      expect(definition.balancedStarter.length).toBeGreaterThan(20);
    });
  });
});
