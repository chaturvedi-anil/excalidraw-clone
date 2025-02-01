"use client";

import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";


const AuthPage = () => {
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='border border-steel-400 rounded-md px-8 py-4 flex-col justify-center'>
                <h2 className='text-3xl text-center font-bold font-sans mb-8'>Sign In</h2>
                <div className="w-full flex flex-col items-center justify-center">
                    <Input 
                        className="outline outline-gray-300 rounded-md p-2 text-xl block mb-4 capitalize" 
                        type="text" 
                        placeholder="username" 
                        value="" 
                    />
                    <Input 
                        className="outline outline-gray-300 rounded-md p-2 text-xl block mb-4 capitalize" 
                        type="password" 
                        placeholder="password" 
                        value="" 
                    />

                    <Button className="bg-black text-white rounded-md px-5 py-2 w-full text-xl mt-4"> Submit</Button>
                </div>
            </div>
        </div>
    )
}

export default AuthPage;