"use client";

import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { useState } from "react";


const AuthPage = ({isSignIn} : {isSignIn:boolean}) => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const onSubmitHandler = () => {
        
    }
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='border border-steel-400 shadow-xl rounded-md px-8 py-4 flex-col justify-center'>
                <h2 className='text-3xl text-center font-bold font-sans mb-8'>
                {isSignIn ? "Sign In" : "Sign Up"}
                </h2>
                <div className="w-full flex flex-col items-center justify-center mb-4">
                    {!isSignIn && 
                        <Input 
                            className="outline outline-gray-300 rounded-md p-2 text-xl block mb-4 capitalize" 
                            type="text" 
                            placeholder="name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                        />
                    }
                    <Input 
                        className="outline outline-gray-300 rounded-md p-2 text-xl block mb-4 capitalize" 
                        type="text" 
                        placeholder="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input 
                        className="outline outline-gray-300 rounded-md p-2 text-xl block mb-4 capitalize" 
                        type="password" 
                        placeholder="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button 
                        variant="primary"
                        onClick={onSubmitHandler}
                    > 
                        {isSignIn ? "Sign In" : "Sign Up"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AuthPage;