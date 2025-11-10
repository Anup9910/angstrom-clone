# Next.js Flow Explanation

## 1. File-Based Routing System

### How Routes Work:
```
app/page.tsx          → http://localhost:3000/
app/login/page.tsx    → http://localhost:3000/login
app/register/page.tsx → http://localhost:3000/register
app/dashboard/page.tsx → http://localhost:3000/dashboard
```

**Key Points:**
- Each `page.tsx` file automatically becomes a route
- Folder structure = URL structure
- No manual route configuration needed!

---

## 2. Server vs Client Components

### Server Components (Default)
- Run on the server
- No JavaScript sent to browser
- Can access databases, APIs directly
- Faster initial load
- Example: `app/page.tsx` (home page)

```tsx
// Server Component (default)
export default function Home() {
  return <div>This runs on the server</div>
}
```

### Client Components (`'use client'`)
- Run in the browser
- Can use React hooks (useState, useEffect)
- Can handle user interactions
- Example: `app/login/page.tsx`

```tsx
'use client'; // This directive makes it a client component

export default function LoginPage() {
  const [username, setUsername] = useState(''); // ✅ Can use hooks
  // ...
}
```

---

## 3. Request Flow (Step by Step)

### When User Visits http://localhost:3000/login

```
1. Browser Request
   ↓
2. Next.js Server Receives Request
   ↓
3. Next.js Checks: app/login/page.tsx exists?
   ↓
4. Renders Layout First (app/layout.tsx)
   ├── Wraps with <html>, <body>
   ├── Applies global styles
   └── Wraps with <AuthProvider>
   ↓
5. Renders Page Component (app/login/page.tsx)
   ├── Since it has 'use client', sends to browser
   ├── Browser receives HTML + JavaScript
   └── React hydrates (makes it interactive)
   ↓
6. User Sees Login Form
   ↓
7. User Fills Form & Submits
   ↓
8. Client Component Handles Submit
   ├── Calls login() from AuthContext
   ├── Makes API call to FastAPI backend
   └── Updates state (loading, error, success)
   ↓
9. On Success: Router.push('/dashboard')
   ↓
10. Next.js Navigates to /dashboard
    ├── Loads app/dashboard/page.tsx
    └── Renders dashboard
```

---

## 4. Layout System (Nested Layouts)

### Root Layout (app/layout.tsx)
```tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>  {/* Available to ALL pages */}
          {children}    {/* This is where pages render */}
        </AuthProvider>
      </body>
    </html>
  )
}
```

**What happens:**
- Every page is wrapped by this layout
- `AuthProvider` is available on all pages
- Global styles (from `app/globals.css`) are applied once
- Fonts are loaded

### Dashboard Layout (app/dashboard/layout.tsx)
```tsx
import Sidebar from './components/sidebar'
import Navbar from './components/navbar'

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 lg:ml-64">
        <Navbar />
        <main className="pt-14 p-6">{children}</main>
      </div>
    </div>
  )
}
```

**Key points:**
- `Sidebar` and `Navbar` are local client components (`app/dashboard/components/*`)
- Sidebar is fixed on the left (64px) and collapses on mobile
- Navbar is fixed to the top and shifts right on large screens
- Page content renders inside `<main>` with padding below the navbar

This means every dashboard route (`/dashboard`, `/dashboard/users`, etc.) automatically gets the sidebar and navbar without repeating code.

---

## 5. Client-Side Navigation

### Using Next.js Link Component
```tsx
import Link from 'next/link'

<Link href="/login">Login</Link>
```

**What happens:**
1. User clicks link
2. Next.js prefetches the page (in background)
3. Only the page content changes (no full page reload!)
4. URL updates
5. Smooth transition

**Benefits:**
- Faster navigation
- Better user experience
- Preserves React state

---

## 6. Data Fetching Flow

### In Your Login Page:

