#  Medique — Find & Book Expert Tutors Online

Medique is a modern, responsive, and secure full-stack web platform built for students to discover, explore, and book specialized tutors based on their academic requirements. From searching verified instructors to managing personal learning schedules, Medique offers a seamless end-to-end user experience with real-time feedback.

**Live Website URL:** 
Client Site:
https://mediqueue-client-black.vercel.app/
Server Site:
https://medique-server-chi.vercel.app/

---

## ✨ Key Features & Highlights

* **Instant Loading Home Carousel:** A beautiful and fully responsive 3-slide header banner that uses optimized local assets. It preloads instantly on the page without any annoying blank background lag or network buffering delays.
* **Smart Name Search & Date Filters:** A powerful filtering dashboard where users can search for tutors by name (case-insensitive) or filter them by selecting dynamic start and end dates to find available study schedules.
* **Solid Route Protection (Proxy Gateway):** Secured all private dashboards and detail pages using a Next.js 15 server-side proxy configuration. It automatically intercepts logged-out users and pushes them safely back to the login screen.
* **One-Click Light & Dark Theme Toggle:** A smooth and seamless theme switch button placed right in the navbar that dynamically updates background styles, input field properties, and card outlines across the entire site instantly.
* **Smooth CRUD Sync with Real-Time Toasts:** Fully functional management dashboards where you can create, update, or cancel bookings. Every database action gives interactive and instant feedback through elegant sliding hot-toast alert bubbles.
* **Custom 404 Pages & Clean Loading Spinner:** Outfitted with custom-designed fallback screens for broken links, error boundaries to prevent app crashes, and a smooth animated cyan spinner that keeps the UI looking clean while fetching database records.

---

## 🛠️ Technology Stack Used

### Frontend Client
* **Framework:** Next.js 15 (App Router Architecture)
* **UI Components:** HeroUI (Formerly NextUI) & Tailwind CSS
* **State & Session:** BetterAuth Client Configuration
* **Alerts & Visuals:** React Hot Toast & Framer Motion

### Backend Server
* **Runtime Environment:** Node.js with Express.js Framework
* **Database Engine:** MongoDB Client (Atlas Cluster Storage)
* **Security & Tokens:** JSON Web Token (JWT) & Middleware Authorization Gateways
* **Deployment Platform:** Vercel (Serverless Edge Infrastructure)

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
