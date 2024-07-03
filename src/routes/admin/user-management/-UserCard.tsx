import { UserData } from "@/utils/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserManagementStore } from "@/stores/admin/userMgmt";

type UserCardProps = {
  user: UserData;
};

export default function UserCard({ user }: UserCardProps) {
  const { setUserActionType, toggleUserActionDialog, setEditDetails } =
    useUserManagementStore();

  return (
    <div className="flex flex-col justify-between w-full p-4 rounded-xl h-72 bg-main_extra">
      <section className="flex gap-3">
        <Avatar className="size-10">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="text-white bg-gray-500">
            {user.firstName.split("")[0]}
          </AvatarFallback>
        </Avatar>
        {/* <div className="grid text-white bg-gray-500 rounded-full size-10 place-items-center">
          {user.firstName.split("")[0]}
        </div> */}
        <div className="flex flex-col justify-between flex-1">
          <p className="font-bold">
            {user.firstName} {user.lastName}
          </p>
          <div className="flex items-center gap-1 px-3 bg-green-100 rounded-full w-min">
            <div className="bg-green-600 rounded-full size-1"></div>
            <p className="text-green-500 text-2xs">Online</p>
          </div>
        </div>
      </section>
      <section className="text-sm">
        <p>
          {user.authorities[0].authority === "ROLE_ADMIN" ? "Admin" : "Staff"}
        </p>
        <p>{user.email}</p>
      </section>
      <section className="w-full px-3 py-4 text-sm bg-white rounded-xl">
        <div className="flex justify-between">
          <p>Joined</p>
          <p>5 years ago</p>
        </div>
      </section>
      <button
        onClick={() => {
          setUserActionType("edit");
          setEditDetails(user);
          toggleUserActionDialog();
        }}
        className="self-center px-8 py-2 text-sm text-white rounded-md bg-main_primary"
      >
        Edit
      </button>
    </div>
  );
}
