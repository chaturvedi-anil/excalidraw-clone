import axios from 'axios';
import { BACKEND_URL } from '../../config';
import ChatRoom from '../../components/ChatRoom';

const getRoomId = async (slug: string) => {
    const getIdResponse = await axios.get(`${BACKEND_URL}/room/${slug}`);
    
    return getIdResponse.data.roomId;
}

const page = async ({params}: {params: {slug: string}}) => {

    const slug = (await params).slug;
    const roomId = await getRoomId(slug);

    return <ChatRoom id={roomId} />
}

export default page