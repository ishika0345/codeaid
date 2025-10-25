import React from 'react';
import { ZegoSuperBoardManager } from 'zego-superboard-web';
import {ZegoExpressEngine} from 'zego-express-engine-webrtc'
import { useEffect, useState } from 'react';
import Tools from './Tools'
import { SendHorizonal } from 'lucide-react';


const WhiteBoard = ({onClose}) => {

  const appID = 373423457
  const userID = "ishika1"
  const roomID =  "123456"
  const userName = "ishii"
  const [currentTool,setCurrentTool] = useState(null)
  const token = "04AAAAAGj2GQIADF2P4tTQopWTmYa61gCxVPjCTnsCsWtE2Twb5Yzb8vkb8IL4L5jVAKaEaGR8AKapwripIhXD6NcoPTe5rbuZzTEYzymwhNZcjdkwzstE0D6LS8TLEA5E3WD0O0K0zVtk1o3WeKEpcqh3UCHYwABf4nv+c4YjQHRr4Q16JmhBUXwfSaLHL46vi4YW6tmpXiF5QbB5UxZ8YN0Pjnzpknw9pYqGODZczMmv8SU5MSuAl1sReeSNNBBaL5U7R02e6gP8AQ=="
 const server = "wss://webliveroom373423457-api.coolzcloud.com/ws"
const zg = new ZegoExpressEngine(appID, server);
 const zegoSuperBoard = ZegoSuperBoardManager.getInstance();
 const initBoard = async() =>{
  const result = await zegoSuperBoard.init(zg, {
    parentDomID: 'parentDomID', // D of the parent container to be mounted to.
    appID, // The AppID you get.
    userID, // User-defined ID
    token// The Token you get that used for validating the user identity.
});
 
await zg.loginRoom(roomID, token, {userID, userName}, {userUpdate: true});
 setCurrentTool(zegoSuperBoard.getToolType())
 await zegoSuperBoard.createWhiteboardView({
    name: 'Virtual Board', // Whiteboard name
    perPageWidth: 1600, // Width of each whiteboard page
    perPageHeight: 900, // Height of each whiteboard page
    pageCount: 1// Page count of a whiteboard
});
 }
 useEffect(()=>{
  if(zegoSuperBoard){
    initBoard()
  }
 },[zegoSuperBoard])

  const handleClose = () => {
        // Immediately stop any currently speaking utterance
        window.speechSynthesis.cancel();
        // Call the original onClose function passed from the parent component
        onClose();
    };

    const sendMessage = async ()=>{

}

  return (
        <div 
            className="fixed inset-0 bg-black/95 backdrop-blur flex justify-center items-center z-50"
        >
             {/* Close Button */}
             <button 
                    onClick={handleClose} // Use the new handleClose function
                    className="absolute top-3 right-6 text-gray-400 hover:text-gray-100 text-4xl font-bold"
                    aria-label="Close"
                >
                    &times;
                </button>
            {/* Modal Content: Stop click from propagating to the backdrop */}
            <div 
                className="relative p-2 bg-white rounded-lg shadow-xl w-250 h-150  flex flex-col text-center"
                onClick={e => e.stopPropagation()} 
            >
               
               
                <div id="parentDomID" className='w-full h-full'></div>
                <Tools currentTool={currentTool} onClick={(tool)=>{zegoSuperBoard.setToolType(tool.type)
                setCurrentTool(tool.type)}}/>
            </div>
           <button onClick={sendMessage} className='ml-15 mt-135 bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-800 active:sclae-95 cursor-pointer text-white p-2 rounded-full'>
              <SendHorizonal size={40}/>
            </button>
        </div>
    );
}

export default WhiteBoard;
