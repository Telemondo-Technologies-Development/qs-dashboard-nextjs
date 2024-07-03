import { Counters } from "@/utils/types/counter";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useCounters() {
    return useQuery<Counters>({
      queryKey: ["counter"],
      queryFn: async () => {
        console.log("fetching counters");
        const { data: counter } = await axios.get(`/api/domain/counter`);
        return counter.data as Counters;
      },
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
    });
  }