import { UserData } from "@/utils/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { IconLoader2 } from "@tabler/icons-react";
import { login } from "@/api/auth";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { PasswordInput } from "@/components/ui/password-input";
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export default function Login() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const queryClient = useQueryClient();
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const response = await login(values);
      if (response.status === 200) {
        const userData = response.data.data as UserData;
        queryClient.setQueryData<UserData>(["userData"], userData);
        form.reset();
        navigate({ to: "/admin/dashboard" });
      } else {
        const errorMessage = response.data.errors[0].message || "Login failed";
        form.setError("username", {
          type: "manual",
          message: "",
        });
        form.setError("password", {
          type: "manual",
          message: errorMessage,
        });
      }
    } catch (error) {
      form.setError("username", {
        type: "manual",
        message: "Unexpected error occurred. Please try again.",
      });
      form.setError("password", {
        type: "manual",
        message: "Unexpected error occurred. Please try again.",
      });
    }
  }

  return (
    <div className="flex flex-col bg-main_white rounded-lg place-items-center gap-10 px-[120px] pt-[50px] pb-[100px] font-poppins">
      <img src="/kiosk-logo.png" alt="kbqs logo" className="size-[10rem]" />
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-center">ADMIN PANEL</h1>
        <p className="text-center">Login to access your admin account</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col place-items-center gap-12 w-[100%]"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field, fieldState }) => (
              <FormItem className="w-[130%] h-[30px]">
                <FormControl>
                  <Input
                    placeholder="username"
                    {...field}
                    type="text"
                    className={`${
                      fieldState.error
                        ? "border-red-500 placeholder-red-500"
                        : ""
                    }`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem className="w-[130%] h-[30px]">
                <FormControl>
                  <PasswordInput
                    placeholder="password"
                    {...field}
                    className={`${
                      fieldState.error
                        ? "border-red-500 placeholder-red-500"
                        : ""
                    }`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="flex items-center justify-center w-[50%] py-2 bg-main_primary hover:bg-main_primary/90 text-main_white rounded-md "
          >
            {form.formState.isSubmitting ? (
              <IconLoader2 className="animate-spin" size={24} />
            ) : (
              "Login"
            )}
          </button>
        </form>
      </Form>
    </div>
  );
}
