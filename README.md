# 🤖 AIGenie

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
![Build](https://img.shields.io/github/actions/workflow/status/Uday-Shakya/AIGenie/ci.yml?branch=main)
![Coverage](https://img.shields.io/codecov/c/github/Uday-Shakya/AIGenie)
![Tech Stack](https://img.shields.io/badge/Stack-PERN-blueviolet)

AIGenie is an **AI-powered SaaS platform** built with the **PERN stack (PostgreSQL, Express, React, Node.js)**.  
It allows users to generate AI-driven content, manage assets, and access premium features with secure authentication and subscriptions.

🌐 **Live Demo:** [ai-genie-nu.vercel.app](https://ai-genie-nu.vercel.app)  

---

## ✨ Features

- ⚡ AI content generation (Gemini API, Clipdrop, OpenAI alternatives)  
- 🔐 Authentication & Authorization with **Clerk**  
- 💳 Subscription & Payment support With **Clerk**
- 🖼 Image handling & storage with **Cloudinary**  
- 🗄 Neon-hosted PostgreSQL database  
- 🎨 Modern responsive UI with **React + TailwindCSS**  
- 🚀 CI/CD ready (GitHub Actions + Codecov)  

---

## 🛠 Tech Stack

**Frontend:** React.js, TailwindCSS  
**Backend:** Node.js, Express.js  
**Database:** PostgreSQL (Neon)  
**Auth:** Clerk  
**AI APIs:** Gemini, Clipdrop  
**Media:** Cloudinary  
**Deployment:** Docker, Render/Vercel  

---

## 📂 Project Structure

```
AIGenie/
├── client/             # React frontend
├── server/             # Express backend
├── .env.example        # Environment variable template
└── README.md
```

---

## 🔧 Configuration & Environment Variables

Create a `.env` file inside the **server/** directory with the following variables:

```env
# Database (Neon Postgres)
DATABASE_URL="Your Neon Database URL"

# Clerk Authentication
CLERK_PUBLISHABLE_KEY="Your Publishable Key"
CLERK_SECRET_KEY="Your Secret Key"

# AI Integrations
GEMINI_API_KEY="Your API Key"
CLIPDROP_API_KEY="Your API Key"

# Cloudinary (Media Storage)
CLOUDINARY_CLOUD_NAME="Your Cloudinary Cloud Name"
CLOUDINARY_API_KEY="Your API Key"
CLOUDINARY_API_SECRET="Your API Secret Key"
```

---

## 📦 Install Dependencies

1. Clone the repository:
   ```bash
   git clone https://github.com/Uday-Shakya/AIGenie.git
   cd AIGenie
   ```

2. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../client
   npm install
   ```

4. Return to root:
   ```bash
   cd ..
   ```

---

## 🚀 Run Locally

### Start Backend
```bash
cd server
npm run dev
```

### Start Frontend
```bash
cd client
npm run dev
```

Frontend runs on `http://localhost:5173` 
Backend runs on `http://localhost:3000`

---

## 🧪 Scripts

| Command          | Description                  |
|------------------|------------------------------|
| `npm run dev`    | Run dev server               |
| `npm run build`  | Build project for production |
| `npm run start`  | Start production build       |
| `npm run lint`   | Run lint checks              |
| `npm run test`   | Run tests (if available)     |

---

## 📸 Screenshots

<img width="1888" height="905" alt="image" src="https://github.com/user-attachments/assets/b9fdf664-df30-4d34-b98c-f5389aa5b78e" />


---

## 👨‍💻 Author

- **Uday Shakya** — [GitHub](https://github.com/Uday-Shakya) | [LinkedIn](https://linkedin.com/in/udayshakya)

---

## 📜 License

This project is licensed under the **MIT License** – see [LICENSE](./LICENSE) file for details.
