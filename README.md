# Angstrom Clone - Full Stack Application

A full-stack authentication system with FastAPI backend and Next.js frontend.

## Project Structure

```
angstrom-clone/
├── app/                    # FastAPI backend
│   ├── main.py            # FastAPI application
│   ├── database.py        # Database configuration
│   ├── models.py          # SQLAlchemy models
│   ├── schemas.py         # Pydantic schemas
│   └── routers/
│       └── auth.py        # Authentication routes
├── frontend/              # Next.js frontend
│   ├── app/               # Next.js app directory
│   ├── contexts/          # React contexts
│   └── lib/               # Utility functions
├── requirements.txt       # Python dependencies
└── README.md
```

## Backend (FastAPI)

### Setup

1. Create virtual environment:
   ```bash
   python -m venv venv
   ```

2. Activate virtual environment:
   ```bash
   # Windows
   venv\Scripts\activate
   
   # Linux/Mac
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure database in `app/database.py`:
   - Update `DATABASE_NAME`, `DATABASE_USER`, `DATABASE_PASSWORD` as needed

5. Run the server:
   ```bash
   uvicorn app.main:app --reload
   ```

The API will be available at `http://localhost:8000`
- API Docs: http://localhost:8000/docs

## Frontend (Next.js)

### Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` file:
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`

## Features

- ✅ User Registration
- ✅ User Login
- ✅ JWT Token Authentication
- ✅ Password Hashing (pbkdf2_sha256)
- ✅ MySQL Database Integration
- ✅ Modern UI with Tailwind CSS
- ✅ Protected Routes

## API Endpoints

- `POST /v1/auth/register` - Register a new user
- `POST /v1/auth/login` - Login and get JWT token

## Technologies

### Backend
- FastAPI
- SQLAlchemy
- PyMySQL
- Python-JOSE (JWT)
- Passlib (Password hashing)

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Axios
- React Context API

## Database

The application uses MySQL. Make sure you have:
- Database: `angstrom_erp`
- Table: `users` with columns: `id`, `username`, `email`, `password`

## License

MIT

