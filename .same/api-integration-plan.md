# BinderPOS + Shopify API Integration Plan

## 🎯 Overview

This document outlines the integration strategy between BinderPOS (Point of Sale system) and Shopify for real-time inventory synchronization and seamless operations.

## 📚 API Documentation & Endpoints

### BinderPOS API
**Base URL**: `https://api.binderpos.com/v1/`
**Authentication**: API Key + Secret (OAuth 2.0)

#### Key Endpoints
```
GET  /inventory/products          # Get all products
GET  /inventory/products/{id}     # Get specific product
POST /inventory/products          # Create product
PUT  /inventory/products/{id}     # Update product
GET  /inventory/conditions        # Get card conditions
GET  /inventory/stock             # Get stock levels
POST /inventory/stock/update      # Update stock levels
GET  /sales/transactions          # Get sales data
POST /webhooks/register           # Register webhooks
```

### Shopify API
**Base URL**: `https://{shop}.myshopify.com/admin/api/2024-01/`
**Authentication**: Private App Tokens or Public App OAuth

#### Key Endpoints
```
GET  /products.json               # Get all products
GET  /products/{id}.json          # Get specific product
POST /products.json               # Create product
PUT  /products/{id}.json          # Update product
GET  /inventory_levels.json       # Get inventory levels
POST /inventory_levels/adjust.json # Adjust inventory
GET  /webhooks.json               # Get webhooks
POST /webhooks.json               # Create webhook
```

## 🔄 Integration Architecture

### 1. Sync Service Overview
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   BinderPOS     │◄──►│  Sync Service   │◄──►│    Shopify      │
│   (POS System)  │    │  (Node.js/API)  │    │  (E-commerce)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                       ┌─────────────────┐
                       │    Database     │
                       │  (Sync Logs)    │
                       └─────────────────┘
```

### 2. Data Flow
```
BinderPOS Sale → Webhook → Sync Service → Shopify Inventory Update
Shopify Order → Webhook → Sync Service → BinderPOS Stock Deduction
```

## 🏗️ Implementation Phases

### Phase 1: Basic Product Sync (2-3 weeks)
**Goal**: One-way sync from BinderPOS to Shopify

#### Features
- **Product Creation**: Auto-create products in Shopify from BinderPOS
- **Inventory Sync**: Daily stock level synchronization
- **Price Updates**: Sync pricing changes
- **Product Information**: Sync descriptions, categories, images

#### Technical Requirements
```javascript
// Sample sync function
async function syncProducts() {
  const binderProducts = await binderPOS.getProducts();

  for (const product of binderProducts) {
    const shopifyProduct = await mapBinderToShopify(product);
    await shopify.createOrUpdateProduct(shopifyProduct);
  }
}
```

### Phase 2: Real-time Bidirectional Sync (3-4 weeks)
**Goal**: Real-time inventory updates both ways

#### Features
- **Webhook Integration**: Real-time updates via webhooks
- **Stock Reservations**: Handle cart reservations
- **Conflict Resolution**: Handle simultaneous updates
- **Error Handling**: Retry mechanisms and error logging

#### Webhook Setup
```javascript
// BinderPOS Webhook Handler
app.post('/webhooks/binderpos/inventory', async (req, res) => {
  const { product_id, new_stock, condition } = req.body;

  await shopify.updateInventoryLevel({
    inventory_item_id: product_id,
    available: new_stock,
    location_id: 'main-location'
  });

  res.status(200).json({ success: true });
});

