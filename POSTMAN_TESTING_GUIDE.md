# Material Master API - Postman Testing Guide

## Base URL
```
http://localhost:8000
```

Make sure your FastAPI server is running:
```bash
uvicorn app.main:app --reload
```

---

## 1. Create Material (POST)

**Endpoint:** `POST http://localhost:8000/v1/material-master/`

**Headers:**
```
Content-Type: application/json
```

**Request Body (JSON):**
```json
{
  "material_code": "MAT-001",
  "material_name": "Steel Rod",
  "description": "High-grade steel rod for construction",
  "category": "Raw Material",
  "unit_of_measure": "KG",
  "unit_price": 150.50,
  "stock_quantity": 1000.00,
  "min_stock_level": 100.00,
  "max_stock_level": 5000.00,
  "supplier_code": "SUP-001",
  "hsn_code": "7214",
  "tax_rate": 18.00,
  "is_active": true
}
```

**Expected Response (201 Created):**
```json
{
  "id": 1,
  "material_code": "MAT-001",
  "material_name": "Steel Rod",
  "description": "High-grade steel rod for construction",
  "category": "Raw Material",
  "unit_of_measure": "KG",
  "unit_price": 150.50,
  "stock_quantity": 1000.00,
  "min_stock_level": 100.00,
  "max_stock_level": 5000.00,
  "supplier_code": "SUP-001",
  "hsn_code": "7214",
  "tax_rate": 18.00,
  "is_active": true,
  "created_at": "2024-01-15T10:30:00",
  "updated_at": "2024-01-15T10:30:00",
  "created_by": null,
  "updated_by": null
}
```

**Minimal Request Body (only required fields):**
```json
{
  "material_code": "MAT-002",
  "material_name": "Aluminum Sheet",
  "unit_of_measure": "PCS"
}
```

---

## 2. Get All Materials (GET) - With Pagination

**Endpoint:** `GET http://localhost:8000/v1/material-master/`

**Query Parameters:**
- `page` (optional, default: 1) - Page number
- `page_size` (optional, default: 10, max: 100) - Items per page
- `search` (optional) - Search in material_code, name, or description
- `category` (optional) - Filter by category
- `is_active` (optional, true/false) - Filter by active status
- `min_stock` (optional, true) - Show only materials below minimum stock

**Examples:**

**Basic List:**
```
GET http://localhost:8000/v1/material-master/?page=1&page_size=10
```

**With Search:**
```
GET http://localhost:8000/v1/material-master/?search=steel&page=1&page_size=10
```

**Filter by Category:**
```
GET http://localhost:8000/v1/material-master/?category=Raw Material&page=1
```

**Filter Active Only:**
```
GET http://localhost:8000/v1/material-master/?is_active=true&page=1
```

**Low Stock Alert:**
```
GET http://localhost:8000/v1/material-master/?min_stock=true&page=1
```

**Expected Response (200 OK):**
```json
{
  "items": [
    {
      "id": 1,
      "material_code": "MAT-001",
      "material_name": "Steel Rod",
      ...
    }
  ],
  "total": 25,
  "page": 1,
  "page_size": 10,
  "total_pages": 3
}
```

---

## 3. Get Material by ID (GET)

**Endpoint:** `GET http://localhost:8000/v1/material-master/{material_id}`

**Example:**
```
GET http://localhost:8000/v1/material-master/1
```

**Expected Response (200 OK):**
```json
{
  "id": 1,
  "material_code": "MAT-001",
  "material_name": "Steel Rod",
  ...
}
```

**Error Response (404 Not Found):**
```json
{
  "detail": "Material with ID 999 not found"
}
```

---

## 4. Get Material by Code (GET)

**Endpoint:** `GET http://localhost:8000/v1/material-master/code/{material_code}`

**Example:**
```
GET http://localhost:8000/v1/material-master/code/MAT-001
```

**Expected Response (200 OK):**
```json
{
  "id": 1,
  "material_code": "MAT-001",
  "material_name": "Steel Rod",
  ...
}
```

---

## 5. Update Material (PUT)

**Endpoint:** `PUT http://localhost:8000/v1/material-master/{material_id}`

**Headers:**
```
Content-Type: application/json
```

**Request Body (JSON) - All fields optional:**
```json
{
  "material_name": "Steel Rod - Premium Grade",
  "description": "Updated description",
  "unit_price": 175.00,
  "stock_quantity": 1500.00,
  "is_active": true
}
```

**Example:**
```
PUT http://localhost:8000/v1/material-master/1
```

