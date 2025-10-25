import logo from './logo.svg'
import sample_cover from './sample_cover.jpg'
import sample_profile from './sample_profile.jpg'
import bgImage from './bgImage.png'
import group_users from './group_users.png'
import  code from './code.png'
import { BrainCog, GitPullRequest, Home, MessageCircle, Search, Sparkle, TrendingUp, UserIcon, Users } from 'lucide-react'
import sponsored_img from './sponsored_img.png'
import ai from './ai.png'

export const assets = {
    logo,
    sample_cover,
    sample_profile,
    bgImage,
    group_users,
    sponsored_img,
    code,
    ai
}

export const menuItemsData = [
    { to: '/', label: 'CodeFlow', Icon: BrainCog },
    { to: '/messages', label: 'Quick sync', Icon: MessageCircle },
    { to: '/connections', label: 'Boost yourself', Icon: Sparkle },
    { to: '/discover', label: 'GitConnect', Icon: GitPullRequest },
    { to: '/profile', label: 'DevFolio', Icon: UserIcon },
];

export const dummyUserData = {
    "_id": "user_2zdFoZib5lNr614LgkONdD8WG32",
    "email": "admin@example.com",
    "full_name": "Ishika Rathore",
    "username": "ishika_rathore",
    "bio": "🌍 Dreamer | 📚 Learner | 🚀 Doer\r\nExploring life one step at a time.\r\n✨ Staying curious. Creating with purpose.",
    "profile_picture": sample_profile,
    "cover_photo": sample_cover,
    "location": "New York, NY",
    "followers": ["user_2", "user_3"],
    "following": ["user_2", "user_3"],
    "connections": ["user_2", "user_3"],
    "posts": [],
    "is_verified": true,
    "createdAt": "2025-09-26T09:14:59.231Z",
    "updatedAt": "2025-07-21T06:56:50.017Z",
}

const dummyUser2Data = {
    ...dummyUserData,
    _id: "user_2",
    username: "jiangly",
    full_name: " jiangly Hendricks",
    profile_picture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
}

const dummyUser3Data = {
    ...dummyUserData,
    _id: "user_3",
    username: "alexa_james",
    full_name: "Alexa james",
    profile_picture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
}

export const dummyStoriesData = [
    {
        "_id": "68833d466e4b42b685068860",
        "user": dummyUserData,
        "content": "",
        "media_url": "https://blog.penjee.com/wp-content/uploads/2015/11/loop-over-python-list-animation.gif",
        "media_type": "image",
        "background_color": "#4f46e5",
        "createdAt": "2025-09-28T08:14:06.958Z",
        "updatedAt": "2025-07-25T08:16:06.958Z",
    },
    {
        "_id": "688340046e4b42b685068a73",
        "user": dummyUserData,
        "content": "",
        "media_url": "https://miro.medium.com/v2/resize:fit:1400/1*187ivsuCI98pJNqbN5vkVA.gif",
        "media_type": "image",
        "background_color": "#4f46e5",
        "createdAt": "2025-07-25T08:27:48.134Z",
        "updatedAt": "2025-07-25T08:27:48.134Z",
    },
    {
        "_id": "68833fe96e4b42b685068a5e",
        "user": dummyUserData,
        "content": "",
        "media_url": "https://media.licdn.com/dms/image/v2/C4D12AQEhJJGuzOFMjw/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1653269809314?e=2147483647&v=beta&t=mHuhuWTovyHwbNYbQ17Ak8kxFbLzJyUVNUO44F-c_9s",
        "media_type": "image",
        "background_color": "#4f46e5",
        "createdAt": "2025-07-25T08:27:21.289Z",
        "updatedAt": "2025-07-25T08:27:21.289Z",
    },
    {
        "_id": "68833e136e4b42b685068937",
        "user": dummyUserData,
        "content": "",
        "media_url": "https://bdyby.in/wp-content/uploads/2024/01/ds3.png",
        "media_type": "image",
        "background_color": "#4f46e5",
        "createdAt": "2025-07-25T08:19:31.080Z",
        "updatedAt": "2025-07-25T08:19:31.080Z",
    },
    {
        "_id": "68833d706e4b42b685068875",
        "user": dummyUserData,
        "content": "If you want to go fast, if you want to get done quickly, if you want your code to be easy to write, make it easy to read.— Robert C. Martin ",
        "media_url": "",
        "media_type": "text",
        "background_color": "#4f46e5",
        "createdAt": "2025-07-25T08:16:48.617Z",
        "updatedAt": "2025-07-25T08:16:48.617Z",
    },
    {
        "_id": "68833c9e6e4b42b6850687e7",
        "user": dummyUserData,
        "content": "For Effective Problem-Solving The function of good software is to make the complex appear to be simple, - Unknown Source.  Tip: Focus on designing solutions that abstract away complexity rather than adding more special cases. First, solve the problem. Then, write the code, - Unknown Source. Tip: Understand the problem thoroughly before you start writing code to avoid costly errors and rework."
      ,
        "media_url": "",
        "media_type": "text",
        "background_color": "#4f46e5",
        "createdAt": "2025-07-25T08:13:18.111Z",
        "updatedAt": "2025-07-25T08:13:18.111Z",
    }
]


