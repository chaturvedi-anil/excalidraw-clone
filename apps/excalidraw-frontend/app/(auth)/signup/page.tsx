"use client";

import { useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "../../config";
import { CreateUserSchema } from "@repo/common/types";

const page = () => {
  const nameRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const router = useRouter();

  const handleSignup = async () => { 
    try {
      // @ts-ignore 
      const name = nameRef.current?.value;
      //@ts-ignore 
      const username = usernameRef.current?.value;
      //@ts-ignore
      const password = passwordRef.current?.value;

      const parshedData = CreateUserSchema.safeParse({name, username, password});

      if (!parshedData.success) {
        alert(`error : ${parshedData.error.message}`);
        return;
      }
      
      const signinResponse = await axios.post(`${BACKEND_URL}/signup`, {username, password});   
      if (signinResponse.status === 201) {
        router.push("/signin");
      }  
    } catch (error) {
      if(axios.isAxiosError(error) && error.response?.status === 401){
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("An unexpected error occurred.");
      }
    }
  }
  return (
    <div>
      <div>
        <h1>signup</h1>
        <input type="text" ref={nameRef} placeholder="Enter name"/>
        <input type="text" ref={usernameRef} placeholder="Enter username"/>
        <input type="password" ref={passwordRef} placeholder="Enter password"/>
        <button type="button" onClick={handleSignup}>
          signup
        </button>
      </div>
    </div>
  )
}

export default page