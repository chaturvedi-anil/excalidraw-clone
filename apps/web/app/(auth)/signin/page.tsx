"use client";

import { useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SigninSchema } from "@repo/common/types"; 
import { BACKEND_URL } from "../../config";

const page = () => {
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const router = useRouter();

  const handleSignIn = async () => { 
    try {
      //@ts-ignore
      const username = usernameRef.current?.value;
      //@ts-ignore
      const password = passwordRef.current?.value;

      const parshedData = SigninSchema.safeParse({username, password});

      if (!parshedData.success) {
        alert(`error : ${parshedData.error.message}`);
        return;
      }
      
      const signinResponse = await axios.post(`${BACKEND_URL}/signin`, {username, password});   
      if (signinResponse.data.token) {
        router.push("/dashboard");
      }  
    } catch (error) {
      if(axios.isAxiosError(error) && error.response?.status === 401){
        console.error("Unauthorized: Invalid credentials");
        alert(`Error: ${error.response.data.message}`);
      } else {
        console.error("Sign-in error:", error);
        alert("An unexpected error occurred.");
      }
    }
  }
  return (
    <div>
      <div>
        <h1>signIn</h1>
        <input type="text" ref={usernameRef} placeholder="Enter username"/>
        <input type="password" ref={passwordRef} placeholder="Enter password"/>
        <button type="button" onClick={handleSignIn}>
          signIn
        </button>
      </div>
    </div>
  )
}

export default page