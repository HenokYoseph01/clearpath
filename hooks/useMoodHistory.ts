import { useEffect, useState } from "react";
import { listDailyCheckIns, DailyCheckInRecord } from "@/modules/db/queries";
import { getMoodTrend } from "@/modules/insights/analytics";

export function useMoodHistory() {
  const [checkIns, setCheckIns] = useState<DailyCheckInRecord[]>([]);

  useEffect(() => {
    setCheckIns(listDailyCheckIns(30));
  }, []);

  return {
    checkIns,
    trend: getMoodTrend(checkIns),
  };
}
