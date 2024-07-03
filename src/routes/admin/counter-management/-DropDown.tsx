import { Check, ChevronsUpDown } from "lucide-react";
// import { countertypes } from "@/utils/types/admin_types";

import { isEmpty, isEqual } from "radash";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { countertypes } from "@/utils/variables/admin_variables";
import { useState } from "react";
import { useFetchCounterTypes } from "@/api/counterType";
import { CounterType } from "@/utils/types/counterType";
import LoadingScreen from "./components/-LoadingScreen";
import ErrorScreen from "./components/-ErrorScreen";

type ComboboxDemoProps = {
  counterType: CounterType;
};

export function ComboboxDemo({ counterType }: ComboboxDemoProps) {
  const [open, setOpen] = useState(false);
  const [counterTypeName, setCounterTypeName] = useState<string>(
    counterType.name
  );
  const [counterTypeId, setCounterTypeId] = useState(counterType.id);
  const { data: countertypes, isLoading, error } = useFetchCounterTypes();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-28 justify-between "
        >
          <p className=" overflow-hidden truncate text-xs">{counterTypeName}</p>
          <ChevronsUpDown className="ml-2 size-3 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search counter..." />
          {isEmpty(countertypes?.content) && (
            <CommandEmpty>No counter found.</CommandEmpty>
          )}
          <CommandGroup>
            <CommandList>
              {isLoading
                ? LoadingScreen()
                : error
                  ? ErrorScreen()
                  : countertypes?.content.map((counter) => (
                      <CommandItem
                        key={counter.id}
                        value={counter.name}
                        onSelect={(currentValue) => {
                          console.log(currentValue);
                          setCounterTypeName(
                            currentValue === counterTypeName ? "" : currentValue
                          );

                          setCounterTypeId(
                            counter.id === counterTypeId ? "" : counter.id
                          );

                          console.log(counterTypeId);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            counterTypeName === counter.name
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {counter.name}
                      </CommandItem>
                    ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