export const dummyPostsData = [
    {
        "_id": "68773e977db16954a783839c",
        "user": dummyUserData,
        "content": "Here is a solution #FROGJUMP\r\n\r\n A frog is on the 0th stone and wants to reach the (n−1)th stone.Each stone has a height h[i].From stone i, the frog can jump either to i+1 or i+2.The cost of a jump is the absolute difference between the heights of the stones.Find the minimum total energy required for the frog to reach the last stone. next solution will be on FROGJUMP WITH K DISTANCE.\r\n #STAYTUNED    #DPseries",
        "image_urls": [
            "https://lh4.googleusercontent.com/5CjwRHnZ3v0Frs42uTKPSSetuCmji_d-Fp8VoT_fLsGKYkT156tc91-oZvlDKMy4yHW46h4vRm3PrwwG4ruXRKEaL3HkPfHUDfFhSnJxL41vG1FsVy4lsquk1Xn3cGijjNGYzpuH"
        ],
        "post_type": "text_with_image",
        "likes_count": [],
        "createdAt": "2025-07-16T05:54:31.191Z",
        "updatedAt": "2025-07-16T05:54:31.191Z",
    },
    {
        "_id": "686e6d0407845749500c24cd",
        "user": dummyUserData,
        "content": "Here’s a complete list of the most common coding and CS topics asked in technical interviews (especially for software engineering, internships, and product-based companies like Google, Amazon, Microsoft, etc).\r\n\r\n🧱 1. Arrays & Strings\r\n\r\n🪜 2. Recursion & Backtracking\r\n\r\n🧠 3. Graph Algorithms\r\n\r\n🧭 4. Greedy Algorithms\r\n\r\n🧮 5. Dynamic Programming (DP)\r\n\r\n🔗 6. Trees & Binary Search Trees (BST)\r\n\r\n🎯 7. Hashing & Maps\r\n\r\n⚡ 8. Heaps / Priority Queue\r\n\r\n 🌱✨#Motivation #GrowthMindset #DailyInspiration #StayFocused #LevelUp #PositiveVibes #KeepGoing #SelfImprovement #MindsetMatters #SuccessJourney",
        "image_urls": [],
        "post_type": "text",
        "likes_count": [],
        "createdAt": "2025-07-09T13:22:12.601Z",
        "updatedAt": "2025-07-09T13:22:12.601Z",
    },
    {
        "_id": "686e6b21de877d29cf02e2a7",
        "user": dummyUserData,
        "content": "“Why learn Generative AI?” 👇\r\n\r\n Write code faster ⚙️\r\nGenerate content in seconds 📝\r\nDevelopers use AI for code completion 💻\r\nChatbots 🤖\r\n\r\n💡 Getting Started with Generative AI\r\n\r\nPython basics\r\nMachine Learning fundamentals (Supervised vs Unsupervised)\r\nNeural Networks & Transformers\r\nHands-on with OpenAI API / Hugging Face / LangChain",
        "image_urls": [],
        "post_type": "text",
        "likes_count": [],
        "createdAt": "2025-07-09T13:14:09.144Z",
        "updatedAt": "2025-07-09T13:14:09.144Z",
    },
    {
        "_id": "686e3e47ba0cf0fecba19947",
        "user": dummyUserData,
        "content": "Here is the most commonly asked question in most of the interviews \r\nDetect Cycle in an Undirected Graph (using DFS) \r\n I wanted to share with you guys the most frquent approach of it \r\n #100DaysOfCode  #KeepCoding  ",
        "image_urls": [
            "https://lh5.googleusercontent.com/e1R309lsO-2zRONBu2e9BEgI1wtuU6fScR_V9vrGHvqvkfhVxm2ApOMH0HAuA9SzII4KOKKPP5XMtDUWc2vtezJE1bUhTFxiWj0WwDsFkLC-3NG-qHn2vb0HRB1snDXl0Tdv8H5nDV4xVM19AlprLQ8"
        ],
        "post_type": "image",
        "likes_count": [
            "user_2zdJbcAqiOX9jq2DIueBRQn0lMt"
        ],
        "createdAt": "2025-07-09T10:02:47.213Z",
        "updatedAt": "2025-07-09T10:09:37.075Z",
    },
    {
        "_id": "686e39e86e0585e9e2e58dd3",
        "user": dummyUserData,
        "content": "Starting React.js journey!!\r\n\r\n As a beginner I created How to Animate Your React Apps with Lottie\r\n If you want full code dm me....",
        "image_urls": [
            "https://dev-to-uploads.s3.amazonaws.com/i/yfn5x0sklji6legt1egf.gif"
        ],
        "post_type": "text_with_image",
        "likes_count": [],
        "createdAt": "2025-07-09T09:44:08.626Z",
        "updatedAt": "2025-07-09T09:44:08.626Z",
    },
    {
        "_id": "686e361389841ba9f2633201",
        "user": dummyUserData,
        "content": "Hello, Everyone this is my first Post",
        "image_urls": [],
        "post_type": "text",
        "likes_count": [],
        "createdAt": "2025-07-09T09:27:47.529Z",
        "updatedAt": "2025-07-09T09:27:47.529Z",
    }
]

