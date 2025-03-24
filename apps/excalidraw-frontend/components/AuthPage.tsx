"use client";

import { Button } from "@repo/ui/button";
import Card from "@repo/ui/card";

export function AuthPage({isSignin}:{
    isSignin: boolean
}) {
    return <div className="w-screen h-screen flex justify-center items-center ">
        <Card headingText="DrawFlow"> 
            <div className="mt-5 px-8 py-5 flex flex-col justify- items-center">
                {!isSignin && <input type="text" placeholder="Name..." />}
                <input className="outline outline-gray-300 rounded py-1 px-2 mb-4 text-lg text-gray font-mono capitalize focus:outline-2" type="text" placeholder="Email..." />
                <input className="outline outline-gray-300 rounded py-1 px-2 mb-4 text-lg text-gray font-mono capitalize focus:outline-2" type="password" placeholder="Password..." />
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