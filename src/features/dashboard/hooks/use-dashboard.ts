import { useQuery } from "@tanstack/react-query";
import { STALE_TIME } from "@/constants";
import { dashboardService } from "../services/dashboard.service";

export const useGetDashboardSummary = () =>
  useQuery({
    queryKey: ["dashboard", "summary"],
    queryFn: () => dashboardService.getSummary(),
    staleTime: STALE_TIME.DEFAULT,
  });
