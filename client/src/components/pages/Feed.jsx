import React, { useEffect, useState } from 'react'
import { assets, dummyPostsData } from '../../assets/assets'
import Loading from './Loading'
import StoriesBar from '../StoriesBar'
import PostCard from '../PostCard'
import NotesSection from './NotesSection'
import AiVoiceAssistant from './AiVoiceAssistant'
import RecentMessages from '../RecentMessages'
import { useAuth } from '@clerk/clerk-react'
import api from '../../api/axios'
import toast from 'react-hot-toast'

const Feed = () => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const[feeds, setfeeds] = useState([])
  const[loading,setLoading] = useState(true)
  const {getToken} = useAuth()

  const fetchFeeds =async () => {
     try{
         setLoading(true)
         const{data}= await api.get('/api/post/feed',{
          headers: { Authorization:`Bearer ${await getToken()}`}
         })
         if(data.success){
          setfeeds(data.posts)
         }
         else{
          toast.error(data.message)
         }
     }
     catch(error){
             toast.error(error.message)
     }
     setLoading(false)
  }
  
  useEffect(()=>{
    fetchFeeds()
  }, [])

   useEffect(() => {}, []);
    
    const closeAssistant = () => setIsAssistantOpen(false)

  return !loading ? (
    <div className='h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8'>
      {/*stories and post  list*/}
      <div>
       <StoriesBar/>
       <div className='p-4 space-y-6'>
       {feeds.map((post)=>(
        <PostCard key={post._id} post={post}/>
       ))}
       </div>
      </div>
      {/*Right Sidebar */}
      <div className='max-xl:hidden h-full overflow-y-scroll no-scrollbar sticky top-0'>
    <div className='max-w-xs bg-gradient-to-b from-white to-blue-50 text-xs p-4 rounded-md inline-flex flex-col gap-2 shadow mb-5'>
     <NotesSection/>
            </div>
                {/* --- 2. ADD A BUTTON TO OPEN THE ASSISTANT --- */}
                <div className="p-4 bg-gradient-to-b from-blue-20 to-blue-100 rounded-lg shadow-md text-center mb-5">
                  <div className='flex justify-center items-center '>
                    <img src={assets.ai} alt="" className='rounded-full w-30 h-36 mb-3' />
                    </div>
          
                    <button
                        onClick={() => setIsAssistantOpen(true)}
                        className="cursor-pointer w-full px-4 py-2 font-semibold rounded-md bg-gradient-to-r from-indigo-500 to-purple-800 hover:from-indigo-700 hover:to-purple-800 active:scale-95 transition text-white cursor-pointer'"
                    >
                        Ask Your Assistant
                    </button>
                </div>
                {/* Recent Messages*/}
                <div >
                  <RecentMessages/>
                  </div>
                    {/* ... your messages component or code ... */}
               </div>
            {/* --- 3. CONDITIONALLY RENDER THE MODAL --- */}
            {isAssistantOpen && <AiVoiceAssistant onClose={closeAssistant} />}
        </div>
    
  ): <Loading/>
}

export default Feed