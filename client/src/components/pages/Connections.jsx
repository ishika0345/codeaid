// src/pages/Connections.jsx

import React from 'react';
import UpcomingContests from './UpcomingContests';
import CodingProfiles from './CodingProfiles';



const Connections = () => {
  return (
    
    <div className='h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8'>
    <div className='max-xl:hidden h-full overflow-y-scroll no-scrollbar sticky top-0'>
    <div className="p-4 sm:p-6 lg:p-8 ">
      <div className="max-w-4xl mx-auto">

         {/* 2. Add the CodingProfiles component here */}
         <CodingProfiles/>

        {/* 2. Add the UpcomingContests component here */}
        <UpcomingContests />
        
      </div>
       </div>
    </div>
   
    </div>
  );
};

export default Connections;