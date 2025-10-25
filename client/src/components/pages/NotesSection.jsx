// src/components/NotesSection.jsx

import React, { useState, useEffect } from 'react';

const NotesSection = () => {
    // State for the new note input
    const [noteInput, setNoteInput] = useState(' ');
    // CHANGED: State to hold an array of note objects
    const [notes, setNotes] = useState([]);

    // On the first render, load notes from localStorage
    useEffect(() => {
        // CHANGED: Retrieve the string from localStorage
        const notesFromStorage = localStorage.getItem('userNotes');
        if (notesFromStorage) {
            // CHANGED: Parse the JSON string back into an array
            setNotes(JSON.parse(notesFromStorage));
        }
    }, []);

    // Function to add a new note
    const handleAddNote = () => {
        // Prevent adding empty notes
        if (noteInput.trim() === '') {
            return;
        }

        // Create a new note object with a unique ID and the text
        const newNote = {
            id: Date.now(), // Using timestamp for a simple unique ID
            text: noteInput,
        };

        // CHANGED: Create an updated list of notes
        const updatedNotes = [...notes, newNote];

        // Update the state
        setNotes(updatedNotes);
        // CHANGED: Save the entire array to localStorage after converting it to a JSON string
        localStorage.setItem('userNotes', JSON.stringify(updatedNotes));
        // Clear the input field
        setNoteInput('');
    };

    // Function to delete a note by its ID
    const handleDeleteNote = (idToDelete) => {
        // CHANGED: Filter out the note with the matching ID
        const updatedNotes = notes.filter(note => note.id !== idToDelete);
        
        // Update the state
        setNotes(updatedNotes);
        // CHANGED: Save the updated array back to localStorage
        localStorage.setItem('userNotes', JSON.stringify(updatedNotes));
    };

    return (
        <div className="p-4 bg-gradient-to-b from-blue-50 to-white rounded-lg shadow-md">
            <h2 className="font-bold text-lg mb-2">📚 Debug Diary</h2>
            <div className="flex space-x-2">
                <input
                    type="text"
                    className="bg-white flex-grow p-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Add a new note..."
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    // Optional: Add note on pressing Enter
                    onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                />
                <button
                    onClick={handleAddNote}
                    className="cursor-pointer px-4 py-2 font-semibold rounded-md bg-gradient-to-r from-indigo-500 to-purple-800 hover:from-indigo-700 hover:to-purple-800 active:scale-95 transition text-white"
                >
                    Add
                </button>
            </div>
            
            {/* CHANGED: Display the list of saved notes */}
            <div className="mt-4 space-y-2">
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <div key={note.id} className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                            <p className="text-gray-800 break-words pr-2">{note.text}</p>
                            <button
                                onClick={() => handleDeleteNote(note.id)}
                                className="text-red-500 hover:text-red-700 font-bold text-lg flex-shrink-0"
                                title="Delete note"
                            >
                                &times; 
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-black mt-4">Your Diary is empty. Add one above!</p>
                )}
            </div>
        </div>
    );
};

export default NotesSection;