```tsx
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // 1. Client-side validation
  // 2. Call AuthContext login function
  await login(username, password);
  
  // 3. AuthContext makes API call
  // POST http://localhost:8000/v1/auth/login
  
  // 4. FastAPI processes request
  // 5. Returns JWT token
  
  // 6. Token stored in localStorage
  // 7. Navigate to dashboard
  router.push('/dashboard');
}
```

---

## 7. Authentication Flow

### How AuthContext Works:

```tsx
// contexts/AuthContext.tsx
export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  
  // Available to all pages
  return (
    <AuthContext.Provider value={{ login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
```

**Flow:**
1. User registers → `register()` called
2. API call to FastAPI → User created
3. User logs in → `login()` called
4. API call to FastAPI → JWT token received
5. Token stored in `localStorage`
6. Token added to all API requests (via axios interceptor)

---

## 8. Protected Routes

### Dashboard Page Protection:

```tsx
export default function DashboardPage() {
  const { token, isLoading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!isLoading && !token) {
      router.push('/login'); // Redirect if not logged in
    }
  }, [token, isLoading]);
  
  if (!token) return null; // Don't render if not authenticated
  
  return <div>Protected Content</div>
}
```

**Flow:**
1. Page loads
2. Checks if token exists
3. If no token → redirect to /login
4. If token exists → show dashboard

---

## 9. Rendering Methods

### Static Generation (Default)
- Pages are pre-rendered at build time
- Fast, cached
- Good for static content

### Server-Side Rendering (SSR)
- Rendered on each request
- Use `async` in page component
- Good for dynamic content

### Client-Side Rendering (CSR)
- Rendered in browser
- Use `'use client'` directive
- Good for interactive components

---

## 10. Build & Production Flow

### Development (`npm run dev`):
```
1. Next.js dev server starts
2. Watches for file changes
3. Hot reloads on save
4. Fast refresh (preserves state)
```

### Production (`npm run build`):
```
1. Next.js builds the app
2. Optimizes images, CSS, JS
3. Creates static files
4. Generates server components
5. Ready to deploy
```

---

## 11. Your App's Complete Flow

### User Journey:

```
1. User visits http://localhost:3000
   → app/page.tsx renders (home page)

2. User clicks "Register"
   → Next.js navigates to /register
   → app/register/page.tsx renders

3. User fills registration form
   → Client component handles input
   → Calls register() from AuthContext

4. AuthContext makes API call
   → POST /v1/auth/register
   → FastAPI creates user in database

5. Registration success
   → Redirects to /login?registered=true
   → Login page shows success message

6. User logs in
   → POST /v1/auth/login
   → FastAPI returns JWT token
   → Token stored in localStorage

7. User navigates to dashboard
   → Dashboard checks for token
   → Shows protected content
```

---

## Key Concepts Summary

1. **File-based routing**: Folders = Routes
2. **Server Components**: Default, run on server
3. **Client Components**: Use `'use client'` for interactivity
4. **Layouts**: Wrap pages with shared UI
5. **Client Navigation**: Fast, no page reload
6. **Data Fetching**: Can fetch on server or client
7. **Context API**: Share state across components
8. **Protected Routes**: Check auth before rendering

---

## Your Project Structure Flow

---

## 12. Styling Structure

- **Tailwind CSS** powers the utility classes (configured in `tailwind.config.js`)
- **Global Reset** lives in `app/globals.css` (box-sizing, body background, font smoothing)
- **Layout spacing** is handled with Tailwind utilities (`ml-64`, `pt-14`, etc.)
- **Responsive behavior** for sidebar is achieved with Tailwind breakpoint classes (`lg:hidden`, `lg:translate-x-0`)
- Keep custom CSS minimal—prefer Tailwind utilities for consistency

```
Request → Next.js Server
         ↓
    app/layout.tsx (Root layout)
         ↓
    AuthProvider (Context)
         ↓
    {children} (Current page)
         ↓
    app/login/page.tsx (Client component)
         ↓
    User interacts → API call
         ↓
    FastAPI Backend
         ↓
    Response → Update UI
```

This is how Next.js works! 🚀

