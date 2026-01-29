# Football E-Commerce Platform - AI Agent Instructions

## Architecture Overview
- **Monorepo structure**: Separate `client/` (React) and `server/` (Express + MongoDB) directories
- **Client-Server boundary**: Client expects API at `http://localhost:5000/api` (configurable via `REACT_APP_API_URL`)
- **Authentication flow**: JWT tokens stored in localStorage, sent via `Authorization: Bearer <token>` header
- **Role-based access**: User model has `role` field (`user` | `admin`) for authorization

## Development Workflows

### Starting the Application
```bash
# Terminal 1 - Backend (from root)
cd server
npm install
npm run dev          # Uses nodemon for hot reload

# Terminal 2 - Frontend (from root)
cd client
npm install
npm start            # Runs on port 3000
```

### Environment Setup
- Server requires `.env` file with `MONGO_URI` and `JWT_SECRET`
- Default MongoDB URI: `mongodb://127.0.0.1:27017/football-ecom` (fallback in [server.js](server/server.js#L17))
- Default JWT secret: `'secret'` (fallback in [authController.js](server/controllers/authController.js#L26))

## Code Conventions

### API Communication Pattern
- **Client-side**: All API calls use centralized `api` instance from [services/api.js](client/src/services/api.js)
- **Auth helper**: Login/register/logout abstracted in [services/auth.js](client/src/services/auth.js)
- **Token attachment**: Manually attach headers per request (see [AdminPanel.js](client/src/components/AdminPanel.js#L10-L11))
  ```javascript
  const token = localStorage.getItem('token');
  if (token) headers.Authorization = `Bearer ${token}`;
  ```

### Backend Middleware Chain
- Protected routes use: `verifyToken` → `isAdmin` middleware (see [productRoutes.js](server/routes/productRoutes.js#L10-L11))
- Input validation via `express-validator` on POST/PUT endpoints
- User context available as `req.user` after `verifyToken` runs

### Data Models
- **User schema**: `name`, `email`, `password` (hashed), `role`, timestamps
- **Product schema**: `name`, `price`, `description`, `image`, `category`, `countInStock`, timestamps
- Passwords hashed with bcryptjs (10 salt rounds) before storage

### React Component Patterns
- Functional components with hooks (no class components)
- State management: Local `useState` (no Redux/Context providers detected)
- Forms use controlled inputs with `onChange` handlers updating state objects
- Routes defined in [App.js](client/src/App.js) using react-router-dom v6

## Key Integration Points

### Admin Operations
- Create/Update/Delete products require admin JWT token
- [AdminPanel.js](client/src/components/AdminPanel.js) demonstrates full CRUD pattern with inline editing
- Delete confirmation uses browser `confirm()` dialog

### API Endpoints
- `POST /api/auth/register` - Create user account
- `POST /api/auth/login` - Returns JWT + user object
- `GET /api/products` - Public product listing
- `GET /api/products/:id` - Single product details
- `POST /api/products` - Admin only, validated via express-validator
- `PUT /api/products/:id` - Admin only update
- `DELETE /api/products/:id` - Admin only deletion

## Common Gotchas
- No automatic token refresh - JWT expires in 7 days
- Admin role must be set directly in database (no register-as-admin endpoint)
- CORS enabled globally - all origins accepted in development
- No centralized error handling component - errors shown as inline messages