// Shopify Webhook Handler
app.post('/webhooks/shopify/orders', async (req, res) => {
  const order = req.body;

  for (const lineItem of order.line_items) {
    await binderPOS.updateStock({
      product_id: lineItem.product_id,
      quantity: -lineItem.quantity
    });
  }

  res.status(200).json({ success: true });
});
```

### Phase 3: Advanced Features (4-5 weeks)
**Goal**: Advanced inventory management and analytics

#### Features
- **Card Condition Mapping**: Sync NM, LP, MP, HP, DM conditions
- **Bulk Operations**: Mass updates and imports
- **Reporting Dashboard**: Sync status and analytics
- **Automated Pricing**: Dynamic pricing based on market data

## 🗃️ Data Mapping Strategy

### Product Mapping
```javascript
const productMapping = {
  binderPOS: {
    id: 'product_id',
    name: 'product_name',
    description: 'product_description',
    category: 'game_type',
    condition: 'card_condition',
    price: 'sell_price',
    cost: 'cost_price',
    stock: 'quantity_available',
    sku: 'product_sku',
    image_url: 'image_path'
  },
  shopify: {
    id: 'id',
    title: 'title',
    body_html: 'body_html',
    product_type: 'product_type',
    variant: 'variants[].option1', // Condition
    price: 'variants[].price',
    cost: 'variants[].cost',
    inventory_quantity: 'variants[].inventory_quantity',
    sku: 'variants[].sku',
    image: 'images[].src'
  }
};
```

### Card Condition Mapping
```javascript
const conditionMapping = {
  'Near Mint': { binder: 'NM', shopify: 'Near Mint', multiplier: 1.0 },
  'Lightly Played': { binder: 'LP', shopify: 'Lightly Played', multiplier: 0.9 },
  'Moderately Played': { binder: 'MP', shopify: 'Moderately Played', multiplier: 0.8 },
  'Heavily Played': { binder: 'HP', shopify: 'Heavily Played', multiplier: 0.7 },
  'Damaged': { binder: 'DM', shopify: 'Damaged', multiplier: 0.5 }
};
```

## ⚡ Real-time Sync Implementation

### Webhook Configuration
```javascript
// Register BinderPOS Webhooks
const binderWebhooks = [
  {
    url: 'https://your-sync-service.com/webhooks/binderpos/inventory',
    events: ['inventory.updated', 'product.created', 'product.updated']
  },
  {
    url: 'https://your-sync-service.com/webhooks/binderpos/sales',
    events: ['sale.completed', 'sale.refunded']
  }
];

// Register Shopify Webhooks
const shopifyWebhooks = [
  {
    webhook: {
      topic: 'orders/create',
      address: 'https://your-sync-service.com/webhooks/shopify/orders',
      format: 'json'
    }
  },
  {
    webhook: {
      topic: 'inventory_levels/update',
      address: 'https://your-sync-service.com/webhooks/shopify/inventory',
      format: 'json'
    }
  }
];
```

### Sync Service Architecture
```javascript
// Express.js Sync Service
const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(require('./middleware/auth'));
app.use(require('./middleware/logging'));

// Routes
app.use('/webhooks/binderpos', require('./routes/binderpos-webhooks'));
app.use('/webhooks/shopify', require('./routes/shopify-webhooks'));
app.use('/sync', require('./routes/manual-sync'));
app.use('/dashboard', require('./routes/dashboard'));

