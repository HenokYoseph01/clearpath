import { useEffect } from "react";
import { initializeDatabase } from "@/modules/db/queries";

export function useDatabase(): void {
  useEffect(() => {
    initializeDatabase();
  }, []);
}
