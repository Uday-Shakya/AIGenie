# AIGenie

AIGenie is an AI-powered SaaS web application built using the PERN stack (PostgreSQL, Express.js, React, Node.js).  
It allows users to interact with AI models to generate content, manage their workspaces, and access premium features via subscriptions.

Live Demo: [[(https://ai-genie-nu.vercel.app)]((https://ai-genie-nu.vercel.app))  

---

## 🧩 Features

- AI-driven content generation using LLM APIs  
- User registration, login, and authentication  
- Role-based access (e.g. free vs paid users)  
- Subscription / payment management (Clerk)
- Dashboard & workspace UI with React  
- Data storage & relational modeling using PostgreSQL  
- Clean API endpoints with Express + Node.js  
- Support for environment-based configuration  
- Ready for containerization / deployment  

---

## 🏗 Project Structure

AIGenie/
├── client/ # React frontend app
├── server/ # Express backend app
├── .gitignore
├── README.md
└── ... # any root-level config, deployment, scripts

markdown
Copy code

- **client/** — React UI, API calls, components, frontend logic  
- **server/** — Express app, routes, controllers, services, DB models  
- **Environment files** — `.env` (or similar) for secrets, API keys, DB URLs  
- **Deployment** — Vercel

---

## 🛠 Getting Started

### Prerequisites

- Node.js & npm / Yarn  
- PostgreSQL database  
- API keys (OpenAI, Stripe, etc.)  

### Setup

1. Clone the repo  
   ```bash
   git clone https://github.com/Uday-Shakya/AIGenie.git
   cd AIGenie
Create .env files in both server/ and client/ (if needed), and set environment variables, e.g.:

text
Copy code
# server/.env
DATABASE_URL='Your Neon Data base URL'

CLERK_PUBLISHABLE_KEY='Your Publishable Key'
CLERK_SECRET_KEY='Your Secret Key'

GEMINI_API_KEY='Your APi Key'

CLIPDROP_API_KEY='Your APi Key'

CLOUDINARY_CLOUD_NAME = "Your cloudinary Cloud name"
CLOUDINARY_API_KEY = 'Your APi Key'
CLOUDINARY_API_SECRET = 'Your APi secret Key'
Install dependencies

# server side
cd server
npm install

# client/.env
VITE_CLERK_PUBLISHABLE_KEY="Your publishable Key"
VITE_BASE_URL=http://localhost:3000

# client side
cd ../client
npm install
Run migrations / setup DB (if using a migration tool, e.g. Prisma, Sequelize, etc.)

# In server
npm run dev

# In client (separate terminal)
cd ../client
npm run dev
By default, backend run on http://localhost:3000, frontend on http://localhost:5173 .

📦 Scripts
Name	Description
npm run dev	Start development server (watch / hot reload)
npm run build	Build for production
npm run start	Start production server
npm run lint	Lint the codebase
npm run test	Run test suites (if tests are added)

## 🔧 Configuration & Environment Variables

Before running the project, create a `.env` file inside the **server/** directory with the following variables:

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


🚀 Deployment

Can be deployed on platforms like Vercel, Heroku, AWS, Render, etc.

Add CI/CD pipelines (GitHub Actions, GitLab CI, etc.) for automated tests, builds, and deployments

🧩 Contribution & Structure Tips
Follow feature-based directory structure in frontend & backend (e.g. components/, services/, routes/)

Write modular, reusable components & APIs

Add proper error handling & logging

Add unit / integration tests over time

Maintain clear and consistent coding style

👤 Authors & Credits
Uday Shakya — original author & maintainer

Contributors (future) are welcome!

📄 License

This project is open-source under the MIT License.
Feel free to use, modify, and distribute.
