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

const formSchema = z.object({
  counterTypeName: z.string().min(1, {
    message: "Category name cannnot be empty.",
  }),
  abbrev: z
    .string()
    .min(1, {
      message: "Ticket Prefix cannot be empty.",
    })
    .max(3, { message: "3 characters max." }),
});

export default function CounterTypeActionDialog() {
  const {
    openCounterTypeActionDialog,
    toggleCounterTypeActionDialog,
    counterTypeActionType,
    editName,
    editAbbrev,
  } = useKioskManagementStore();

  // console.log(editName);
  console.log(counterTypeActionType);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      counterTypeName: editName ? editName : "",
      abbrev: editAbbrev ? editAbbrev : "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    //check countertypeaction type and do stuff based on that
  }

  return (
    <AlertDialog
      open={openCounterTypeActionDialog}
      onOpenChange={() => toggleCounterTypeActionDialog()}
    >
      <AlertDialogContent className="max-w-2xl overflow-hidden sm:rounded-xl font-poppins">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col"
          >
            <section className="flex flex-1 gap-8 px-10 py-8">
              <div className="w-[55%] max-h-full border border-main_primary rounded-xl"></div>
              <div className="flex flex-col w-[45%] h-full">
                <p className="text-lg font-semibold">Category Info</p>
                <div className="flex-1 py-4 space-y-3">
                  <FormField
                    control={form.control}
                    name="counterTypeName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category Name</FormLabel>
                        <FormControl>
                          <Input
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
                <div className="pt-2 space-y-2 border-t border-main_primary">
                  <p className="text-lg font-semibold">Remove Category</p>
                  <p className="text-xs">Permanently remove the category</p>
                  <button className="flex items-center justify-center w-full gap-3 py-2 font-semibold rounded-md text-main_primary bg-main_secondary">
                    <div className="w-3 h-[4px] rounded-full bg-main_primary"></div>
                    <p>Remove Category</p>
                  </button>
                </div>
              </div>
            </section>
            <section className="flex items-center justify-center gap-8 py-4 bg-gray-300">
              <button
                type="button"
                onClick={() => toggleCounterTypeActionDialog()}
                className="w-1/4 py-2 text-sm font-medium rounded-md text-main_primary bg-main_secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/4 py-2 text-sm font-medium text-white rounded-md bg-main_primary"
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
