import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants";
import { useAuthStore } from "@/store";
import { accountService } from "../services/account.service";

export const useGetMyOrders = () =>
  useQuery({
    queryKey: [...QUERY_KEYS.ORDERS, "mine"],
    queryFn: () => accountService.getMyOrders(),
  });

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (payload: { name: string }) => accountService.updateProfile(payload),
    onSuccess: (user) => {
      setUser(user);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUTH });
    },
  });
};
