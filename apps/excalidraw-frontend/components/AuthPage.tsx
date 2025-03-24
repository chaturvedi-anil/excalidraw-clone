"use client";

import { Button } from "@repo/ui/button";
import Card from "@repo/ui/card";

export function AuthPage({isSignin}:{
    isSignin: boolean
}) {

    const handleSubmit = () => {};
    return <div className="w-screen h-screen flex justify-center items-center ">
        <Card headingText="DrawFlowTest">
            <div className="mt-5 px-8 py-5 flex flex-col justify-between items-center">
                {!isSignin && 
                    <input className="outline outline-gray-300 rounded py-1 px-2 mb-4 text-lg text-gray font-mono capitalize focus:outline-2" type="text" placeholder="Enter Name..." />  
                }
                <input className="outline outline-gray-300 rounded py-1 px-2 mb-4 text-lg text-gray font-mono capitalize focus:outline-2" type="text" placeholder="Enter Email..." />
                <input className="outline outline-gray-300 rounded py-1 px-2 mb-4 text-lg text-gray font-mono capitalize focus:outline-2" type="password" placeholder="Enter Password..." />
                <Button 
                    variant="primary"
                    size="md"
                    onClick={() => alert("button clicked")}>
                    {isSignin ? "Sign In" : "SignUp"}
                </Button>
            </div>
        </Card>
    </div>
}