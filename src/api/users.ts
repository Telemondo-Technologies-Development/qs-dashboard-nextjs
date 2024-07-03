import axios from "axios";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { UserData, Users } from "@/utils/types/user";
import { PasswordInput } from "@/components/ui/password-input";

export function useGetUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data: getUsersResponse } = await axios.get(
        "/api/core/admin/users?status=0,1,2"
      );

      return getUsersResponse.data as Users;
    },
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
}

export function useRemoveUser(
  id: string,
  email: string,
  username: string,
  firstName: string,
  lastName: string,
  roleName: string,
  queryClient: QueryClient
) {
  return useMutation({
    mutationFn: async () => {
      const { data: removeUserResponse } = await axios.put(
        `/api/core/admin/user/${id}`,
        {
          email: email,
          username: username,
          firstName: firstName,
          lastName: lastName,
          status: -1,
          timezone: 0,
          timezoneId: null,
          language: null,
          roleName: roleName,
        }
      );

      return removeUserResponse.data as UserData;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useChangePassword(id: string, newPassword: string) {
  return useMutation({
    mutationFn: async () => {
      const { data: changePasswordResponse } = await axios.put(
        `/api/core/admin/user/${id}/password`,
        {
          password: newPassword,
        }
      );
      return changePasswordResponse.data as UserData;
    },
  });
}

export function useAddUser(
  email: string,
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  roleName: string,
  queryClient: QueryClient
) {
  return useMutation({
    mutationFn: async () => {
      const { data: addUserResponse } = await axios.post(
        `/api/core/admin/user`,
        {
          email: email,
          username: username,
          password: password,
          firstName: firstName,
          lastName: lastName,
          roleName: roleName,
          areaCodes: [],
          timezone: 0,
          timezoneId: null,
          language: null,
          status: 0,
        }
      );

      return addUserResponse.data as UserData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
