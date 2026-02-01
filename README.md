# Startup Benefits Platform – Full Stack Assignment

## Overview

This project is a **Startup Benefits and Partnerships Platform** designed to help early-stage startups, founders, and indie hackers access premium SaaS tools at reduced or free cost.

The platform allows users to:
- Register and authenticate
- Browse public and restricted startup deals
- Claim eligible deals
- Track claimed deals and their verification status in a dashboard

Some deals are publicly accessible, while others are locked and require user verification, enforcing real-world access control scenarios.

---

## End-to-End Application Flow

1. **User Registration & Login**
   - Users create an account and authenticate using email and password.
   - JWT tokens are issued on successful login.

2. **Browse Deals**
   - All users (authenticated or not) can browse available deals.
   - Deals are clearly marked as **public** or **locked**.

3. **Access Control**
   - Locked deals require the user to be verified.
   - Unverified users are prevented from claiming restricted deals at the backend level.

4. **Claim a Deal**
   - Eligible users can claim a deal.
   - Each claim is stored with a status (`pending`, `approved`).

5. **User Dashboard**
   - Users can view their profile information.
   - Claimed deals and their current status are displayed.

---

## Authentication & Authorization Strategy

- Authentication is implemented using **JWT (JSON Web Tokens)**.
- Tokens are generated during login and stored on the client side.
- Protected backend routes use a centralized JWT middleware to:
  - Validate tokens
  - Extract the authenticated user ID
- Authorization rules (such as restricting locked deals) are enforced **inside controllers**, not on the UI.

**Key Principle:**  
> Authorization is enforced at the business-logic level, not the frontend.

---

## Internal Flow: Claiming a Deal

When a user attempts to claim a deal:

1. The request passes through JWT authentication middleware.
2. The backend fetches:
   - The authenticated user
   - The requested deal
3. Validation rules are applied:
   - If the deal is locked and the user is not verified → request is rejected.
   - Duplicate claims for the same deal by the same user are prevented.
4. A new claim is created with status `pending`.
5. The claim appears immediately in the user dashboard.

This design supports asynchronous partner verification workflows.

---

## Frontend–Backend Interaction

- Frontend is built using **Next.js (App Router)**.
- Backend exposes REST APIs using **Express and MongoDB**.
- A centralized API utility handles:
  - Base backend URL
  - JWT token attachment
  - Error handling
- The frontend controls presentation and UX states, while all critical access rules are validated by the backend.

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

## UI & Animation Considerations

- The UI follows a **premium SaaS-style layout**.
- Animations are implemented using **Framer Motion** and are used intentionally for:
  - Page transitions
  - Button feedback
  - Hover states
  - Loading states and skeletons

Animations are designed to enhance clarity and usability rather than distract the user.

---

## Known Limitations

- User verification is simulated and not integrated with a real external verification service.
- Partner approval of claims is not implemented (claims remain pending).
- No role-based admin interface is included.

---

## Improvements for Production Readiness

- Add real startup verification workflows.
- Introduce role-based access (admin/partner dashboards).
- Implement pagination and caching for deals.
- Improve observability with structured logging and monitoring.
- Add automated tests for API endpoints.

---

## Performance & Scalability Considerations

- Stateless JWT authentication allows horizontal scaling.
- Clean separation of concerns improves maintainability.
- Centralized API logic avoids duplication on the frontend.
- MongoDB schema design supports future indexing and optimization.

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

This project focuses on **clarity of flow, correctness, and structure** rather than feature overload.  
Every architectural and design decision was made with scalability, maintainability, and real-world product constraints in mind.

---

