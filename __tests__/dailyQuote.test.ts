import { getQuoteCount, getQuotePeriod, selectQuote } from "@/modules/quotes/dailyQuote";

describe("daily quote selection", () => {
  it("selects the right time-of-day period", () => {
    expect(getQuotePeriod(new Date("2026-05-22T06:00:00"))).toBe("morning");
    expect(getQuotePeriod(new Date("2026-05-22T13:00:00"))).toBe("afternoon");
    expect(getQuotePeriod(new Date("2026-05-22T20:00:00"))).toBe("evening");
    expect(getQuotePeriod(new Date("2026-05-22T02:00:00"))).toBe("quiet");
  });

  it("is stable for a user seed on the same day and period", () => {
    const first = selectQuote("seed-a", new Date("2026-05-22T08:00:00"));
    const second = selectQuote("seed-a", new Date("2026-05-22T09:00:00"));

    expect(second.text).toBe(first.text);
    expect(second.period).toBe(first.period);
  });

  it("has a broad local quote library", () => {
    expect(getQuoteCount()).toBeGreaterThanOrEqual(60);
  });
});
