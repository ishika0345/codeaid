import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dummyPostsData, dummyUserData } from '../../assets/assets';
import Loading from './Loading';
import UserProfileInfo from '../UserProfileInfo';
import PostCard from '../PostCard';
import { BookMarked, Link } from 'lucide-react';
import moment from 'moment';
import ProfileModal from '../ProfileModal';
import { useAuth } from '@clerk/clerk-react';
import api from '../../api/axios';
import { useSelector } from 'react-redux';

const Profile = () => {

  const currentUser = useSelector((state)=>state.user.value)

  const {getToken} = useAuth()
  const {profileId} = useParams()
  const [user , setUser] = useState(null)
  const[posts, setPosts] = useState([])
  const [activeTab, setActiveTab] = useState('posts','BookMarked')
  const [ showEdit, setShowEdit] = useState(false)

  const fetchUser = async (profileId)=>{
    const token = await getToken()
    try{
      const {data} =await api.post(`/api/user/profiles`,{profileId},{
        headers: {Authorization: `Bearer ${token}`}
      })
      if(data.success){
        setUser(data.profile)
        setPosts(data.posts)
      }
      else{
        toast.error(data.message)
      }
    }
    catch(error){
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    if(profileId){
      fetchUser(profileId)
    }
    else{
         fetchUser(currentUser._id)
    }
  }, [profileId,currentUser])

  return user ? (
    <div className='relative h-full overflow-y-scroll bg-gray-50 p-6'>
      <div className='max-w-3xl mx-auto'>
        {/*Profile Card*/}
        <div className='bg-white rounded-2xl shadow overflow-hidden'>
          {/*Cover Photo*/}
          <div className='h-40 md:h-56 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200'>
            {user.cover_photo && <img src={user.cover_photo} className='w-full h-full object-cover' />}
          </div>
          {/*User Info*/}
          <UserProfileInfo user={user} posts={posts} profileId={profileId} setShowEdit={setShowEdit} />
        </div>
        {/*Tabs*/}
        <div className='mt-6'>
          <div className='bg-white rounded-xl shadow p-1 flex max-w-md mx-auto'>
            {["posts","BookMarked"].map((tab)=>(
              <button onClick={() => setActiveTab(tab)} key={tab} className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${activeTab === tab ? "bg-indigo-600 text-white":"text-gray-600 hover:text-gray-900" } `}>
                {tab.charAt(0).toUpperCase()+tab.slice(1)}
              </button>
            ))}
          </div>
          {/*posts*/}
          {activeTab === 'posts' && (
            <div className='mt-6 flex flex-col items-center gap-6'>
              {posts.map((post)=> <PostCard key={post._id} post={post} /> )}
            </div>
          )}
          {/*BookMarked*/}
{activeTab === "BookMarked" && (
  <div className="mt-6 flex flex-col items-center gap-6">
    {BookMarked.length > 0 ? (
      BookMarked.map(post => (
        <PostCard key={post._id} post={post} />
      ))
    ) : (
      <p className="text-gray-500 text-sm">No bookmarked posts yet</p>
    )}
  </div>
)}


        </div>
      </div>
      {/*Edit Profile Modal*/}
      {showEdit && <ProfileModal setShowEdit={setShowEdit} />}
    </div>
  ):(<Loading/>)
}

export default Profile;
