"use client";
import React from "react";
import { ArrowRight, LoaderIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ILogin, LoginSchema } from "@/schema/Login";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

function Login() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const form = useForm<ILogin>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: ILogin) {
    try {
      setLoading(true);
      const response: AxiosResponse = await axios.post(
        "/api/users/login",
        values
      );
      router.replace("/");
      setLoading(false);
    } catch (error: any) {
      toast.error(error.response.data.error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-[calc(100svh)] flex justify-center">
      <div className="flex items-center  justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex  justify-center">
            <Logo />
          </div>
          <h2 className="text-center text-2xl font-bold mb-4 leading-tight ">
            Sign in to your account
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                disabled={loading}
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@gmail.com"
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                disabled={loading}
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel htmlFor="" className="text-base font-medium ">
                        Password
                      </FormLabel>
                      <Link
                        href="/forgot-password"
                        title=""
                        className="text-sm font-semibold  hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={loading} type="submit" className="w-full">
                {loading && <LoaderIcon className="animate-spin w-5 mr-4" />}
                Login
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </form>
          </Form>

          <p className="mt-4 text-center  text-sm text-gray-600 dark:text-gray-200 ">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              title=""
              className="font-semibold  transition-all duration-200 hover:underline"
            >
              Create a free account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
