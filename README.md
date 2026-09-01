# Btruss Digital Hub - Project Structure & Progress

This project is a Next.js-based agency website for Btruss Services Pvt Ltd. It includes client-facing pages, an admin dashboard for content management, and various interactive UI components.

## 🚀 Completed Work & Project Structure

### 1. App Router & Pages (`src/app`)
- **Home**: Main landing page (`app/page.tsx`)
- **About Us**: Company information and core values (`app/about-us/`)
- **Our Work**: Portfolio and case studies gallery (`app/our-work/`)
- **Services**: Detailed individual service pages (`app/services/`):
  - AI Services
  - Custom Software Development
  - Graphics Design
  - Mobile App Development
  - SEO and Digital Marketing
  - Website Development
- **Admin Dashboard**: Protected content management portal with login (`app/admin/`)
- **API Routes**: Endpoints for content management (`/api/content`) and file uploads (`/api/upload`)

### 2. UI & Layout Components (`src/components`)
- **Layout**: Dynamic Header, Footer, Mobile Navigation, and Loading screens.
- **Sections**: Pre-built, reusable page sections including:
  - Hero & Services Overview
  - About Us, Core Values & Stats Section
  - Case Studies, Our Clients & Portfolio Gallery
  - Contact Form & Pricing Section
  - Service-specific components (Hero, FAQ, Offerings, Process)
- **Admin**: Dashboard UI, Form Fields, and Image Upload capabilities.
- **UI Toolkit**: A comprehensive set of accessible components (Buttons, Dialogs, Forms, Select, Toast, etc.) using Shadcn UI / Radix UI.

### 3. Lib & Hooks (`src/lib` & `src/hooks`)
- **Lib**: 
  - Admin authentication & session management (`admin-auth.ts`, `admin-session.ts`)
  - Content schemas and TypeScript types (`schemas.ts`, `content-types.ts`, `content.ts`)
  - Services data mapping (`services-data.ts`)
- **Hooks**: Custom hooks for scroll animations, count-up effects, toast notifications, site content management, and mobile responsiveness.

### 4. Data (`src/data`)
- `pricing.ts`: Configuration for pricing plans.
- `projects.ts`: Mock data/configuration for projects and case studies.

### 5. Backend & Integrations
- **Firebase**: Configured for backend services and hosting (`firebase.json`, `.firebaserc`).
- **AI Module**: Initial setup for AI integrations (`src/ai/dev.ts`, `src/ai/genkit.ts`).

## 🛠️ Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS + UI Components
- **Backend/Hosting:** Firebase
- **Language:** TypeScript

## 🆕 Recent Updates & Features
- **Splash Screen Redesign**: Implemented a snappy, premium loading screen with custom spring bounce pop-in animations and delayed text reveal. Reduced loading times to ~2.3s while providing a fallback mechanism.
- **Hydration Fixes**: Resolved React Hydration Mismatch errors caused by external browser extensions modifying DOM styles on the server-rendered layouts.
- **Comprehensive Services & Pricing Catalog**: Engineered a fully dynamic, print-ready document page (`/services-pricing-doc`) that renders every granular detail, feature, benefit, and image mapped from `services-data.ts`. Provides a seamless one-click "Save as PDF" functionality.
- **Dynamic Pricing Integration**: Updated service pricing tiers and layouts to offer premium, consistent branding across the site.
