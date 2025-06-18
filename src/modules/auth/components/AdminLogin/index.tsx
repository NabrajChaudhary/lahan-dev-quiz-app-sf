"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/modules/core/components/ui/form";
import { Input } from "@/modules/core/components/ui/input";
import { Button } from "@/modules/core/components/ui/button";

import { useRouter } from "next/navigation";

import { publicAxios } from "@/modules/core/utils/axios";
import { toast } from "sonner";
import { setCookie } from "js-cookie-helper";

const formSchema = z.object({
  email: z.string().optional(),
  password: z.string().optional(),
});

const defaultValues = {
  email: "",
  password: "",
};

const AdminLogin = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      publicAxios
        .post("/auth/admin/login", values)
        .then((data) => {
          toast.success(data.data.message);
          setCookie("auth-token", data.data.user.token);
        })
        .catch((data) => {
          toast.error(data.response.data.message);
        })
        .finally(() => {
          router.push("/dashboard/");
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default AdminLogin;
