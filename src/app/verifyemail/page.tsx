"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  // using useCallback to memoize the function
  const verifyUserEmail = useCallback(async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (err: any) {
      setError(err.response.data.error);
      // console.log(err);
    }
  }, [token]);

  useEffect(() => {
    console.log(window.location.search);
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token, verifyUserEmail]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl mb-4">Verify Email</h1>
      <h2 className="p-2 rounded-md bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>

      {verified && (
        <div>
          <h2 className="text-2xl p-4">Your Email is Verified</h2>
          <Link href="/login">
            <Button className="w-full">
              Login
              <ArrowRight className="ml-2" size={16} />
            </Button>
          </Link>
        </div>
      )}
      {!!error && (
        <div>
          <h2 className="text-2xl px-4 mt-10 py-2 italic rounded-md bg-red-500 text-black">
            Oops! {" " + error + "  "}
            <br />
            something went Wrong or you are already verified
          </h2>
        </div>
      )}
    </div>
  );
}
