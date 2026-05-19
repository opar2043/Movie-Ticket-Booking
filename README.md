# 🎬 Movies OK — Frontend

A premium movie streaming, review, and ticketing platform built with **Next.js 16**. Movies OK lets users browse films, read and write reviews, comment on community threads, and buy tickets through Stripe, while giving admins a full dashboard for managing the catalog, users, and moderation.

---

## 🔗 Live Demo & Credentials

- **Live Link**: [movie-media-blue.vercel.app](https://movie-media-blue.vercel.app/)

### 🔑 Demo Admin Account
- **Email**: `admin.movies@gmail.com`
- **Password**: `12345678`

---

## ✨ Key Features

### 🍿 For Users
- **Dynamic Movie Catalog** — Browse movies with posters, synopses, ratings, and trailers.
- **Ticketing & Rentals** — Buy or rent movies through **Stripe** checkout.
- **Reviews & Ratings** — Write, edit, and delete reviews with star ratings.
- **Discussion Threads** — Comment on reviews and join community discussions.
- **Personal Dashboard** — Track your reviews, favorites, and purchases.
- **Role-Aware UI** — The navbar and sidebar adapt automatically based on the role returned from the API.

### 🛠️ For Administrators
- **Admin Dashboard** — Overview of movies, users, ticket sales, and revenue.
- **Movie Management** — Add, update, and remove movies with Cloudinary-hosted posters.
- **Moderation** — Approve or reject pending reviews and comments.
- **User Management** — Promote users to admin, demote admins, and delete accounts.
- **Transactions** — View every purchase and rental in real time.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React Server Components)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **UI**: [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [shadcn/ui](https://ui.shadcn.com/), [Lucide Icons](https://lucide.dev/)
- **Authentication**: [Firebase Auth](https://firebase.google.com/products/auth) (email + password). User roles are sourced from the backend API, never from the session.
- **Data Fetching**: [Axios](https://axios-http.com/) with a shared `api` instance
- **Tables**: [TanStack Table](https://tanstack.com/table)
- **Forms**: [TanStack Form](https://tanstack.com/form) + [Zod](https://zod.dev/) validation
- **Payments**: [Stripe](https://stripe.com/) (`@stripe/react-stripe-js`)
- **Media**: Cloudinary uploads via a custom uploader component
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/) toasts + [SweetAlert2](https://sweetalert2.github.io/) dialogs

---

## 📂 Project Structure

```
src/app/
├── layout.tsx                  # Root layout (<html>, <body>, global Toaster)
├── globals.css
├── (auth)/                     # Auth helpers (not a route)
│   ├── firebase.config.ts      # Firebase client init
│   └── useAuth.ts              # useAuth / useSession / UserRole enum / signOut
├── (public)/                   # Public-facing routes
│   ├── layout.tsx              # Navbar + Footer wrapper
│   ├── page.tsx                # Home
│   ├── movies/                 # Catalog + movie details
│   ├── review/                 # Public reviews
│   ├── login/                  # Firebase email/password sign-in
│   ├── register/               # Create account + API user record
│   ├── checkout/               # Stripe checkout
│   ├── success/                # Post-payment confirmation
│   ├── about/  contact/
├── (dashboardLayout)/
│   └── dashboard/
│       ├── layout.tsx          # Auth guard + sidebar shell
│       ├── page.tsx            # Redirects by API role
│       ├── DashboardSidebar.tsx
│       ├── admin/              # Admin-only routes
│       │   ├── page.tsx        # Stats overview
│       │   ├── movies/         # Add/edit movies
│       │   ├── all-movies/
│       │   ├── users/          # Manage users (role + delete)
│       │   ├── moderation/
│       │   └── tickets/
│       └── user/               # User-only routes
│           ├── reviews/        # My reviews
│           └── favorites/
└── components/
    ├── Layout/                 # Navbar, Footer, ReviewModal, CommentSection, ...
    ├── service/                # api.tsx + per-resource HTTP modules
    ├── types/                  # Shared TypeScript types
    ├── ui/                     # shadcn components
    └── lib/utils.ts            # cn() helper
```

---

## 🔐 Auth & Role Model

- **Identity** is owned by Firebase Auth (UID + email + password).
- **Role** is owned by the backend API. After Firebase sign-in, the frontend calls `GET /users`, finds the record by email, and reads `role` from there.
- A single `UserRole` enum (`USER`, `ADMIN`) defined in `src/app/(auth)/useAuth.ts` is the source of truth for every role check in the UI.
- `normalizeRole()` defensively uppercases/trims whatever the API returns so casing differences never break role gating.
- `redirectPathForRole()` is used by login, register, and `/dashboard` to send each user to the right starting page (`/dashboard/admin` or `/dashboard/user/reviews`).

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js v20+
- A running backend API (see the [backend repository](#) for setup)
- Firebase project with Email/Password auth enabled
- Stripe account (test mode is fine for local development)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/movie-frontend.git
cd movie-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Create a `.env.local` file in the project root:
```env
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```
Firebase config currently lives in `src/app/(auth)/firebase.config.ts`. Move it to env vars (`NEXT_PUBLIC_FIREBASE_*`) before deploying if you want to keep keys out of the repo.

### 4. Run the Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### 5. Production Build
```bash
npm run build
npm start
```

---

## 📜 Scripts

| Command         | Description                              |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Start the Next.js dev server (Turbopack) |
| `npm run build` | Build the production bundle              |
| `npm start`     | Run the production server                |
| `npm run lint`  | Run ESLint                               |

---

## 📸 Screenshots

| Home Page | Movie Details | Admin Dashboard |
| :---: | :---: | :---: |
| ![Home](public/next.svg) | ![Details](public/window.svg) | ![Dashboard](public/globe.svg) |

---

## 📄 License
This project is licensed under the **ISC License**.

---

Built with ❤️ using Next.js 16 and Firebase Auth.
