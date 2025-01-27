"use client";

import { useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


const page = () => {
  const nameRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const router = useRouter();

  const handleSignup = async () => { 
    // @ts-ignore
    console.log(nameRef.current?.value, usernameRef.current.value, passwordRef.current.value);
    router.push("/signin");
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