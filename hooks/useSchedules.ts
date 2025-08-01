import { useCallback, useEffect, useState } from "react";

export interface SchedulePur {
  _id: string;
  cc_id: string;
  description: string;
  project_id: string;
  pm_id: string;
  date: string;
  status: "WIP" | "Waiting" | "Close";
  comments?: string;
}

export const useSchedules = () => {
  const [schedules, setSchedules] = useState<SchedulePur[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSchedules = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_SCHEDULES}`);
      const data = await res.json();
      setSchedules(data.schedules || []);
    } catch (err: any) {
      setError("Error al obtener cronogramas");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  return {
    schedules,
    loading,
    error,
    refetch: fetchSchedules,
  };
};
