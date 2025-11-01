import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MenuItems from './MenuItems';
import { CirclePlus, LogOut } from 'lucide-react';
import {UserButton,useClerk} from '@clerk/clerk-react'
import { dummyUserData } from '../assets/assets';
import { useSelector } from 'react-redux';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {

      const navigate = useNavigate()
      const user = useSelector((state)=>state.user.value)
      const {signOut} = useClerk()

  return (
    <div className={`w-60 xl:w-72 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-0 bottom-0 z-20 ${
      sidebarOpen ? 'translate-x-0' : 'max-sm:-translate-x-full'
    } transition-all duration-300 ease-in-out`}>
        <div className='w-full'>
            <h3 onClick={()=> navigate('/')} className=' logos font-poppins text-xl md:text-xl md:pb-2 font-bold  bg-gradient-to-r from-blue-950 to-indigo-800 bg-clip-text text-transparent w-26 ml-7 my-2 cursor-pointer'>CodeAid</h3>
            <hr  className='border-gray-300 mb-8'/>
            <MenuItems setSidebarOpen={setSidebarOpen} />
             <Link to='/create-post' className='flex items-center justify-center gap-2 py-2.5 mt-6 mx-6 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-800 hover:from-indigo-700 hover:to-purple-800 active:scale-95 transition text-white cursor-pointer'>
              <CirclePlus className='w-5 h-5'/>
              CreateGist
             </Link>
        </div>
        <div className='w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between'>
            <div className='flex gap-2 items-center cursor-pointer'>
                <UserButton/>
                <div>
                    <h1 className='text-sm font-medium'>{user.full_name}</h1>
                    <p className='text-xs text-gray-500'>@{user.username}</p>
                </div>
        </div>
        <LogOut onClick={signOut} className='w-4.5 text-gray-400 hover:text-gray-800 transition cursor-pointer'/>
    </div>
    </div>
  );
}

export default Sidebar;
