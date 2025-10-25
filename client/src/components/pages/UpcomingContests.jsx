// src/components/UpcomingContests.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// --- (You can replace these with actual SVG icons) ---
const platformIcons = {
    Codeforces: 'CF',
    LeetCode: 'LC',
    CodeChef: 'CC',
};

// Helper to format duration from seconds
const formatDuration = (seconds) => {
    if (!seconds) return 'N/A';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
};

// Countdown Timer Component
const Countdown = ({ toDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(toDate) - +new Date();
        if (difference <= 0) return null;

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => setTimeLeft(calculateTimeLeft()), 60000); // Update every minute
        return () => clearTimeout(timer);
    });

    if (!timeLeft) return <span className="text-sm font-semibold text-green-600">Live!</span>;

    return (
        <span className="text-md font-semibold text-blue-800">
            {timeLeft.days > 0 ? `${timeLeft.days}d ${timeLeft.hours}h` : `${timeLeft.hours}h ${timeLeft.minutes}m`}
        </span>
    );
};

const UpcomingContests = () => {
    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(true);

 const getContestColor = (name) => {
        const lowerCaseName = name.toLowerCase();

        if (lowerCaseName.includes('weekly contest')) {
            return 'text-orange-800'; // LeetCode Weekly
        }
        if (lowerCaseName.includes('biweekly contest')) {
            return 'text-orange-800'; // LeetCode Biweekly
        }
        if (lowerCaseName.includes('div. 2')) {
            return 'text-purple-700'; // Codeforces Div. 2
        }
        if (lowerCaseName.includes('div. 3')) {
            return 'text-purple-700'; // Codeforces Div. 3
        }
        if (lowerCaseName.includes('div. 1')) {
            return 'text-purple-700'; 
        }
         if (lowerCaseName.includes('div. 4')) {
            return 'text-purple-700'; 
        }
        return 'text-gray-500';    
    };

    useEffect(() => {
        axios.get('http://localhost:4000/api/contests')
            .then(res => setContests(res.data))
            .catch(err => console.error("Failed to fetch contests", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="p-4 text-center text-gray-500">Loading contests...</div>;

    return (
        <div className="p-4 bg-gradient-to-b from-blue-50 to-blue-20 rounded-lg shadow-md">
            <h2 className="logoss object-contain font-caveat text-5xl font-extrabold text-gray-800 mb-4">Upcoming Contests</h2>
            <div className="space-y-3 max-h-80 overflow-y-auto">
                {contests.map((contest, index) => (
                    <a href={contest.url} key={index} target="_blank" rel="noopener noreferrer" 
                       className="block p-3 bg-white border border-gray-300 shadow-md rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center justify-between mb-1">
                            <p className={`
  font-semibold text-lg
  ${contest.platform === 'LeetCode' ? 'bg-orange-100 text-orange-800' : ''}
  ${contest.platform === 'Codeforces' ? 'bg-blue-100 text-blue-800' : ''}
  px-2 py-0.5 rounded-full inline-block
`}>{contest.platform}</p>
                            <Countdown toDate={contest.startTime} />
                        </div>
                        <p className="text-gray-700 font-small truncate">{contest.name}</p>
                        <div className="text-xs text-gray-500 mt-1 flex justify-between">
                            <span className={getContestColor(contest.name)}>
        {new Date(contest.startTime).toLocaleString()}
    </span>
                             <span className={getContestColor(contest.name)}>{formatDuration(contest.duration)}</span>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default UpcomingContests;