**Expected Response (200 OK):**
```json
{
  "id": 1,
  "material_code": "MAT-001",
  "material_name": "Steel Rod - Premium Grade",
  "unit_price": 175.00,
  ...
}
```

---

## 6. Update Stock (PATCH)

**Endpoint:** `PATCH http://localhost:8000/v1/material-master/{material_id}/stock`

**Query Parameters:**
- `quantity` (required) - Quantity value
- `operation` (optional, default: "set") - Operation type: "set", "add", or "subtract"

**Examples:**

**Set Stock:**
```
PATCH http://localhost:8000/v1/material-master/1/stock?quantity=2000&operation=set
```

**Add Stock:**
```
PATCH http://localhost:8000/v1/material-master/1/stock?quantity=500&operation=add
```

**Subtract Stock:**
```
PATCH http://localhost:8000/v1/material-master/1/stock?quantity=100&operation=subtract
```

**Expected Response (200 OK):**
```json
{
  "id": 1,
  "material_code": "MAT-001",
  "stock_quantity": 2000.00,
  ...
}
```

**Error Response (400 Bad Request) - Insufficient Stock:**
```json
{
  "detail": "Insufficient stock quantity"
}
```

---

## 7. Delete Material (DELETE)

**Endpoint:** `DELETE http://localhost:8000/v1/material-master/{material_id}`

**Query Parameters:**
- `hard_delete` (optional, default: false) - If true, permanently delete

**Examples:**

**Soft Delete (default - sets is_active=false):**
```
DELETE http://localhost:8000/v1/material-master/1
```

**Hard Delete (permanent):**
```
DELETE http://localhost:8000/v1/material-master/1?hard_delete=true
```

**Expected Response (204 No Content):**
No response body, just status 204.

**Error Response (404 Not Found):**
```json
{
  "detail": "Material with ID 999 not found"
}
```

---

## Postman Collection Setup

### Step 1: Create a New Collection
1. Open Postman
2. Click "New" → "Collection"
3. Name it "Material Master API"

### Step 2: Create Environment Variables (Optional but Recommended)
1. Click "Environments" → "Create Environment"
2. Add variables:
   - `base_url`: `http://localhost:8000`
   - `material_id`: `1` (will be updated after creating)

### Step 3: Create Requests

**For each endpoint:**
1. Click "New" → "HTTP Request"
2. Set method (GET, POST, PUT, PATCH, DELETE)
3. Enter URL (use `{{base_url}}` if using environment)
4. For POST/PUT: Go to "Body" tab → Select "raw" → Choose "JSON"
5. Paste the request body
6. Click "Save" to add to collection

### Step 4: Test Flow Example

1. **Create Material** → Save `id` from response
2. **Get All Materials** → Verify it appears in list
3. **Get by ID** → Use saved `id`
4. **Update Material** → Use saved `id`
5. **Update Stock** → Use saved `id`
6. **Get by Code** → Use material_code from created material
7. **Delete Material** → Use saved `id`

---

## Common Error Responses

### 400 Bad Request - Duplicate Material Code
```json
{
  "detail": "Material with code 'MAT-001' already exists"
}
```

### 404 Not Found
```json
{
  "detail": "Material with ID 999 not found"
}
```

### 422 Validation Error
```json
{
  "detail": [
    {
      "loc": ["body", "material_code"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

---

## Quick Test Script

You can also test using `curl` commands:

```bash
# Create Material
curl -X POST "http://localhost:8000/v1/material-master/" \
  -H "Content-Type: application/json" \
  -d '{
    "material_code": "MAT-001",
    "material_name": "Steel Rod",
    "unit_of_measure": "KG",
    "unit_price": 150.50,
    "stock_quantity": 1000.00
  }'

# Get All Materials
curl "http://localhost:8000/v1/material-master/?page=1&page_size=10"

# Get by ID
curl "http://localhost:8000/v1/material-master/1"

# Update Material
curl -X PUT "http://localhost:8000/v1/material-master/1" \
  -H "Content-Type: application/json" \
  -d '{
    "material_name": "Updated Name",
    "unit_price": 175.00
  }'

# Update Stock
curl -X PATCH "http://localhost:8000/v1/material-master/1/stock?quantity=1500&operation=add"

# Delete Material
curl -X DELETE "http://localhost:8000/v1/material-master/1"
```

---

## Interactive API Documentation

FastAPI automatically generates interactive API docs:

**Swagger UI:**
```
http://localhost:8000/docs
```

**ReDoc:**
```
http://localhost:8000/redoc
```

You can test all endpoints directly from the browser using these interactive docs!

