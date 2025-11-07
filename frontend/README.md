# Angstrom Clone - Frontend

Next.js frontend application for login and registration.

## Features

- ✅ User Registration
- ✅ User Login
- ✅ JWT Token Management
- ✅ Protected Routes
- ✅ Modern UI with Tailwind CSS
- ✅ Form Validation
- ✅ Error Handling

## Setup

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and set your FastAPI backend URL:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx          # Root layout with AuthProvider
│   ├── page.tsx            # Home page
│   ├── login/
│   │   └── page.tsx        # Login page
│   ├── register/
│   │   └── page.tsx        # Registration page
│   └── dashboard/
│       └── page.tsx        # Protected dashboard
├── contexts/
│   └── AuthContext.tsx     # Authentication context
├── lib/
│   └── api.ts              # API service functions
└── package.json
```

## API Endpoints

The frontend connects to your FastAPI backend at:
- `POST /v1/auth/register` - User registration
- `POST /v1/auth/login` - User login

## Features

### Authentication Flow

1. **Registration:**
   - User fills out registration form
   - Password confirmation validation
   - Redirects to login page after successful registration

2. **Login:**
   - User enters username and password
   - JWT token stored in localStorage
   - Redirects to dashboard on success

3. **Protected Routes:**
   - Dashboard requires authentication
   - Redirects to login if not authenticated

## Technologies

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Context** - State management

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Notes

- Make sure your FastAPI backend is running on `http://localhost:8000`
- JWT tokens are stored in `localStorage`
- The dashboard page is protected and requires authentication

