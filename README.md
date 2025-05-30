> **Note:** This repository is a personal backup of coursework originally developed as part of my studies at Cornerstone College. It was cloned from a institutional and private repository to preserve my contributions and development history.

# Unicareer

🔗 [Live Demo](https://unicareer.online)

Unicareer is a modern job-matching platform that connects students and recent graduates with employers using AI-driven matchmaking and a clean, intuitive interface.

## 🚀 Features

### 👩‍🎓 For Candidates & Students
- Access to **personalized job listings**
- Apply with **one click**
- Real-time **application status updates**
- AI-powered **resume parsing**
- Build a **professional portfolio** and gain practical experience

### 🏢 For Employers
- Discover and connect with **qualified candidates**
- Post and manage jobs with ease
- AI-based **candidate-matching system**
- Streamlined **application tracking**

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 15 with Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB (via Prisma)
- **Authentication**: Clerk
- **Storage**: AWS S3
- **Payments**: Stripe
- **AI Integration**: OpenAI
- **PDF Parsing**: pdf.js-extract
- **Charts**: Chart.js
- **State Management**: Redux Toolkit
- **UI Libraries**: PrimeReact, React Icons, Swiper

## 📦 Scripts

```bash
npm run dev     # Start dev server with Turbopack
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint
```

## 🧪 Environment Variables

The project uses the following environment variables (`.env`):

```env
# Database
DATABASE_URL="mongodb+srv://..."

# Clerk (Authentication)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up  

# Stripe (Payments)
STRIPE_SECRET_KEY=...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
STRIPE_WEBHOOK_SECRET=...
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# AWS (File Uploads)
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=...
S3_BUCKET_NAME=...
NEXT_PUBLIC_S3_BASE_URL=https://...

# OpenAI (AI features)
OPENAI_API_KEY="..."
```

## 📁 Project Structure Highlights

- `/app`: Core pages and routing
- `/components`: Reusable UI components
- `/redux`: Global state management
- `/utils`: Utility functions and helpers
- `/api`: API routes (server-side functions)

## 👥 Contributors

- Leni Ramos
- Liliana Forero 
- Eduardo Cisneros
- Jose Trueba


## 📄 License

This project is private and proprietary. Contact the project owner for licensing details.
