# Football E-Commerce Platform - API Reference

## Backend API Endpoints

All endpoints are prefixed with `/api`

---

## 🔐 Authentication Routes

### Register
```
POST /auth/register
Body: {
  name: "John Doe",
  email: "john@example.com",
  password: "password123"
}
Response: {
  user: { id, name, email, role },
  token: "jwt_token"
}
```

### Login
```
POST /auth/login
Body: {
  email: "john@example.com",
  password: "password123"
}
Response: {
  user: { id, name, email, role },
  token: "jwt_token"
}
```

---

## 📦 Product Routes

### Get All Products (with filters)
```
GET /products
  ?q=arsenal              // Search by name/description/team/league/brand
  &team=Arsenal           // Filter by team
  &league=Premier+League  // Filter by league
  &brand=Adidas           // Filter by brand
  &jerseyType=Home        // Filter by jersey type
  &isRetro=true           // Show only retro editions
  &size=L                 // Filter by available size
  &minPrice=50            // Minimum price
  &maxPrice=200           // Maximum price

Response: [
  {
    _id: "...",
    name: "Arsenal Home Jersey 2023-24",
    price: 89.99,
    description: "...",
    image: "...",
    category: "Jerseys",
    team: "Arsenal",
    league: "Premier League",
    brand: "Adidas",
    season: "2023-24",
    jerseyType: "Home",
    isRetro: false,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    allowNameNumber: true,
    countInStock: 50,
    reviews: [...],
    rating: 4.5,
    numReviews: 12,
    createdAt: "...",
    updatedAt: "..."
  },
  ...
]
```

### Get Single Product
```
GET /products/:id

Response: {
  _id: "...",
  name: "Arsenal Home Jersey 2023-24",
  price: 89.99,
  ... (full product object)
}
```

### Create Product (Admin Only)
```
POST /products
Headers: Authorization: Bearer {token}
Body: {
  name: "Arsenal Home Jersey 2023-24",
  price: 89.99,
  description: "Official Arsenal home jersey",
  image: "https://...",
  category: "Jerseys",
  team: "Arsenal",
  league: "Premier League",
  brand: "Adidas",
  season: "2023-24",
  jerseyType: "Home",
  isRetro: false,
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  allowNameNumber: true,
  countInStock: 50
}

Response: {
  _id: "...",
  ... (created product object)
}

Errors:
  400 - Missing required fields
  401 - Unauthorized (no token)
  403 - Forbidden (not admin)
  500 - Server error
```

### Update Product (Admin Only)
```
PUT /products/:id
Headers: Authorization: Bearer {token}
Body: {
  name: "...",
  price: 89.99,
  ... (any fields to update)
}

Response: {
  _id: "...",
  ... (updated product object)
}

Errors:
  401 - Unauthorized
  403 - Forbidden (not admin)
  404 - Product not found
  500 - Server error
```

### Delete Product (Admin Only)
```
DELETE /products/:id
Headers: Authorization: Bearer {token}

Response: {
  message: "Product deleted"
}

Errors:
  401 - Unauthorized
  403 - Forbidden (not admin)
  404 - Product not found
  500 - Server error
```

### Add Product Review
```
POST /products/:id/reviews
Headers: Authorization: Bearer {token}
Body: {
  rating: 5,
  comment: "Great quality jersey! Perfect fit."
}

Response: {
  message: "Review added"
}

Errors:
  401 - Unauthorized (must be logged in)
  400 - Already reviewed this product
  404 - Product not found
  500 - Server error
```

---

## 🛒 Order Routes

### Create Order
```
POST /orders
Headers: Authorization: Bearer {token}
Body: {
  orderItems: [
    {
      product: "...",
      name: "Arsenal Home Jersey 2023-24",
      quantity: 1,
      price: 89.99,
      image: "...",
      selectedSize: "L",
      customName: "SAKA",
      customNumber: "7"
    },
    ...
  ],
  shippingAddress: {
    fullName: "John Doe",
    address: "123 Main St",
    city: "London",
    postalCode: "SW1A 1AA",
    phone: "+44 20 7946 0958"
  },
  paymentMethod: "Card",
  itemsPrice: 89.99,
  taxPrice: 9.00,
  shippingPrice: 10.00,
  totalPrice: 108.99
}

Response: {
  _id: "...",
  user: "...",
  orderItems: [...],
  shippingAddress: {...},
  paymentMethod: "Card",
  itemsPrice: 89.99,
  taxPrice: 9.00,
  shippingPrice: 10.00,
  totalPrice: 108.99,
  isPaid: true,
  paidAt: "...",
  isDelivered: false,
  status: "pending",
  createdAt: "...",
  updatedAt: "..."
}

Errors:
  400 - No order items
  401 - Unauthorized
  500 - Server error
```

### Get My Orders
```
GET /orders/myorders
Headers: Authorization: Bearer {token}

Response: [
  {
    _id: "...",
    user: "...",
    orderItems: [...],
    shippingAddress: {...},
    status: "pending",
    totalPrice: 108.99,
    createdAt: "...",
    ... (full order objects)
  },
  ...
]

Errors:
  401 - Unauthorized
  500 - Server error
```

### Get Order by ID
```
GET /orders/:id
Headers: Authorization: Bearer {token}

Response: {
  _id: "...",
  user: {
    _id: "...",
    name: "John Doe",
    email: "john@example.com"
  },
  orderItems: [
    {
      product: "...",
      name: "Arsenal Home Jersey 2023-24",
      quantity: 1,
      price: 89.99,
      image: "...",
      selectedSize: "L",
      customName: "SAKA",
      customNumber: "7"
    }
  ],
  shippingAddress: {...},
  ... (full order object)
}

Errors:
  401 - Unauthorized
  403 - Forbidden (not order owner or admin)
  404 - Order not found
  500 - Server error
```

