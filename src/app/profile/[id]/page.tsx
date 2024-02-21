import Navbar from "@/components/Navbar.";
import React from "react";

function Page({ params }: { params: { id: string } }) {
  return (
    <div className=" justify-center grid h-screen items-center">
      <Navbar />
      <h1>Your Id : {params.id}</h1>
    </div>
  );
}

export default Page;
