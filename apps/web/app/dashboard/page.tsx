"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Dashboard = () => {
  const [slug, setSlug] = useState("");
  const router = useRouter();
  const handleRoomJoin = () => {
    router.push(`/room/${slug.trim()}`);
  }
  return (
    <div>
      <div>
        <h1>Join Chat Room</h1>
        <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder='Enter Room Name' />
        <button type='button' onClick={handleRoomJoin}>join room</button>
      </div>
    </div>
  )
}

export default Dashboard