### Get All Orders (Admin Only)
```
GET /orders
Headers: Authorization: Bearer {token}

Response: [
  {
    _id: "...",
    user: {
      _id: "...",
      name: "John Doe",
      email: "john@example.com"
    },
    orderItems: [...],
    status: "pending",
    totalPrice: 108.99,
    createdAt: "...",
    ... (full order objects)
  },
  ...
]

Errors:
  401 - Unauthorized
  403 - Forbidden (not admin)
  500 - Server error
```

### Update Order Status (Admin Only)
```
PUT /orders/:id/status
Headers: Authorization: Bearer {token}
Body: {
  status: "shipped"  // pending, processing, shipped, delivered, cancelled
}

Response: {
  _id: "...",
  user: "...",
  orderItems: [...],
  status: "shipped",
  isDelivered: false,
  ... (updated order object)
}

Errors:
  401 - Unauthorized
  403 - Forbidden (not admin)
  404 - Order not found
  500 - Server error
```

When status is set to "delivered":
- `isDelivered` automatically set to `true`
- `deliveredAt` timestamp automatically added

---

## 📊 Query Examples

### Find all Arsenal home jerseys
```
GET /api/products?team=Arsenal&jerseyType=Home
```

### Find retro editions under $150
```
GET /api/products?isRetro=true&maxPrice=150
```

### Find Nike boots in size 10
```
GET /api/products?brand=Nike&category=Boots&size=10
```

### Search for Barcelona products
```
GET /api/products?q=Barcelona
```

### Find Premier League jerseys, sorted by price low to high
```
GET /api/products?league=Premier+League&category=Jerseys
# Then sort on frontend
```

---

## 🔄 Order Status Flow

```
PENDING → PROCESSING → SHIPPED → DELIVERED
   ↓
CANCELLED (can be set at any point)
```

Status meanings:
- **pending**: Order just created, awaiting fulfillment
- **processing**: Order being prepared for shipment
- **shipped**: Order has been shipped to customer
- **delivered**: Order received by customer
- **cancelled**: Order cancelled (refund issued)

---

## 📝 Data Model Reference

### Product Document
```javascript
{
  _id: ObjectId,
  name: String (required),
  price: Number (required),
  description: String,
  image: String (URL),
  category: String,
  
  // FOOTBALL ATTRIBUTES
  team: String,
  league: String,
  brand: String,
  season: String,
  jerseyType: String (Home/Away/Third),
  isRetro: Boolean,
  sizes: [String], // ["XS", "S", "M", "L", "XL", "XXL"]
  allowNameNumber: Boolean,
  
  countInStock: Number,
  
  // REVIEWS
  reviews: [
    {
      _id: ObjectId,
      user: ObjectId (ref User),
      name: String,
      rating: Number (1-5),
      comment: String,
      createdAt: Date,
      updatedAt: Date
    }
  ],
  rating: Number (average),
  numReviews: Number,
  
  createdAt: Date,
  updatedAt: Date
}
```

### Order Document
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref User, required),
  
  orderItems: [
    {
      _id: ObjectId,
      product: ObjectId (ref Product, required),
      name: String (required),
      quantity: Number (required),
      price: Number (required),
      image: String,
      
      // CUSTOMIZATION
      selectedSize: String,
      customName: String,
      customNumber: String
    }
  ],
  
  shippingAddress: {
    fullName: String (required),
    address: String (required),
    city: String (required),
    postalCode: String (required),
    phone: String (required)
  },
  
  paymentMethod: String (required, default: "Card"),
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String
  },
  
  itemsPrice: Number (required),
  taxPrice: Number (required),
  shippingPrice: Number (required),
  totalPrice: Number (required),
  
  isPaid: Boolean (default: false),
  paidAt: Date,
  
  isDelivered: Boolean (default: false),
  deliveredAt: Date,
  
  status: String (enum: pending/processing/shipped/delivered/cancelled, default: pending),
  
  createdAt: Date,
  updatedAt: Date
}
```

### User Document
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (hashed, required),
  role: String (enum: user/admin, default: user),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔒 Authentication

All protected endpoints require:
```
Headers: {
  Authorization: "Bearer {jwt_token}"
}
```

Token is returned on login/register and stored in localStorage.

Token expiry: 7 days

---

## ✅ Response Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (missing/invalid token) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found |
| 500 | Server Error |

---

## 🧪 Testing with cURL

### Create Product
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Arsenal Jersey",
    "price": 89.99,
    "team": "Arsenal",
    "league": "Premier League",
    "brand": "Adidas",
    "season": "2023-24",
    "jerseyType": "Home",
    "sizes": ["S", "M", "L", "XL"],
    "allowNameNumber": true,
    "countInStock": 50
  }'
```

### Get Products with Filter
```bash
curl http://localhost:5000/api/products?team=Arsenal&isRetro=false
```

### Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "orderItems": [...],
    "shippingAddress": {...},
    "paymentMethod": "Card",
    "itemsPrice": 89.99,
    "taxPrice": 9.00,
    "shippingPrice": 10.00,
    "totalPrice": 108.99
  }'
```

---

## 📞 Common Issues

### 401 Unauthorized
- Token missing or expired
- Solution: Login again to get new token

### 403 Forbidden
- User is not admin
- Solution: Update user role to "admin" in MongoDB

### 400 Bad Request
- Missing required fields
- Invalid data types
- Solution: Check request body matches schema

### 404 Not Found
- Product/Order doesn't exist
- Solution: Check ID is correct

---

Refer to this when:
- Building frontend API calls
- Debugging endpoint issues
- Understanding data structures
- Testing with external tools
- Writing integration tests
