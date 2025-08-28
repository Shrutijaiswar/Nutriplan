🌱 NutriPlan

NutriPlan is a modern nutrition planning web application built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and shadcn/ui. It helps users track meals, analyze nutrition intake, and generate personalized diet recommendations.

🚀 Tech Stack

Next.js 14 – React framework with App Router

TypeScript – Type safety

Tailwind CSS – Utility-first styling

shadcn/ui – Prebuilt accessible UI components

PostCSS – CSS processing

Vercel – Deployment

📂 Project Structure
nutriplan/
 ├── app/              # Next.js app router pages & layouts
 ├── components/       # Reusable UI components
 ├── lib/              # Utility functions, configs
 ├── public/           # Static assets (images, icons, etc.)
 ├── styles/           # Global styles (Tailwind, CSS)
 ├── next.config.mjs   # Next.js configuration
 ├── package.json      # Dependencies & scripts
 ├── tsconfig.json     # TypeScript configuration
 ├── pnpm-lock.yaml    # Lockfile for dependencies
 └── README.md         # Documentation

⚡ Getting Started
1. Clone the repo
git clone https://github.com/Shrutijaiswar/nutriplan.git
cd nutriplan

2. Install dependencies
pnpm install
# or
npm install
# or
yarn install

3. Run the development server
pnpm dev
# or
npm run dev


Now open http://localhost:3000
 in your browser.

4. Build for production
pnpm build
pnpm start

🌍 Deployment

The project is deployed on Vercel:
👉 nutriplan.vercel.app

✨ Features (Planned/Available)

🥗 Add meals and track nutrition

📊 Visualize calorie & nutrient intake

🤖 AI-based personalized diet suggestions

💾 Save user preferences and history

🎨 Beautiful, responsive UI with shadcn/ui + Tailwind
