"use client";

import { useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const page = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const router = useRouter();

  const handleSignIn = async () => { 
    // @ts-ignore
    console.log(usernameRef.current.value, passwordRef.current.value);
    router.push("/dashboard");
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