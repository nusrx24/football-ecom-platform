# Server (Express + MongoDB)

Basic backend for the football e-commerce project.

Quick start

1. cd into the server folder

```bash
cd server
npm install
```

2. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.

3. Run the server:

```bash
npm run dev
```

API endpoints
- `POST /api/auth/register` - register
- `POST /api/auth/login` - login
- `GET /api/products` - list products
- `GET /api/products/:id` - product details
- `POST /api/products` - create (admin)
- `PUT /api/products/:id` - update (admin)
- `DELETE /api/products/:id` - delete (admin)
