import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { CounterTypes } from "@/utils/types/counterType";

export function useFetchCounterTypes() {
  return useQuery({
    queryKey: ["counterTypes"],
    queryFn: async () => {
      const { data: counterTypes } = await axios.get(
        "/api/domain/counter/type?status=0,1,2"
      );
      return counterTypes.data as CounterTypes;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });
}
