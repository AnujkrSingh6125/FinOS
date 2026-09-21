# FinOS — Financial Operating System (Authentication Gateway)

An institutional-grade, production-ready authentication gateway built for the **FinOS (Financial Operating System)** platform. FinOS combines modern cryptographic security standards, email-based 6-digit one-time password (OTP) verification, official Google OAuth 2.0 flows, and HttpOnly session cookies within a dark fintech interface.

---

## 1. System Architecture Overview

FinOS employs a strict full-stack separation:

- **Frontend**: Next.js (App Router), React 18, TypeScript, Tailwind CSS, Lucide React icons.
- **Backend API**: Python 3.14, FastAPI, Pydantic v2, SQLAlchemy, SQLite (production-ready ORM structure), PyJWT.
- **Security Primitives**:
  - Cryptographically secure 6-digit OTP generation using Python's standard `secrets` module.
  - Salted HMAC-SHA256 one-way hashing for OTP storage. Plaintext codes are **never** stored or returned in client API responses.
  - Expiration enforcement (5-minute TTL).
  - Attempt-limiting (maximum 5 attempts per code before invalidation).
  - Rate-limiting cooldowns (60 seconds between resend requests).
  - HttpOnly, SameSite=Lax, encrypted JWT session cookies.

```
FinOS/
├── frontend/                     # Next.js Application
│   ├── app/
│   │   ├── layout.tsx            # Global providers & typography
│   │   ├── page.tsx              # FinOS Auth / Landing page
│   │   ├── globals.css           # Fintech dark palette & animations
│   │   ├── dashboard/page.tsx    # Protected FinOS command center
│   │   └── auth/callback/page.tsx# OAuth callback handler
│   ├── components/auth/
│   │   ├── AuthCard.tsx          # Card container with glowing borders
│   │   ├── LoginForm.tsx         # Auth flow coordinator
│   │   ├── EmailLogin.tsx        # Email submission form
│   │   ├── OTPVerification.tsx   # Verification screen with countdown
│   │   ├── OTPInput.tsx          # 6-box input with paste & auto-advance
│   │   └── GoogleLoginButton.tsx # Official Google OAuth sign-in button
│   ├── lib/api.ts                # Typed client API with credentials: 'include'
│   ├── hooks/useAuth.ts          # Global session & authentication state
│   ├── types/auth.ts             # TypeScript definitions
│   └── .env.example / .env.local
│
├── backend/                      # FastAPI Backend
│   ├── app/
│   │   ├── main.py               # Application entry, CORS, lifespan
│   │   ├── api/auth.py           # REST endpoints (/auth/*)
│   │   ├── core/
│   │   │   ├── config.py         # Pydantic Settings
│   │   │   └── security.py       # Secrets OTP, HMAC-SHA256, PyJWT
│   │   ├── db/
│   │   │   ├── base.py
│   │   │   └── session.py        # SQLAlchemy engine & session maker
│   │   ├── models/
│   │   │   ├── user.py           # User table (id, email, google_id, etc.)
│   │   │   └── otp.py            # OTPRequest table (hashed_otp, salt, attempts)
│   │   ├── schemas/auth.py       # Pydantic request/response schemas
│   │   └── services/
│   │       ├── auth_service.py   # Cooldown, verification, OAuth logic
│   │       └── email_service.py  # SMTP transport & Dev Mode inbox
│   ├── tests/test_auth.py        # Comprehensive test suite
│   ├── requirements.txt
│   └── .env.example / .env
│
├── .gitignore
└── README.md
```

---

## 2. Quickstart & Installation

### Prerequisites
- **Node.js**: v18+ or v20+ (Node v24 supported)
- **npm**: v9+
- **Python**: 3.10+ (Python 3.14 supported)

---

### Backend Setup

1. Open a terminal in the `backend/` directory:
   ```bash
   cd backend
   ```

2. Create and activate a Python virtual environment:
   ```powershell
   # Windows PowerShell
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```
   *(On macOS/Linux: `python3 -m venv venv && source venv/bin/activate`)*

3. Install the dependencies:
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

4. Configure the environment variables:
   ```bash
   cp .env.example .env
   ```
   *(Or edit `backend/.env` directly with your preferred settings)*

5. Launch the FastAPI development server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   - API Server: `http://localhost:8000`
   - Interactive OpenAPI Docs: `http://localhost:8000/docs`
   - Alternative ReDoc: `http://localhost:8000/redoc`

---

### Frontend Setup

1. Open a terminal in the `frontend/` directory:
   ```bash
   cd frontend
   ```

2. Install node dependencies:
   ```bash
   npm install
   ```

3. Configure the environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   - Frontend Application: `http://localhost:3000`

---

## 3. Environment Variables Reference

### Backend (`backend/.env`)

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `SECRET_KEY` | Key for signing JWT session tokens | `finos_core_jwt_secret_dev_...` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Session token lifetime in minutes | `1440` (24 hours) |
| `FRONTEND_URL` | Frontend origin for CORS and redirects | `http://localhost:3000` |
| `DEV_MODE` | Logs OTP to terminal and `dev_inbox.log` | `true` |
| `SMTP_HOST` | SMTP server hostname | `smtp.gmail.com` / `smtp.resend.com` |
| `SMTP_PORT` | SMTP port | `587` |
| `SMTP_USERNAME` | SMTP username / account | `user@example.com` |
| `SMTP_PASSWORD` | SMTP password / app password | `secret_password` |
| `EMAIL_FROM` | Sender display name and address | `FinOS Security <security@finos.io>` |
| `GOOGLE_CLIENT_ID` | Google Cloud OAuth Client ID | `your_google_client_id.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET`| Google Cloud OAuth Client Secret | `your_google_client_secret` |
| `GOOGLE_REDIRECT_URI` | Google OAuth callback endpoint | `http://localhost:8000/auth/google/callback` |

