import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// A simple microphone icon SVG component
const MicrophoneIcon = ({ listening }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
         className={`h-8 w-8 transition-colors ${listening ? 'text-red-500' : 'text-white'}`}>
        <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
        <path d="M6 15a1.5 1.5 0 00-1.5 1.5v.093c0 4.25 3.42 7.657 7.658 7.657s7.658-3.407 7.658-7.657V16.5A1.5 1.5 0 0018 15h-1.5a.75.75 0 010-1.5H18a3 3 0 013 3v.093A9.158 9.158 0 0112.842 24h-.001a9.158 9.158 0 01-9.158-9.157V18a3 3 0 013-3h1.5a.75.75 0 010 1.5H6z" />
    </svg>
);

const AiVoiceAssistant = ({ onClose }) => {
    const [isListening, setIsListening] = useState(false);
    const [userTranscript, setUserTranscript] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [statusMessage, setStatusMessage] = useState('Click the mic to start');
    
    // useRef to hold the speech recognition instance across renders
    const recognitionRef = useRef(null);

    // This effect sets up the Web Speech API on component mount
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setStatusMessage("Sorry, your browser doesn't support speech recognition.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false; // Stop listening after a pause
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        recognition.onstart = () => {
            setIsListening(true);
            setStatusMessage('Listening...');
            setUserTranscript('');
            setAiResponse('');
        };

        recognition.onend = () => {
            setIsListening(false);
            setStatusMessage('Click the mic to start');
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error", event.error);
            setStatusMessage(`Error: ${event.error}`);
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setUserTranscript(transcript);
            getAndSpeakResponse(transcript); // Call our async function to get a real answer
        };
        
        recognitionRef.current = recognition;

    }, []); // Empty dependency array ensures this runs only once

    // Function to call backend, get AI response, and speak it
    const getAndSpeakResponse = async (text) => {
        setStatusMessage('Thinking...');
        
        try {
            // Make a POST request to our backend server
            const res = await axios.post('http://localhost:4000/api/chat', {
                message: text,
            });

            const responseText = res.data.reply;
            setAiResponse(responseText);

            // Use the Speech Synthesis API to speak the response
            const utterance = new SpeechSynthesisUtterance(responseText);
            window.speechSynthesis.speak(utterance);
            setStatusMessage('Click the mic to start');

        } catch (error) {
            console.error("Error fetching AI response:", error);
            const errorMessage = "Sorry, I had trouble connecting to my brain. Please try again.";
            setAiResponse(errorMessage);
            const utterance = new SpeechSynthesisUtterance(errorMessage);
            window.speechSynthesis.speak(utterance);
            setStatusMessage('Connection error');
        }
    };

    // Toggles the microphone on and off
    const handleToggleListening = () => {
        if (!recognitionRef.current) return;

        if (isListening) {
            recognitionRef.current.stop();
        } else {
            try {
                // Stop any previous speech before starting to listen
                window.speechSynthesis.cancel();
                recognitionRef.current.start();
            } catch (error) {
                console.error("Could not start recognition:", error);
                setStatusMessage("Couldn't start listening. Try again.");
            }
        }
    };

    // Function to stop the speech and then close the modal
    const handleClose = () => {
        // Immediately stop any currently speaking utterance
        window.speechSynthesis.cancel();
        // Call the original onClose function passed from the parent component
        onClose();
    };

    return (
        // Modal Backdrop: Covers the whole screen
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur flex justify-center items-center z-50"
            onClick={handleClose} // Use the new handleClose function
        >
            {/* Modal Content: Stop click from propagating to the backdrop */}
            <div 
                className="relative p-6 bg-white rounded-lg shadow-xl w-full max-w-md flex flex-col text-center"
                onClick={e => e.stopPropagation()} 
            >
                {/* Close Button */}
                <button 
                    onClick={handleClose} // Use the new handleClose function
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
                    aria-label="Close"
                >
                    &times;
                </button>

                <h2 className={`font-bold text-xl mb-4 ${isListening ? 'text-3xl text-purple-800 animate-pulse':'text-xl text-black'}`}>AI Voice Assistant</h2>
                
                <div className="flex-grow flex flex-col items-center justify-center space-y-4">
                    <button
                        onClick={handleToggleListening}
                        className={`rounded-full p-6 transition-all duration-300 ${isListening ? 'bg-blue-600 animate-pulse' : 'bg-blue-500 hover:bg-blue-600'}`}
                    >
                        <MicrophoneIcon listening={isListening} />
                    </button>
                    <p className="text-gray-600 h-5">{statusMessage}</p>
                </div>
                
                {/* Display area for conversation */}
                <div className="mt-4 text-left space-y-2 h-24 overflow-y-auto p-2 bg-gray-50 rounded">
                    {userTranscript && (
                        <p className="text-gray-800"><b className="text-blue-600">You said:</b> {userTranscript}</p>
                    )}
                    {aiResponse && (
                        <p className="text-gray-800"><b className="text-green-600">AI said:</b> {aiResponse}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AiVoiceAssistant;