📌 CodeAid

A full-stack social networking platform built with the MERN (MongoDB, Express, React, Node.js) stack — featuring real-time messaging (SSE), stories, posts, user profiles, follow & connection systems, and image/media uploads via ImageKit CDN.

🛠 Features
⭐ Core Functionality

🔑 Authentication (JWT-based)

🧑‍🤝‍🧑 User Profiles

📬 Real-Time Messaging using Server-Sent Events (SSE)

📸 Stories with auto-delete after 24 hours (scheduled with Inngest)

🖼 Posts with multiple image uploads

❤️ Post Like / Unlike

👥 Follow / Unfollow Users

🤝 Connection Requests (LinkedIn-style)

🔍 Discover Users search

📩 Background connection request handling using Inngest (for jobs/events)

☁️ Image & Media Uploads using ImageKit

📁 Repository Structure
codeaid/
├── client/                  # React front-end
├── server/
│   └── server/             # Node/Express back-end
├── .gitignore
├── package-lock.json
└── README.md

🚀 Getting Started
💡 Requirements

✔ Node.js (v16+)
✔ MongoDB (Atlas or local)
✔ ImageKit account (for image uploads)

🧠 Technical Highlights
📡 Real-Time Messaging

Uses Server-Sent Events (SSE) to push new chat messages instantly to connected clients on the backend.
Connections are stored in memory and cleaned up on disconnect.

📷 Image & Media Uploads

All uploads (profile picture, cover photo, story media, post media) go through ImageKit, which:

Stores media on CDN

Delivers optimized URLs with transformations

⏱ Stories (24h Feature)

Stories are saved in the database and scheduled for deletion after 24 hours using Inngest — an event/cron job runner.
