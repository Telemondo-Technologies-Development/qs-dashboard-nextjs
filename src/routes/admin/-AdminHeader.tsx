import { useUserData } from "@/api/auth";
import UserDropDown from "./-UserDropDown";

export default function AdminHeader() {
  const { data: userData, error } = useUserData();

  return (
    <div className="flex items-center justify-between px-8 pt-6 pb-3">
      <div className="flex text-xl">
        {error ? (
          <p>{error.message}</p>
        ) : userData ? (
          <>
            <p>Good Morning,&nbsp;</p>
            <p className="font-bold">{userData.firstName}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="flex items-center gap-10">
        <img src="/notification.svg" className="size-5" />
        <div className="flex items-center gap-[10px]">
          <img src="/user-icon.svg" className="size-5" />
          <UserDropDown />
        </div>
      </div>
    </div>
  );
}
