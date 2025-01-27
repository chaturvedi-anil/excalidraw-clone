import axios from 'axios';
import React from 'react'
import { BACKEND_URL } from '../../config';

const getRoomId = async (slug: string) => {
    const getIdResponse = await axios.get(`${BACKEND_URL}/room/${slug}`);
    console.log("getIdResponse : ", getIdResponse);
    
    return getIdResponse.data.id;
}

const ChatRoom = async ({params}: {params: {slug: string}}) => {
    console.log("reacher chatroom : ", params.slug);
    
    const slug = params.slug;
    const roomId = await getRoomId(slug);
    console.log("roomId : ", roomId);

    return <div>
        ChatRoom
    </div>
}

export default ChatRoom