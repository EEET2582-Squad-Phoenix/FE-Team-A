"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordVisibility } from "@/utils/passwordVisibility";
import { SignUp, SignUpSchema } from "@/schema";
import { userRegister } from "@/actions/register";
import { toast } from "sonner";
import { useUserStore } from "@/store/user-store";
import { useRouter } from "next/navigation";
import { auth } from "@/actions/auth";


export default function DefaultRegisterForm() {
  const { login } = useUserStore();
  const router = useRouter();
  const defaultState: SignUp = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const form = useForm<SignUp>({
    defaultValues: defaultState,
    resolver: zodResolver(SignUpSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: SignUp) => {
    const onRegister = userRegister({
      ...values,
      userRole: "DONOR",
    });
    toast.promise(onRegister, {
      loading: "Creating your account...",
      success: async (res) => {
        await auth(res.data.dto);
        login(res.data.dto);
        router.push("/donor");
        return "Register successfully!";
      },
      error: (e) => {
        switch (e.response.status) {
          case 401:
            return e.response.data.message as string;
          case 404:
            return e.response.data.message as string;
          case 409:
            return e.response.data.message as string;
          default:
            return "Internal Server Error";
        }
      },
    });
  };

  return (
    <div className="flex screen justify-center">
      {/* Right side of the screen, full width on small & medium screens */}
      <div className="justify-center items-center w-full lg:w-auto">
        <h1 className="font-bold text-4xl text-blue whitespace-nowrap py-10">
          Account Creation
        </h1>

        <div className="w-4/5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex gap-4 mb-3">
                <FormField
                  name="firstName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-1 basis-1/3">
                      <FormLabel>First Name</FormLabel>
                      <Input {...field} placeholder="Your full name:" />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Last Name Field */}
              <FormField
                name="lastName"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>Last Name</FormLabel>
                    <Input {...field} placeholder="Enter your last name:" />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Address Field */}
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>Email Address</FormLabel>
                    <Input {...field} placeholder="Enter your email address:" />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>Password</FormLabel>
                    <PasswordVisibility
                      {...field}
                      placeholder="Enter your password:"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password Field */}
              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <PasswordVisibility
                      {...field}
                      placeholder="Confirm your password:"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="w-full mt-4 bg-blue-800 rounded-lg hover:bg-blue-900"
                variant={"default"}
              >
                Sign Up
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}