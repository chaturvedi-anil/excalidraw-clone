"use client";

import { Button } from "@repo/ui/button";

export function AuthPage({isSignin}:{
    isSignin: boolean
}) {
    return <div className="w-screen h-screen flex justify-center items-center ">
        <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white rounded flex flex-col justify-between items-center">
            <div className="shadow-[0_1px_0px_rgb(0,0,0,0.2)] w-full flex justify-center p-4">
                <h1 className=" text-3xl bold font-mono">
                    {isSignin ? "Sign In" : "SignUp"}
                </h1>
            </div>
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
        </div>
    </div>
}