// Error handling
app.use(require('./middleware/error-handler'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sync service running on port ${PORT}`);
});
```

## 🔐 Security & Authentication

### API Security
```javascript
// Environment Variables
const config = {
  binderPOS: {
    apiKey: process.env.BINDERPOS_API_KEY,
    apiSecret: process.env.BINDERPOS_API_SECRET,
    baseUrl: process.env.BINDERPOS_BASE_URL
  },
  shopify: {
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecret: process.env.SHOPIFY_API_SECRET,
    accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
    shop: process.env.SHOPIFY_SHOP_NAME
  }
};

// Webhook Verification
function verifyWebhook(req, res, next) {
  const signature = req.get('X-Shopify-Hmac-Sha256');
  const body = JSON.stringify(req.body);
  const hash = crypto
    .createHmac('sha256', config.shopify.apiSecret)
    .update(body, 'utf8')
    .digest('base64');

  if (signature === hash) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
}
```

## 📊 Monitoring & Logging

### Sync Dashboard Metrics
- **Sync Status**: Last successful sync timestamp
- **Error Rates**: Failed sync attempts and reasons
- **Data Volume**: Products synced, orders processed
- **Performance**: API response times, sync duration
- **Inventory Accuracy**: Stock level discrepancies

### Logging Strategy
```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'sync-error.log', level: 'error' }),
    new winston.transports.File({ filename: 'sync-combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// Usage
logger.info('Product sync started', {
  binderProductCount: products.length,
  timestamp: new Date().toISOString()
});
```

## 🚨 Error Handling & Recovery

### Retry Logic
```javascript
async function syncWithRetry(operation, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      logger.warn(`Sync attempt ${attempt} failed:`, error);

      if (attempt === maxRetries) {
        logger.error('Max retries exceeded:', error);
        throw error;
      }

      // Exponential backoff
      await new Promise(resolve =>
        setTimeout(resolve, Math.pow(2, attempt) * 1000)
      );
    }
  }
}
```

### Conflict Resolution
```javascript
async function resolveInventoryConflict(binderStock, shopifyStock, productId) {
  // Strategy: BinderPOS is source of truth for in-store sales
  // Shopify is source of truth for online sales

  const conflict = {
    productId,
    binderStock,
    shopifyStock,
    timestamp: new Date(),
    resolution: 'pending'
  };

  // Log conflict for manual review
  await logConflict(conflict);

  // Auto-resolve based on business rules
  if (binderStock < shopifyStock) {
    // Physical sale likely occurred, update Shopify
    await shopify.updateInventory(productId, binderStock);
    conflict.resolution = 'binder_priority';
  }

  return conflict;
}
```

## 🎯 Testing Strategy

### Unit Tests
```javascript
// Example test for product mapping
describe('Product Mapping', () => {
  test('should map BinderPOS product to Shopify format', () => {
    const binderProduct = {
      product_id: '12345',
      product_name: 'Lightning Bolt',
      card_condition: 'NM',
      sell_price: 5.99,
      quantity_available: 10
    };

    const shopifyProduct = mapBinderToShopify(binderProduct);

    expect(shopifyProduct.title).toBe('Lightning Bolt');
    expect(shopifyProduct.variants[0].option1).toBe('Near Mint');
    expect(shopifyProduct.variants[0].price).toBe('5.99');
  });
});
```

### Integration Tests
```javascript
// Test full sync workflow
describe('Full Sync Integration', () => {
  test('should sync inventory from BinderPOS to Shopify', async () => {
    // Mock BinderPOS response
    nock('https://api.binderpos.com')
      .get('/v1/inventory/products')
      .reply(200, mockBinderProducts);

    // Run sync
    await syncProducts();

    // Verify Shopify was updated
    const shopifyProducts = await shopify.getProducts();
    expect(shopifyProducts.length).toBe(mockBinderProducts.length);
  });
});
```

## 📈 Performance Optimization

### Batch Processing
```javascript
async function batchSync(products, batchSize = 50) {
  const batches = [];

  for (let i = 0; i < products.length; i += batchSize) {
    batches.push(products.slice(i, i + batchSize));
  }

  for (const batch of batches) {
    await Promise.all(
      batch.map(product => syncProduct(product))
    );

    // Rate limiting - respect API limits
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}
```

### Caching Strategy
```javascript
const Redis = require('redis');
const redis = Redis.createClient();

async function getCachedProduct(productId) {
  const cached = await redis.get(`product:${productId}`);
  if (cached) {
    return JSON.parse(cached);
  }

  const product = await binderPOS.getProduct(productId);
  await redis.setex(`product:${productId}`, 300, JSON.stringify(product)); // 5 min cache

  return product;
}
```

## 🚀 Deployment Plan

### Infrastructure Requirements
- **Server**: Node.js hosting (Heroku, AWS, DigitalOcean)
- **Database**: PostgreSQL for sync logs and cache
- **Redis**: Caching and session management
- **Monitoring**: Application monitoring (New Relic, DataDog)

### Environment Setup
```bash
# Production deployment
npm install
npm run build
npm run migrate
npm start

# Environment variables
BINDERPOS_API_KEY=your_key
SHOPIFY_API_KEY=your_key
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
```

---

**Next Steps**: Implement Phase 1 basic sync, then iterate through advanced features based on business needs and testing feedback.
