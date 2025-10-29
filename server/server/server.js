import express from 'express';
import cors from 'cors';
import 'dotenv/config'; 
import axios from 'axios';
import * as cheerio from 'cheerio'; // Correct
import leetcodeApi from 'leetcode-api'; // 1. Import the whole module
const { LeetCode } = leetcodeApi;      // 2. Get the LeetCode class from it
import { GoogleGenerativeAI } from '@google/generative-ai';
import connectDB from './configs/db.js';
import {inngest,functions} from './inngest/index.js'; // Ensure Inngest is initialized
import {serve} from 'inngest/express';
import { clerkMiddleware } from '@clerk/express'
import userRouter from './routes/userRoutes.js';



const app = express();

await connectDB();

// Middleware
app.use(cors()); // Allow requests from your React app
app.use(express.json()); // Allow server to read JSON from requests
app.use(clerkMiddleware())

app.get('/',(req,res)=>res.send('Server is running'))
app.use('/api/inngest', serve({ client: inngest, functions }));
app.use('/api/user',userRouter )

const PORT = process.env.PORT || 4000;

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });


// Define an API endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Send the message to the Gemini model
        const result = await model.generateContent(message);
        const response = result.response;
        const text = response.text();

        // Send the model's response back to the React app
        res.json({ reply: text });

    } catch (error) {
        console.error('Error with Gemini API:', error);
        res.status(500).json({ error: 'Failed to get response from AI' });
    }
});

// --- NEW: LIVE PROFILES ENDPOINT ---
app.post('/api/profiles', async (req, res) => {
    const { leetcode, codechef, codeforces } = req.body;
    const results = {};

    const promises = [];

    // LeetCode Promise
    if (leetcode) {
        promises.push(
            (async () => {
                const lc = new LeetCode();
                const stats = await lc.getSubmissionStats(leetcode);
               // ... inside the async function

results.leetcode = {
    totalSolved: stats.acSubmissionNum.find(s => s.difficulty === 'All')?.count ?? 0,
    easy: stats.acSubmissionNum.find(s => s.difficulty === 'Easy')?.count ?? 0,
    medium: stats.acSubmissionNum.find(s => s.difficulty === 'Medium')?.count ?? 0,
    hard: stats.acSubmissionNum.find(s => s.difficulty === 'Hard')?.count ?? 0,
};
            })().catch(e => {
                console.error("Caught LeetCode Error:", e.message); // <-- ADD THIS LINE
                results.leetcode = { error: 'User not found' };
            })
        );
    }

    // CodeChef Promise
    if (codechef) {
        promises.push(
            (async () => {
                const { data } = await axios.get(`https://www.codechef.com/users/${codechef}`);
                const $ = cheerio.load(data);
                const rating = $('.rating-number').text();
                if (!rating) throw new Error();
                results.codechef = {
                    rating: parseInt(rating),
                    stars: $('.rating-star').text().length || '0',
                    problemsSolved: parseInt($('.problems-solved h5').text().match(/\d+/)[0]),
                };
            })().catch(e => { results.codechef = { error: 'User not found' }; })
        );
    }

    // Codeforces Promise
    if (codeforces) {
        promises.push(
            (async () => {
                const { data } = await axios.get(`https://codeforces.com/api/user.info?handles=${codeforces}`);
                if (data.status !== 'OK') throw new Error();
                const user = data.result[0];
                results.codeforces = {
                    rating: user.rating || 0,
                    rank: user.rank || 'Unrated',
                    maxRating: user.maxRating || 0,
                };
            })().catch(e => { results.codeforces = { error: 'User not found' }; })
        );
    }

    await Promise.all(promises);
    res.json(results);
});


// Helper function to get Codeforces contests
const fetchCodeforcesContests = async () => {
    const { data } = await axios.get('https://codeforces.com/api/contest.list');
    return data.result
        .filter(c => c.phase === 'BEFORE')
        .map(c => ({
            platform: 'Codeforces',
            name: c.name,
            url: `https://codeforces.com/contests/${c.id}`,
            startTime: new Date(c.startTimeSeconds * 1000),
            duration: c.durationSeconds,
        }));
};

// Helper function to get LeetCode contests
const fetchLeetCodeContests = async () => {
    const { data } = await axios.post('https://leetcode.com/graphql', {
        query: `{ upcomingContests { title, startTime, duration, titleSlug } }`
    });
    return data.data.upcomingContests.map(c => ({
        platform: 'LeetCode',
        name: c.title,
        url: `https://leetcode.com/contest/${c.titleSlug}`,
        startTime: new Date(c.startTime * 1000),
        duration: c.duration,
    }));
};

// server/server/server.js

// Helper function to get CodeChef contests by scraping (IMPROVED VERSION)
const fetchCodeChefContests = async () => {
    try {
        const { data } = await axios.get('https://www.codechef.com/contests', {
            // Add a User-Agent header to pretend we are a real browser
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        const $ = cheerio.load(data);
        const contests = [];

        // Target the "Future Contests" table
        $('#future-contests-data').find('tbody > tr').each((i, el) => {
            const columns = $(el).find('td');
            if (columns.length >= 3) {
                const code = $(columns[0]).text().trim();
                const name = $(columns[1]).text().trim();
                const startTimeStr = $(columns[2]).find('span').attr('data-starttime');

                if (code && name && startTimeStr) {
                    contests.push({
                        platform: 'CodeChef',
                        name: name,
                        url: `https://www.codechef.com/${code}`,
                        startTime: new Date(startTimeStr),
                        duration: 0,
                    });
                }
            }
        });
        
        // This log will tell us if the scraper found any contests
        console.log(`[CodeChef Scraper] Found ${contests.length} contests.`);
        return contests;
        
    } catch (error) {
        // This makes the error very visible in your server terminal
        console.error("======================================");
        console.error("🔴 FAILED TO SCRAPE CODECHEF 🔴");
        console.error("Error Message:", error.message);
        console.error("======================================");
        return []; // Return an empty array so the other platforms still work
    }
};

// The main endpoint that combines all contest data
app.get('/api/contests', async (req, res) => {
    try {
        const promises = [
            fetchCodeforcesContests(),
            fetchLeetCodeContests(),
            fetchCodeChefContests()
        ];
        
        const results = await Promise.allSettled(promises);

        const allContests = results
            .filter(r => r.status === 'fulfilled')
            .flatMap(r => r.value);

        // Sort contests by the soonest start time
        allContests.sort((a, b) => a.startTime - b.startTime);

        res.json(allContests);
    } catch (error) {
        console.error('Error fetching contests:', error);
        res.status(500).json({ error: 'Failed to fetch contest data.' });
    }
}); 

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});