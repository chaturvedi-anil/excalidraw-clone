"use client";

import { useRouter } from "next/navigation";
import { useState, } from "react";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();
  return (
    <div className="min-h-screen flex  items-start justify-center">
      <div className="border rounded-md mt-16">
        <h1 className="text-2xl font-bold mt-2 px-6 py-3">
          Join Room To Start Chat
        </h1>
        <hr />
        <div className="flex flex-col justify-between items-center gap-3 pt-8 pb-2">
          <input 
            className="outline px-4 py-2 text-lg rounded-md"
            type="text" 
            placeholder="Enter Room Name..." 
            value={roomId}
            onChange={(e) => {setRoomId(e.target.value)}} 
          />
          <button className="px-4 py-2 rounded-md bg-black text-gray-100 cursor-pointer hover:text-white " onClick={() => {router.push(`/room/${roomId}`)}}>
            Join room
          </button>
        </div>
      </div>
    </div>
  );
}
