import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { dummyRecentMessagesData } from '../assets/assets';
import moment from 'moment';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import api from '../api/axios';


const RecentMessages = () => {
    const [messages, setMessages]=useState([])
    const {getToken} = useAuth()
     const fetchRecentMessages= async ()=> {
          try {
      const token = await getToken()
      const { data } = await api.get('/api/user/recent-messages', {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (data.success) {
         setMessages(Array.isArray(data.messages) ? data.messages : [])
      } else {
        toast.error(data.message)
      }
    } catch (error) {
       console.error(error)
      setMessages([])
    }
     }
 useEffect(()=>{
    fetchRecentMessages()
 },[])
  return (
    <div className='bg-gradient-to-b from-blue-50 to-white max-w-xs mt-4 p-4 min-h-20 rounded-md shadow text-xs text-slate-800'>
        <h3 className='font-bold text-black text-2xl mb-4'>Recent Messages</h3>
        <div className='flex flex-col max-h-56 overflow-y-scroll no-scrollbar'>
              {(!messages || messages.length === 0) && (
          <p className='text-center text-slate-400'>No recent messages</p>
        )}
            {
                messages.map((message)=>(
                    <Link to={`/messages/${message.from_user_id._id}`} key={message._id} className='flex items-start gap-2 py-3 px-3 rounded-md hover:bg-blue-100'>
                        <img src={message.from_user_id.profile_picture} alt="" className='w-8 h-8 rounded-full'/>
                        <div className='w-full'>
                        <div className='flex justify-between'>
                            <p className='font-medium'>{message.from_user_id.full_name}</p>
                            <p className='text-[10px] text-slate-400'>{moment(message.createdAt).fromNow()}</p>
                        </div>
                        <div className='flex justify-between'>
                            <p>{message.text ? message.text:'Media'}</p>
                            {!message.seen && <p className='bg-indigo-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px]'>1</p>}
                        </div>
                        </div>
                    </Link>
                ))
            }
        </div>
      
    </div>
  );
}

export default RecentMessages;
