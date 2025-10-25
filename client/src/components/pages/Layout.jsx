
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { dummyUserData } from '../../assets/assets'
import Loading from './Loading'
import Sidebar from '../Sidebar'
import { Menu, X } from 'lucide-react'

const Layout = () => {
   
  const user = dummyUserData
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return user ? (
    <div className='w-full flex h-screen'>
       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
       <div className='flex-1 bg-slate-50'>
        <Outlet/>
        </div>
        {
          sidebarOpen ? 
          <X className='absolute top-3 right-3 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-700 sm:hidden' onClick={()=> setSidebarOpen(false)}/>
          :
         <Menu className='absolute top-3 right-3 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-700 sm:hidden' onClick={()=> setSidebarOpen(true)}/>
}
    </div>
  ) : (
   <Loading />
  )
}

export default Layout