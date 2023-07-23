"use client";

import axios from "axios";
import { ArrowRight } from "lucide-react";
import { set } from "mongoose";
import Link from "next/link";
import React, { useEffect, useState } from "react";


export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', {token})
            setVerified(true);
            setError(false);
        } catch (err:any) {
            setError(true);
            // console.log(err);
            
        }

    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);


    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token,verifyUserEmail]);

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1 className="text-4xl mb-4">Verify Email</h1>
            <h2 className="p-2 rounded-md bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div>
                    <h2 className="text-2xl p-4">Your Email is Verified</h2>
                    <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                    <Link href="/login">
                      <span>  Login here </span>
                 <ArrowRight className="ml-2" size={16} />
                    </Link>
                </button>
                </div>
            )}
            {!!error && (
                <div>
                    <h2 className="text-2xl px-4 mt-10 py-2 italic rounded-md bg-red-500 text-black">Oops! something went Wrong 
                    <br />
                     or you are already verified</h2>
                    
                </div>
            )}
        </div>
    )

}