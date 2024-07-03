import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { useKioskManagementStore } from "@/stores/admin/kioskMgmt";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAddCounterType, useRemoveCounterType } from "@/api/counterType";
import { useQueryClient } from "@tanstack/react-query";
import { IconLoader2 } from "@tabler/icons-react";

const formSchema = z.object({
  counterTypeName: z
    .string()
    .transform((value) => value.replace(/\s+/g, ""))
    .pipe(z.string().min(1, { message: "Category Name cannot be empty." })),

  abbrev: z
    .string()
    .transform((value) => value.replace(/\s+/g, ""))
    .pipe(z.string().min(1, { message: "Ticket Prefix cannot be empty." })),
});

export default function CounterTypeActionDialog() {
  const {
    openCounterTypeActionDialog,
    toggleCounterTypeActionDialog,
    editName,
    editAbbrev,
    editId,
    counterTypeActionType,
  } = useKioskManagementStore();

  const queryClient = useQueryClient();

  console.log(editName, editAbbrev);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      counterTypeName: editName ? editName : "",
      abbrev: editAbbrev ? editAbbrev : "",
    },
  });

  const {
    mutateAsync: removeCounterType,
    isPending: isRemoveCounterTypePending,
    error,
  } = useRemoveCounterType(editId, editName, editAbbrev, queryClient);

  const { mutateAsync: addCounterType, isPending: isAddCounterTypePending } =
    useAddCounterType(
      form.getValues().counterTypeName,
      form.getValues().abbrev,
      queryClient
    );

  async function onSubmit() {
    if (counterTypeActionType === "edit") {
      toggleCounterTypeActionDialog();
    } else {
      await addCounterType();
      if (!error) {
        form.reset();
        toggleCounterTypeActionDialog();
      }
    }
  }

  return (
    <AlertDialog
      open={openCounterTypeActionDialog}
      onOpenChange={() => toggleCounterTypeActionDialog()}
    >
      <AlertDialogContent
        className={`max-w-2xl sm:min-h-[450px] overflow-hidden sm:rounded-xl font-poppins`}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col"
          >
            <section className="flex flex-1 gap-8 px-10 py-8">
              <div className="w-[55%] max-h-full border border-main_primary rounded-xl"></div>
              <div className="flex flex-col w-[45%] h-full">
                <div className="flex flex-col justify-center flex-1 py-4 space-y-3">
                  <p className="text-lg font-semibold">Category Info</p>
                  <FormField
                    control={form.control}
                    name="counterTypeName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category Name</FormLabel>
                        <FormControl>
                          <Input
                            maxLength={30}
                            className="rounded-full focus-visible:ring-main_primary ring-offset-main_primary focus-visible:ring-offset-0 focus-visible:ring-1 ring-offset-1 border-main_primary"
                            placeholder="Enter name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="abbrev"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ticket Prefix</FormLabel>
                        <FormControl>
                          <Input
                            maxLength={3}
                            className="rounded-full focus-visible:ring-main_primary ring-offset-main_primary focus-visible:ring-offset-0 focus-visible:ring-1 ring-offset-1 border-main_primary"
                            placeholder="Enter prefix"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {counterTypeActionType === "edit" && (
                  <div className="pt-2 space-y-2 border-t border-main_primary">
                    <p className="text-lg font-semibold">Remove Category</p>
                    <p className="text-xs">Permanently remove the category</p>
                    <button
                      type="button"
                      disabled={isRemoveCounterTypePending}
                      onClick={async () => {
                        console.log("STARTING REMOVAL");
                        await removeCounterType();
                        console.log("REMOVAL DONE");
                        toggleCounterTypeActionDialog();
                      }}
                      className="flex items-center justify-center w-full gap-3 py-2 font-semibold rounded-md disabled:bg-slate-400 text-main_primary bg-main_secondary"
                    >
                      {isRemoveCounterTypePending ? (
                        <IconLoader2 className="animate-spin" size={24} />
                      ) : (
                        <>
                          <div className="w-3 h-[4px] rounded-full bg-main_primary"></div>
                          <p>Remove Category</p>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </section>
            <section className="flex items-center justify-center gap-8 py-4 bg-gray-300">
              <button
                disabled={isRemoveCounterTypePending || isAddCounterTypePending}
                type="button"
                onClick={() => {
                  form.reset();
                  toggleCounterTypeActionDialog();
                }}
                className="w-1/4 py-2 font-semibold rounded-md disabled:bg-slate-400 text-main_primary bg-main_secondary"
              >
                Cancel
              </button>
              <button
                disabled={isRemoveCounterTypePending || isAddCounterTypePending}
                type="submit"
                className="w-1/4 py-2 font-semibold text-white rounded-md disabled:bg-slate-400 bg-main_primary"
              >
                Confirm
              </button>
            </section>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
