"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import Pomodoro from "@/components/pomodoro/Pomodoro";
import Navbar from "@/components/Navbar.";
import AddTask from "@/components/tasklist/AddTask";
import TaskList from "@/components/tasklist/TaskList";

function Page() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    id: "",
    email: "",
    username: "",
  });
  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/user");
      // console.log('response', response.data.userData);
      setUser({
        ...user,
        email: response.data.userData.email,
        username: response.data.userData.username,
        id: response.data.userData._id,
      });
      // console.log('user', user);
      router.push(`/profile/${response.data.userData._id}`);
    } catch (error: any) {
      console.log("get user details failed", error.message);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  // console.log('user', user);

  return (
    <div>
      {/* <div className='flex flex-col gap-10 items-center justify-center '>
     <h1 className='text-center'> profile page</h1>
     <button className='bg-gray-900 w-1/3 text-white rounded-md px-4 py-2 ' onClick={getUserDetails}>Get User Details</button>
     PT</div> */}
    </div>
  );
}

export default Page;