### Frontend (`frontend/.env.local`)

| Variable | Description | Default |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | Base URL of the FastAPI backend | `http://localhost:8000` |

---

## 4. How Email OTP Authentication Works

1. **User Request**: The user enters their email address in the frontend and clicks **Continue with Email**.
2. **Backend Processing**:
   - FastAPI receives `POST /auth/email/request-code`.
   - Checks if a request was made within the last 60 seconds (rate-limit cooldown).
   - Generates a cryptographically random 6-digit code using `secrets.randbelow(10)`.
   - Hashes the OTP using HMAC-SHA256 with a unique random salt and `SECRET_KEY`.
   - Stores the hashed OTP, salt, and expiration timestamp (now + 5 minutes) in SQLite.
3. **Delivery**:
   - **Production (SMTP configured)**: Dispatches a branded HTML email via TLS/SSL.
   - **Development Mode**: Appends the email details to `backend/dev_inbox.log` and logs to the console so developers can inspect and test instantly without an active SMTP server.
4. **Client Verification**:
   - User types or pastes the 6-digit code into the interactive input boxes.
   - Frontend sends `POST /auth/email/verify-code` with `{ email, code }`.
   - Backend checks expiration, checks attempt counter (< 5), and compares constant-time hash.
   - Upon success, an HttpOnly cookie (`finos_session`) containing a signed JWT is set.
   - The user is redirected to the `/dashboard` command center.

---

## 5. How Google OAuth 2.0 Works

1. **User Action**: The user clicks **Continue with Google**.
2. **Authorization**: The frontend queries `GET /auth/google/login`, which returns Google's official authorization URL including the `client_id`, `redirect_uri`, `scope=openid email profile`, and a unique `state` token.
3. **Consent**: The user authenticates with Google on accounts.google.com.
4. **Callback**: Google redirects to `GET /auth/google/callback?code=...&state=...`.
5. **Token Exchange**: FastAPI posts the authorization code to Google's token endpoint (`https://oauth2.googleapis.com/token`) and retrieves profile data from `https://www.googleapis.com/oauth2/v3/userinfo`.
6. **Session Creation**: FastAPI creates or updates the user profile in the database, attaches the HttpOnly `finos_session` cookie, and redirects the browser directly to `http://localhost:3000/dashboard`.

> **Note**: To use Google OAuth, create a Project in the [Google Cloud Console](https://console.cloud.google.com/), enable OAuth 2.0 with redirect URI `http://localhost:8000/auth/google/callback`, and add the credentials to `backend/.env`. If omitted, the UI gracefully informs the user that configuration is required.

---

## 6. API Endpoint Documentation

| Method | Endpoint | Description | Request Body / Query | Response |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/auth/email/request-code` | Requests 6-digit OTP | `{"email": "user@finos.io"}` | `{"message": "...", "cooldown_seconds": 60}` |
| `POST` | `/auth/email/verify-code` | Verifies OTP & starts session | `{"email": "...", "code": "123456"}` | `{"message": "...", "user": {...}}` + Set-Cookie |
| `GET` | `/auth/google/login` | Gets Google OAuth URL | None | `{"auth_url": "https://accounts.google.com/..."}` |
| `GET` | `/auth/google/callback` | OAuth redirect callback | `?code=...&state=...` | 303 Redirect to `/dashboard` + Set-Cookie |
| `GET` | `/auth/me` | Retrieves active user | None (reads cookie) | `User` object (id, email, name, etc.) |
| `POST` | `/auth/logout` | Clears session cookie | None | `{"message": "Successfully logged out..."}` |
| `GET` | `/health` | Healthcheck endpoint | None | `{"status": "healthy"}` |

---

## 7. Running Tests

The test suite runs against an isolated in-memory SQLite database:

```powershell
cd backend
.\venv\Scripts\python.exe -m pytest tests/ -v
```

This verifies:
- Cryptographic OTP generation (6 numeric digits).
- HMAC-SHA256 salted hashing and verification.
- OTP request lifecycle & 60-second cooldown enforcement.
- Verification success and session cookie generation.
- Rate-limit enforcement on failed attempts (max 5).
- Expiration rejection for outdated codes.
- `/auth/me` session authentication and logout.

---

## 8. Troubleshooting

- **CORS Errors**: Ensure `FRONTEND_URL` in `backend/.env` matches the URL you use in your browser (`http://localhost:3000`).
- **Cannot receive OTP email**: Check `backend/dev_inbox.log` or the backend terminal where the OTP code is logged when SMTP is not configured.
- **Google OAuth redirect mismatch**: Ensure `http://localhost:8000/auth/google/callback` is added to "Authorized redirect URIs" in your Google Cloud Console OAuth 2.0 client.
- **Port Conflicts**: FastAPI defaults to port `8000`, and Next.js defaults to port `3000`. Adjust with `--port` or `-p` if needed.
