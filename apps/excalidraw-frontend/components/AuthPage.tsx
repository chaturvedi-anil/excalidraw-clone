"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { HTTP_URL } from "@/app/config";
import { Button } from "@repo/ui/button";
import Card from "@repo/ui/card";
import { SigninSchema, SignupSchema } from "@repo/common/types";

export function AuthPage({isSignin}:{
    isSignin: boolean
}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const requestUrl = `${HTTP_URL}/${isSignin ? "signin" : "signup"}`; 
    
    const checkInput = (): object | null => {
        let parsedData;
        if (isSignin) {
            parsedData =  SigninSchema.safeParse({email, password});
        } else {
            parsedData = SignupSchema.safeParse({name, email, password});
        }

        if (!parsedData.success) {
            alert(`client error  : ${parsedData.error.message}`);
            return null;
        }

        return parsedData.data;
    } 

    const handleSubmit = async () => {
        try {
            const data = await checkInput();
            console.log("data : ", data);

            if (!data) return;
            
            const response = await axios.post(requestUrl, data);
            alert(response.data?.message);                

            if (isSignin) {
                router.replace("http://localhost:3000");
            } else {
                router.push("/signup");
            }
            
        } catch (error) {
            alert("Something went wrong!");
        }
    };
    return <div className="w-screen h-screen flex justify-center items-center ">
        <Card headingText="DrawFlowTest">
            <div className="mt-5 px-8 py-5 flex flex-col justify-between items-center">
                {!isSignin && 
                    <input className="outline outline-gray-300 rounded py-1 px-2 mb-4 text-lg text-gray font-mono capitalize focus:outline-2" type="text" placeholder="Enter Name..." value={name} onChange={(e) => setName(e.target.value)} />  
                }
                <input className="outline outline-gray-300 rounded py-1 px-2 mb-4 text-lg text-gray font-mono capitalize focus:outline-2" type="text" placeholder="Enter Email..." value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="outline outline-gray-300 rounded py-1 px-2 mb-4 text-lg text-gray font-mono capitalize focus:outline-2" type="password" placeholder="Enter Password..." value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button 
                    variant="primary"
                    size="md"
                    onClick={handleSubmit}
                >
                    {isSignin ? "Sign In" : "SignUp"}
                </Button>
            </div>
        </Card>
    </div>
}