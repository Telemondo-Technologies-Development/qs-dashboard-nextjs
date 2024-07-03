import axios from "axios";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { CounterType, CounterTypes } from "@/utils/types/counterType";

export function useGetCounterTypes() {
  return useQuery({
    queryKey: ["counterTypes"],
    queryFn: async () => {
      const { data: getCounterTypesResponse } = await axios.get(
        "/api/domain/counter/type?status=0,1,2"
      );
      return getCounterTypesResponse.data as CounterTypes;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });
}

export function useRemoveCounterType(id:string, name: string, abbrev: string, queryClient: QueryClient) {
  return useMutation({
    mutationFn: async () => {
      const {data: removeCounterTypeResponse} = await axios.put(`/api/domain/counter/type/${id}`, {
        name: name,
        abbrev: abbrev,
        status: -1
      })

      return removeCounterTypeResponse.data as CounterType
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['counterTypes']})
    }
  })
}


export function useAddCounterType(name: string, abbrev: string, queryClient: QueryClient) {
  return useMutation({
    mutationFn: async () => {
      const {data: addCounterTypeResponse} = await axios.post(`/api/domain/counter/type`, {
        name: name,
        abbrev: abbrev,
        status: 0
      })
      return addCounterTypeResponse.data as CounterType
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['counterTypes']})
    }
  })
}

