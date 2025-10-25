// src/components/CodingProfiles.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SpinnerIcon = () => (
    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
);

const CodingProfiles = () => {
    const [usernames, setUsernames] = useState({ leetcode: '', codechef: '', codeforces: '' });
    const [profiles, setProfiles] = useState(null);
    const [loading, setLoading] = useState(false);

    // Load usernames from localStorage on initial render
    useEffect(() => {
        const savedUsernames = JSON.parse(localStorage.getItem('codingUsernames'));
        if (savedUsernames) {
            setUsernames(savedUsernames);
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUsernames(prev => ({ ...prev, [name]: value }));
    };

    const handleFetchProfiles = async () => {
        setLoading(true);
        setProfiles(null);
        localStorage.setItem('codingUsernames', JSON.stringify(usernames));
        
        try {
            const res = await axios.post('http://localhost:4000/api/profiles', usernames);
            setProfiles(res.data);
        } catch (error) {
            console.error("Failed to fetch profiles", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-gradient-to-b from-blue-50 to-white rounded-lg shadow-md mb-8">
            <h2 className=" logoss object-contain font-caveat text-5xl font-extrabold text-gray-800 mb-4">Live Coding Profiles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                <input name="leetcode" value={usernames.leetcode} onChange={handleInputChange} placeholder="LeetCode Username" className="w-full p-2 border rounded-md text-sm"/>
                <input name="codechef" value={usernames.codechef} onChange={handleInputChange} placeholder="CodeChef Username" className="w-full p-2 border rounded-md text-sm"/>
                <input name="codeforces" value={usernames.codeforces} onChange={handleInputChange} placeholder="Codeforces Username" className="w-full p-2 border rounded-md text-sm"/>
            </div>
            <button onClick={handleFetchProfiles} disabled={loading} className="w-full py-2 text-white font-semibold rounded-md flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-700 hover:from-indigo-700 hover:to-purple-900 
            ">
                {loading ? <SpinnerIcon /> : 'Track Profiles'}
            </button>

            {profiles && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* LeetCode Card */}
                    {profiles.leetcode && !profiles.leetcode.error && (
                        <div className="p-3 border rounded-lg">
                            <h3 className="font-bold">LeetCode</h3>
                            <p className="text-sm">Solved: <span className="font-semibold">{profiles.leetcode.totalSolved}</span></p>
                            <p className="text-xs text-gray-500">E: {profiles.leetcode.easy} | M: {profiles.leetcode.medium} | H: {profiles.leetcode.hard}</p>
                        </div>
                    )}
                    {/* CodeChef Card */}
                    {profiles.codechef && !profiles.codechef.error && (
                         <div className="p-3 border rounded-lg">
                            <h3 className="bg-orange-200 text-amber-950 font-bold rounded-full inline-block px-2 py-0.5">CodeChef</h3>
                            <p className="text-sm">Rating: <span className="font-semibold">{profiles.codechef.rating} ({profiles.codechef.stars}★)</span></p>
                            <p className="text-xs text-gray-500">Solved: {profiles.codechef.problemsSolved}</p>
                        </div>
                    )}
                    {/* Codeforces Card */}
                    {profiles.codeforces && !profiles.codeforces.error && (
                        <div className="p-3 border rounded-lg">
                            <h3 className="bg-blue-100 text-blue-800 font-bold rounded-full inline-block px-2 py-0.5">Codeforces</h3>
                            <p className="text-sm">Rating: <span className="font-semibold">{profiles.codeforces.rating}</span></p>
                            <p className="text-xs text-gray-500">Rank: {profiles.codeforces.rank}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CodingProfiles;