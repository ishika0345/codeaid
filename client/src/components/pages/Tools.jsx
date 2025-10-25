import React from 'react';
import { FaPenAlt } from "react-icons/fa";
import { CiText } from "react-icons/ci";
import { FaSlash } from "react-icons/fa";
import { MdOutlineRectangle } from "react-icons/md";
import { IoEllipseOutline } from "react-icons/io5";
import { PiSelection } from "react-icons/pi";
import { GiLaserBurst } from "react-icons/gi";
import { FaEraser } from "react-icons/fa";
import { PiCursorClickFill } from "react-icons/pi";
const Tools = ({currentTool,onClick}) => {
    const tools=[
        {
          name:"pen",
          tool: FaPenAlt,
          type:1
        },
         {
          name:"text",
          tool:CiText,
          type:2
        },
         {
          name:"line",
          tool: FaSlash,
          type:4
        },
         {
          name:"rectangle",
          tool: MdOutlineRectangle,
          type:8
        },
         {
          name:"ellipse",
          tool: IoEllipseOutline,
          type:16
        },
        {
          name:"select",
          tool: PiSelection,
          type:32
        },
        {
          name:"laser",
          tool: GiLaserBurst,
          type:128
        },
        {
          name:"eraser",
          tool: FaEraser,
          type:64
        },
         {
          name:"click",
          tool: PiCursorClickFill,
          type:256
        }


    ]
  return (
    <div className='w-[80px] h-[85vh] bg-white rounded-3xl shadow-xl absolute top-5 left-5 flex flex-col items-center py-6 gap-4 z-[100]'>
      {tools.map((tool,index)=>{
        const isSelected = currentTool === tool.type
        return  <div className={`p-3 rounded-xl cursor-pointer transition-all duration-200 ease-in-out group shadow-xl shadow-gray-300
${isSelected ?"bg-blue-100" :"hover:bg-gray-100"}`}
key={index} onClick={() => onClick(tool)}>
       
            <tool.tool className={`w-4 h-4 transition-colors duration-200
                ${isSelected?"text-blue-600": "text-gray-600 group-hover:text-blue-600"} `}/>
        </div>
})}
    </div>
  );
}

export default Tools;
