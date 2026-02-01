# Startup Benefits Platform – Full Stack Assignment

## Overview

This project is a **Startup Benefits and Partnerships Platform** designed to help early-stage startups, founders, and indie hackers discover and claim exclusive SaaS and cloud service benefits.

The platform simulates a real-world startup ecosystem where:
- Some deals are public
- Some deals are locked and require verification
- Claims go through an approval lifecycle

The focus of this project is **clean architecture, correct authorization, and production-ready structure** rather than superficial UI features.

---

## 🚀 Live Deployment

The project is fully deployed and accessible online.

### 🌐 Frontend (Vercel)
🔗 https://stirring-assignment.vercel.app

### ⚙️ Backend (Render)
🔗 https://stirring-assignment-backend.onrender.com

### 📡 Sample API Endpoint
🔗 https://stirring-assignment-backend.onrender.com/api/deals

---

## End-to-End Application Flow

1. **User Registration & Authentication**
   - Users register and log in using email and password.
   - A JWT token is generated on successful login.

2. **Browse Deals**
   - All users can browse available deals.
   - Deals are clearly marked as **public** or **locked**.

3. **Access Control**
   - Locked deals require the user to be verified.
   - Authorization is enforced at the backend, not the UI.

4. **Claim a Deal**
   - Eligible users can claim a deal.
   - Duplicate claims for the same deal are prevented.

5. **User Dashboard**
   - Users can view their profile information.
   - All claimed deals are listed with their current status.

---

## Authentication & Authorization Strategy

- Authentication is implemented using **JWT (JSON Web Tokens)**.
- Tokens are stored on the client and attached to API requests.
- A centralized authentication middleware:
  - Validates JWTs
  - Extracts the authenticated user ID
- Authorization rules (such as restricting locked deals) are handled **inside controllers**, not on the frontend.

**Design Principle:**
> Authorization is enforced at the business-logic level, not the UI.

---

## Claim Lifecycle Logic

When a user attempts to claim a deal:

1. The request passes through JWT authentication middleware.
2. The backend fetches the user and deal.
3. Validation rules are applied:
   - Locked deal + unverified user → request rejected.
   - Duplicate claim → request rejected.
4. A new claim is created with status `pending`.
5. The claim appears immediately in the dashboard.

This design supports asynchronous partner verification workflows.

---

## Data Models

### User
- Name
- Email (unique)
- Password (hashed)
- Verification status

### Deal
- Title
- Description
- Category
- Partner name
- Locked / public flag
- Eligibility criteria

### Claim
- User reference
- Deal reference
- Status (`pending`, `approved`)
- Timestamps

---

## Frontend Architecture

- Built using **Next.js (App Router)**.
- Centralized API handler for:
  - Backend base URL
  - JWT token attachment
  - Error handling
- Protected routes prevent unauthorized access to sensitive pages.
- UI state and animations are handled client-side, while all security logic remains on the backend.

---

## UI & Animation Strategy

- Premium SaaS-style layout.
- Animations implemented using **Framer Motion**.
- Motion is used intentionally for:
  - Page transitions
  - Hover states
  - Button feedback
  - Loading and skeleton states

Animations are designed to improve clarity and user experience without being excessive.

---

## Deployment Architecture

- **Frontend:** Deployed on **Vercel**
- **Backend:** Deployed on **Render**
- **Database:** MongoDB Atlas
- **CORS:** Explicitly configured for secure cross-origin communication
- **Environment Variables:** Managed securely on hosting platforms

This setup mirrors a real-world production deployment with proper separation of concerns.

---

## Known Limitations

- Startup verification is simulated.
- No admin or partner dashboard is implemented.
- Claims remain in `pending` state unless manually updated.

---

## Possible Improvements

- Real startup verification workflow.
- Admin/partner approval interface.
- Role-based access control.
- Pagination and caching for large datasets.
- Automated testing for API endpoints.

---

## Tech Stack

### Frontend
- Next.js (App Router)
- JavaScript
- Tailwind CSS
- Framer Motion

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication

---

## Final Notes

This project emphasizes **correct flow, clean separation of concerns, and backend-driven authorization**.  
All architectural decisions were made with scalability, maintainability, and real-world constraints in mind.

---