export const dummyRecentMessagesData = [
    {
        "_id": "68833af618623d2de81b5381",
        "from_user_id": dummyUser2Data,
        "to_user_id": dummyUserData,
        "text": "I seen your profile",
        "message_type": "text",
        "media_url": "",
        "seen": true,
        "createdAt": "2025-07-25T08:06:14.436Z",
        "updatedAt": "2025-07-25T08:47:47.768Z",
    },
    {
        "_id": "6878cc3c17a54e4d3748012f",
        "from_user_id": dummyUserData,
        "to_user_id": dummyUserData,
        "text": "This is a Samsung Tablet",
        "message_type": "text",
        "media_url": "",
        "createdAt": "2025-07-17T10:11:08.437Z",
        "updatedAt": "2025-07-25T08:07:11.893Z",
        "seen": true
    },
    {
        "_id": "686fb66c7f0dcbff63b239e7",
        "from_user_id": dummyUser3Data,
        "to_user_id": dummyUserData,
        "text": "how are you",
        "message_type": "text",
        "media_url": "",
        "createdAt": "2025-07-10T12:47:40.510Z",
        "updatedAt": "2025-07-10T12:47:40.510Z",
        "seen": false
    }
]

export const dummyMessagesData = [
    {
        "_id": "6878cc3217a54e4d37480122",
        "from_user_id": "user_2zwZSCMRXQ9GaEEVLgm6akQo96i",
        "to_user_id": "user_2zdFoZib5lNr614LgkONdD8WG32",
        "text": "",
        "message_type": "image",
        "media_url": "https://images.pexels.com/photos/106341/pexels-photo-106341.jpeg",
        "createdAt": "2025-07-17T10:10:58.524Z",
        "updatedAt": "2025-07-25T10:43:50.346Z",
        "seen": true
    },
    {
        "_id": "6878cc3c17a54e4d3748012f",
        "from_user_id": "user_2zwZSCMRXQ9GaEEVLgm6akQo96i",
        "to_user_id": "user_2zdFoZib5lNr614LgkONdD8WG32",
        "text": "This is a Samsung Tablet",
        "message_type": "text",
        "media_url": "",
        "createdAt": "2025-07-17T10:11:08.437Z",
        "updatedAt": "2025-07-25T10:43:50.346Z",
        "seen": true
    },
    {
        "_id": "68835ffc6e4b42b685069def",
        "from_user_id": "user_2zdFoZib5lNr614LgkONdD8WG32",
        "to_user_id": "user_2zwZSCMRXQ9GaEEVLgm6akQo96i",
        "text": "yah , this tablet is good",
        "message_type": "text",
        "media_url": "",
        "seen": false,
        "createdAt": "2025-07-25T10:44:12.753Z",
        "updatedAt": "2025-07-25T10:44:12.753Z",
    },
        {
        "_id": "6878cc2817a54e4d3748010c",
        "from_user_id": "user_2zdFoZib5lNr614LgkONdD8WG32",
        "to_user_id": "user_2zwZSCMRXQ9GaEEVLgm6akQo96i",
        "text": "you can purchase it from amazon",
        "message_type": "text",
        "media_url": "",
        "createdAt": "2025-08-17T10:10:48.956Z",
        "updatedAt": "2025-08-25T10:43:50.346Z",
        "seen": true
    },
]

export const dummyConnectionsData = [
    dummyUserData,
    dummyUser2Data,
    dummyUser3Data
]

export const dummyFollowersData = [
    dummyUser2Data,
    dummyUser3Data
]

export const dummyFollowingData = [
    dummyUser2Data,
    dummyUser3Data
]

export const dummyPendingConnectionsData = [
    dummyUserData
]