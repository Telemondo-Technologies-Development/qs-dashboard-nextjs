import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useCounterMngmtStore } from "@/stores/admin/counterMgmt";

import { Minus } from "lucide-react";
import { ComboboxDemo } from "./-DropDown";
import { Input } from "@/components/ui/input";
import { CounterType } from "@/utils/types/counterType";

type CounterCardProps = {
  userName: string;
  email: string;
  counterType: CounterType;
  isAvailable: boolean;
  counterName: string;
};

export default function CounterCards({
  isAvailable,
  counterName,
  userName,
  email,
  counterType,
}: CounterCardProps) {
  const editing = useCounterMngmtStore((state) => state.editing);
  // const counterContent = (counter.content.at(2))
  // const toggleEditing = useCounterMngmtStore((state) => state.toggleEditing);
  // const saveChanges = useCounterMngmtStore((state) => state.saveChanges);
  // const toggleSaveChanges = useCounterMngmtStore(
  //   (state) => state.toggleSaveChanges
  // );

  return (
    <div>
      <Card className="flex flex-col  justify-between h-72 w-[full]  bg-blue-100 rounded-xl py-5">
        <div>
          <CardHeader className="flex flex-col items-center justify-center py-0">
            {!editing ? (
              <div className="font-bold text-main_primary lg:text-xl text-center">
                {counterName}
              </div>
            ) : (
              <div className="font-bold text-main_primary lg:text-xl">
                <Input
                  placeholder={counterName}
                  className="justify-center items-center text-center rounded-full text-base border border-main_primary"
                />
              </div>
            )}
            <div className="flex justify-center">
              {isAvailable ? (
                <div className="flex items-center justify-center gap-1 font-light text-green-500 bg-green-100 rounded-full  lg:px-3 lg:h-4">
                  <div className="lg:size-1 xl:size-1.5 bg-green-500 rounded-full" />
                  <p className="text-xs font-normal">Unoccupied</p>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-1 font-light text-red-500 bg-red-100 rounded-full  lg:px-3 lg:h-4">
                  <div className="size-1.5 bg-red-500 rounded-full" />
                  <p className="text-xs font-normal">Occupied</p>
                </div>
              )}
            </div>
          </CardHeader>
        </div>
        <CardContent className="flex flex-col justify-center py-0 lg:text-xs xl:text-sm text-main_primary">
          <div className="flex flex-col justify-center flex-1 font-normal">
            <p>{userName}</p>

            <p>{email}</p>
          </div>
        </CardContent>
        <div>
          <CardFooter className="flex flex-col justify-center gap-5 py-0">
            <div className="flex flex-col justify-center w-full px-3 mx-4 mt-2 bg-white text-main_primary rounded-xl h-14 lg:text-xs xl:text-sm ">
              <div className="flex flex-row items-center justify-between text-right">
                <p>Managed</p>
                {!editing ? (
                  <p>{counterType.name}</p>
                ) : (
                  <ComboboxDemo counterType={counterType} />
                )}
              </div>
            </div>
            <button className="w-auto px-4 text-white rounded-sm h-7 bg-main_primary lg:text-xs xl:text-sm">
              <div className="flex flex-row items-center gap-3">
                <Minus size={20} strokeWidth={4} />
                <p>Remove Counter</p>
              </div>
            </button>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
