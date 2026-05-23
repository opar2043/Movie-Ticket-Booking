# 🎬 Movies OK — Frontend

**Movies OK** is a premium, full-stack movie streaming, review, and ticketing platform. This repository contains the **Next.js 16 frontend** — a fast, role-aware, responsive web app that lets viewers discover films, write reviews, discuss with other fans, and buy tickets through Stripe, while giving administrators a full dashboard to manage the catalog, users, transactions, and moderation queue.

---

## 🔗 Live Demo & Credentials

- **Live App**: [https://movies-okorg.vercel.app/](https://movies-okorg.vercel.app/)

### 🔑 Demo Admin Account
- **Email**: `admin.moviesok@gmail.com`
- **Password**: `12345678`

You can also self-register a regular user account from the **Sign Up** page to explore the user-side dashboard.

---

## 🧭 Project Overview

Movies OK is split into two cooperating apps:

- **`movie-frontend`** (this repo) — The Next.js 16 client. Owns all UI, routing, role-aware navigation, Stripe checkout flow, Firebase sign-in, and dashboards.
- **`movie-backend`** — A Node.js/Express + PostgreSQL/Prisma API that owns business data: movies, users, reviews, comments, purchases, and the **role** of every account.

### How the pieces fit together

```
              ┌──────────────────────┐
              │      Firebase Auth   │  ←─ identity (UID, email, password)
              └──────────┬───────────┘
                         │ idToken / email
                         ▼
┌──────────────┐   ┌──────────────────┐   ┌─────────────────┐
│ Next.js 16   │──▶│  Express API     │──▶│  PostgreSQL     │
│ (this repo)  │   │  (movie-backend) │   │  (Prisma ORM)   │
└──────┬───────┘   └────────┬─────────┘   └─────────────────┘
       │                    │
       ▼                    ▼
   Stripe Checkout     Cloudinary (poster images)
```

### What each surface does

- **Public site** (`(public)` route group) — Marketing pages, movie catalog, movie details, public reviews, contact, login, and register.
- **Dashboard** (`(dashboardLayout)` route group) — Authenticated area. Auto-redirects to `/dashboard/admin` or `/dashboard/user/reviews` based on the role returned by the API.

---

## ✨ Feature Tour

### 🍿 Viewer Experience
- **Hero & Catalog** — Cinematic landing page, search, and a rich movie catalog with posters, ratings, and synopses.
- **Movie Detail Pages** — Trailers, cast/crew info, average rating, and a full discussion thread of reviews and comments.
- **Reviews & Comments** — Write/edit/delete your own reviews; comment on others' reviews; rate from 1–5 stars.
- **Ticketing & Rentals** — Buy or rent movies via Stripe Checkout (`@stripe/react-stripe-js`); see purchase confirmations on `/success`.
- **Personal Dashboard** — "My Reviews" and "Favorites" pages scoped to the signed-in user.
- **Role-Aware Navbar & Sidebar** — UI items appear/disappear based on the role pulled from the API.

### 🛠️ Admin Experience
- **Overview Stats** — Total movies, users, purchases, and revenue at a glance.
- **Movie Management** — Add, update, and remove movies; upload posters to Cloudinary.
- **All Movies View** — Sortable/filterable table of the full catalog.
- **User Management** — Promote/demote between `USER` and `ADMIN` roles, delete accounts.
- **Moderation** — Review and act on pending reviews/comments.
- **Tickets** — Track every transaction and rental in real time.

### 🛡️ Auth & Role Model (important)
- **Identity** comes from **Firebase Auth** (email + password).
- **Role** comes from the **backend API** — never from the session. After Firebase sign-in, the frontend calls `GET /users`, finds the record by email, and reads `role`.
- A single `UserRole` enum (`USER`, `ADMIN`) lives in `src/app/(auth)/useAuth.ts` and is the **only** source of truth for role checks across the app.
- `normalizeRole()` uppercases/trims the API value, so casing differences (`"admin"` vs `"ADMIN"`) never break role gating.
- `redirectPathForRole()` powers post-login, post-register, and `/dashboard` redirects so every user lands on the correct starting page.

---

## 🚀 Tech Stack

| Concern              | Tooling                                                                 |
| -------------------- | ----------------------------------------------------------------------- |
| Framework            | **Next.js 16** (App Router, Turbopack, React Server Components)         |
| Language             | **TypeScript 5**                                                        |
| UI Library           | **React 19**                                                            |
| Styling              | **Tailwind CSS 4**, `tw-animate-css`, `tailwind-merge`, `clsx`          |
| Components           | **Radix UI**, **shadcn/ui**, **Lucide Icons**, **react-icons**          |
| Authentication       | **Firebase Auth** (email + password)                                    |
| Data Fetching        | **Axios** (shared `api` instance with `withCredentials`)                |
| Tables               | **TanStack Table v8**                                                   |
| Forms & Validation   | **TanStack Form v1**, **Zod 4**                                         |
| Payments             | **Stripe** (`@stripe/react-stripe-js`, `@stripe/stripe-js`)             |
| Media                | **Cloudinary** (custom uploader component)                              |
| Notifications        | **Sonner** toasts + **SweetAlert2** dialogs                             |
| Hosting              | **Vercel**                                                              |

---

## 📂 Project Structure

```
src/app/
├── layout.tsx                  # Root layout: <html>, <body>, global Toaster
├── globals.css                 # Tailwind base + theme
├── (auth)/                     # Auth helpers (not a routable folder)
│   ├── firebase.config.ts      # Firebase client initialization
│   └── useAuth.ts              # useAuth / useSession / UserRole enum
│                               # normalizeRole / redirectPathForRole / signOut
│
├── (public)/                   # Public-facing routes
│   ├── layout.tsx              # Navbar + Footer wrapper
│   ├── page.tsx                # Home / landing page
│   ├── movies/                 # Catalog + movie detail pages
│   ├── review/                 # Public reviews
│   ├── login/                  # Firebase sign-in
│   ├── register/               # Sign-up + API user record creation
│   ├── checkout/               # Stripe checkout flow
│   ├── success/                # Post-payment confirmation
│   ├── about/  contact/
│
├── (dashboardLayout)/
│   └── dashboard/
│       ├── layout.tsx          # Auth guard + sidebar shell
│       ├── page.tsx            # Redirects by API role
│       ├── DashboardSidebar.tsx
│       ├── admin/              # Admin-only routes
│       │   ├── page.tsx        # Stats overview
│       │   ├── movies/         # Add / edit movies
│       │   ├── all-movies/     # Catalog management
│       │   ├── users/          # Role management & deletion
│       │   ├── moderation/     # Review / comment moderation
│       │   └── tickets/        # Transactions
│       └── user/               # User-only routes
│           ├── reviews/        # My reviews
│           └── favorites/      # My favorites
│
└── components/
    ├── Layout/                 # Navbar, Footer, ReviewModal, CommentSection, ...
    ├── service/                # api.tsx + per-resource modules (users, movies, reviews, comments, purchase)
    ├── types/                  # Shared TypeScript types
    ├── ui/                     # shadcn-generated primitives
    └── lib/utils.ts            # cn() helper
```

---

## 🛠️ Installation & Local Setup

### Prerequisites
- **Node.js v20+**
- A running backend API (the companion `movie-backend` repo) — or point `NEXT_PUBLIC_API_URL` at the deployed API.
- A **Firebase project** with Email/Password auth enabled.
- A **Stripe account** (test mode keys are fine for local dev).

### 1. Clone & Install
```bash
git clone https://github.com/your-username/movie-frontend.git
cd movie-frontend
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the project root:
```env
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_xxxxxxxxxxxxxxxxxxxx"
```

> **Note**: The Firebase web config is currently inlined in `src/app/(auth)/firebase.config.ts`. Before shipping, move those values to `NEXT_PUBLIC_FIREBASE_*` env vars and load them from `process.env`.

### 3. Run the Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### 4. Production Build
```bash
npm run build
npm start
```

---

## 📜 Available Scripts

| Command         | Description                                                |
| --------------- | ---------------------------------------------------------- |
| `npm run dev`   | Start the Next.js dev server with Turbopack                |
| `npm run build` | Compile a production build                                 |
| `npm start`     | Serve the production build                                 |
| `npm run lint`  | Run ESLint with `eslint-config-next`                       |

---

## 🧪 Quick QA Checklist

After cloning and running locally, verify:

- [ ] Home page loads and the Navbar shows **Sign In** when logged out.
- [ ] Register flow creates a Firebase user AND a backend user record, then redirects to `/dashboard/user/reviews`.
- [ ] Logging in as the demo admin (`admin.moviesok@gmail.com`) redirects to `/dashboard/admin` and shows the admin sidebar (Movies, Users, Moderation, etc.).
- [ ] Logging in as a normal user shows only the user-side sidebar (My Reviews, Favorites).
- [ ] Visiting `/dashboard` directly redirects based on role — never lands on a blank page.
- [ ] Stripe checkout completes against test card `4242 4242 4242 4242`.

---

## 🌐 Deployment

The frontend is deployed on **Vercel** at [https://movies-okorg.vercel.app/](https://movies-okorg.vercel.app/).

To deploy your own copy:
1. Push this repo to GitHub.
2. Import the repository into [Vercel](https://vercel.com/new).
3. Add the same `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` environment variables in the Vercel dashboard.
4. Trigger a deploy — Vercel detects Next.js automatically.

---

## 📄 License

This project is licensed under the **ISC License**.

---

Built with ❤️ using **Next.js 16**, **Firebase Auth**, **Stripe**, and **Tailwind CSS 4**.
