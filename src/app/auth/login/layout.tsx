"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { PasswordVisibility } from "@/utils/passwordVisibility";
import { Label } from "@/components/ui/label";
import { SignIn, signInSchema } from "@/schema";
import { useRouter } from "next/navigation";
import { auth, login } from "@/actions/auth";
import { toast } from "sonner";
import { useUserStore } from "@/store/user-store";
import { clientSessionToken } from "@/utils/axiosClient";
import { UserRole } from "@/types/role";

export default function Page() {
  const router = useRouter();

  const { setCurrentUser } = useUserStore();
  const defaultState: SignIn = {
    email: "",
    password: "",
  };

  const form = useForm<SignIn>({
    defaultValues: defaultState,
    resolver: zodResolver(signInSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: SignIn) => {
    const userLogin = login({
      email: values.email,
      password: values.password,
    });

    toast.promise(userLogin, {
      loading: "Authenticating user...",
      success: async (data) => {
        setCurrentUser(data);
        clientSessionToken.value = data.accessToken;
        await auth(data);
        if (data.userRole === UserRole.ROLE_DONOR) {
          router.push("/donor");
        // } else if (data.userRole === UserRole.ROLE_ADMIN) {
        //   router.push("/sprayer/assign-orders");
        } else if (data.userRole === UserRole.ROLE_ORGANIZATION) {
          router.push("/organization");
        }
        return `Login successfully!`;
      },
      error: (e) => {
        switch (e.response.status) {
          case 401:
            return e.response.data.message as string;
          case 404:
            return e.response.data.message as string;
          default:
            return "Internal Server Error";
        }
      },
    });
  };

  return (
    <div className="flex screen justify-center">
      <div className=" justify-center items-center w-full lg:w-auto">
        <h1 className="font-bold text-4xl text-blue-800 whitespace-nowrap py-10">
          Sign In
        </h1>

        <div className="w-4/5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>E-mail</FormLabel>
                    <Input {...field} placeholder="Enter your email:" />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <PasswordVisibility
                      {...field}
                      placeholder="Enter your password:"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember-me"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded-sm"
                  />
                  <Label htmlFor="remember-me">Remember me</Label>
                </div>

                {/* Forgot Password Link */}
                <div className="text-blue-500 underline text-sm hover:text-blue-800">
                  <Link href={""}>Forgot Password?</Link>
                </div>
              </div>

              <Button
                className="w-full mt-10 bg-blue-800 rounded-md hover:bg-blue-900"
                variant={"default"}
              >
                Sign In
              </Button>
            </form>
          </Form>
        </div>

        <div className="pt-5">
          <span className="font-light text-sm"> Don't have an account?</span>
          <Link href={`/auth/signup/`}>
            <span className="text-blue-500 underline text-sm pl-1 hover:text-blue-800">
              Create now
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
