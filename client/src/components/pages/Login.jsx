import React from 'react';
import { assets } from '../../assets/assets';
import { Star } from 'lucide-react';
import { SignIn} from '@clerk/clerk-react'

const Login = () => {
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
        {/* background image section */}
     <img src={assets.bgImage} className='absolute top-0 left-0 -z-1 w-full h-full object-cover' />

     {/*left side : Branding */}
     <div className='flex-1 flex flex-col items-start justify-between p-15 md:p-20 lg:pl-40'>
        <h1 className=' logos font-poppins text-3xl md:text-6xl md:pb-2 font-bold  bg-gradient-to-r from-blue-950 to-indigo-800 bg-clip-text text-transparent m mb-0.5 -ml-0.5'>CodeAid</h1>
        <p className='logoss object-contain font-roboto md:text-3xl text-indigo-900 mb-30'>Your debugging Buddy</p>
        <div>
        <div className='flex items-center gap-3 mb-4 max-md:mt-10'>
            <img src={assets.group_users} className='h-8 md:h-10' />
            <div>
            <div className='flex'>
           { Array(5).fill(0).map((_,i)=>(<Star key={i} className='size-4 md:size-4.5 text-transparent fill-amber-500'/>))}
        </div>
  <p>Used by 50k+ Developers</p>
        </div>
        </div>
        <h1 className='text-3xl md:text-6xl md:pb-2 font-bold bg-gradient-to-r from-indigo-950 to-indigo-800 bg-clip-text text-transparent'>Where Coders Truly Connect</h1>
        <p className='text-xl md:text-3xl text-indigo-900'>Connect with global community on CodeAid.</p>
    </div>
    <span className='md:h-10'></span>
    </div>
    <div>
        {/*Right side: Login From */}
        <div className='flex-1 flex items-center justify-center p-6 sm:p-10'></div>
         <SignIn />
    </div>
    </div>
  );
}

export default Login;
