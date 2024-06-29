import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserData } from "@/api/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export default function UserDropDown() {
  const { data: userData, error } = useUserData();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogOut = async () => {
    try {
      setIsLoading(true);
      await axios.post(`/api/core/user/logout`);
      queryClient.removeQueries({ queryKey: [`userData`], exact: true });
      setIsLoading(false);
      navigate({ to: "/admin/login" });
    } catch (error) {
      console.log(error);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <p className="text-sm font-bold">
            {error
              ? error.message
              : userData
                ? `${userData.firstName} ${userData.lastName}`
                : "Loading..."}
          </p>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="border-transparent bg-transparent shadow-none relative mr-6 -top-5 z-10">
          <div className="flex justify-end w-full">
            <div className="bg-main_primary size-9 relative top-5 rotate-45 mr-6 rounded-sm z-0"></div>
          </div>

          <div className="bg-main_primary text-white w-full rounded-sm px-3 py-2 relative z-50">
            <DropdownMenuLabel>
              <div className="flex justify-center font-poppins   gap-3">
                <Avatar className="size-9">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm ">
                    {userData?.firstName} {userData?.lastName}
                  </p>
                  <p className="text-xs font-extralight font-poppins">
                    {userData?.email}
                  </p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <button className=" flex justify-start items-center gap-5 py-2 px-3 z-50 text-xs text-white font-extralight font-poppins rounded-sm">
              <img src="/logout.svg" alt="logout" className="size-5" />
              {isLoading ? (
                <div onClick={handleLogOut}>Signing Out</div>
              ) : (
                <div onClick={handleLogOut}>Sign Out</div>
              )}
            </button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
