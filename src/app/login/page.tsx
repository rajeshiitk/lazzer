"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

function Login() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    console.log(user);
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user); // {email, password}
      console.log("response", response); // {token, user}
      if (response.status === 200) {
        router.replace("/");
      }
      setLoading(false);
    } catch (error: any) {
      console.log("login failed", error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex  justify-center">
            <Logo />
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight ">
            Sign in to your account
          </h2>

          <form action="#" method="POST" className="mt-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="text-base font-medium">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    placeholder="Email"
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base font-medium ">
                    {" "}
                    Password{" "}
                  </label>
                  <a
                    href="#"
                    title=""
                    className="text-sm font-semibold  hover:underline"
                  >
                    {" "}
                    Forgot password?{" "}
                  </a>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    placeholder="Password"
                  ></input>
                </div>
              </div>
              <div>
                <Button
                  type="button"
                  onClick={onLogin}
                  className="inline-flex w-full items-center justify-center rounded-md  px-3.5 py-2.5 font-semibold leading-7 
                  "
                >
                  {buttonDisabled ? "NO login" : "Login"}{" "}
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </div>
            </div>
          </form>
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
