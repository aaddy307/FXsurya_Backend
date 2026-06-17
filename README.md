# FXSurya - Forex & Crypto Prop Firm Trader Website

A complete full-stack application for FXSurya, a professional forex and crypto prop firm trader, mentor, and capital partner.

## Project Structure

```
fxsurya/
├── client/          # Next.js 14 Frontend (React)
├── server/          # Express.js Backend (Node.js + MongoDB)
└── package.json     # Root scripts for running both
```

## Quick Start

### 1. Install Dependencies

```bash
npm run install:all
```

### 2. Configure Environment Variables

**Client** (`client/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key_here
```

**Server** (`server/.env`):
```env
PORT=5000
MONGO_URI=mongodb+srv://your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your_gmail@gmail.com
MAIL_PASS=your_app_password
MAIL_TO=fxsurya_notify@gmail.com
ADMIN_SEED_EMAIL=admin@fxsurya.com
ADMIN_SEED_PASSWORD=FXSurya@2025
CLIENT_URL=http://localhost:3000
```

### 3. Run Development Servers

```bash
# Run both client and server
npm run dev:client  # Frontend at http://localhost:3000
npm run dev:server  # Backend at http://localhost:5000
```

## Tech Stack

### Client (Frontend)
- Next.js 14 (App Router)
- Tailwind CSS
- Framer Motion
- Razorpay Checkout
- Lucide React Icons
- React Hot Toast

### Server (Backend)
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs Password Hashing
- Razorpay SDK
- Nodemailer
- express-rate-limit
- helmet security headers

## Features

- **Public Pages**: Homepage, About, Mentorship, Partner, Education, Contact
- **Admin Panel**: Dashboard, Videos Management, Contacts, Enrollments
- **Razorpay Integration**: Payment processing for mentorship enrollment
- **Email Notifications**: Contact form submissions, enrollment confirmations

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/admin/login | No | Admin login |
| GET | /api/admin/me | Yes | Get current admin |
| GET | /api/admin/stats | Yes | Dashboard statistics |
| GET | /api/videos | No | List videos |
| POST | /api/videos | Yes | Create video |
| PATCH | /api/videos/:id | Yes | Update video |
| DELETE | /api/videos/:id | Yes | Delete video |
| POST | /api/contact | No | Submit contact form |
| GET | /api/contact | Yes | List contacts |
| PATCH | /api/contact/:id/read | Yes | Mark contact as read |
| POST | /api/enrollment/order | No | Create payment order |
| POST | /api/enrollment/verify | No | Verify payment |
| GET | /api/enrollment | Yes | List enrollments |
| GET | /api/health | No | Health check |

## Default Admin Credentials

- **Email**: admin@fxsurya.com
- **Password**: FXSurya@2025

*(Auto-seeded on first server run)*

## License

MIT# FXsurya_Backend
