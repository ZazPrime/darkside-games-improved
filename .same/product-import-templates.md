# Product Import Templates

## 🎯 Overview

This document provides CSV templates and import strategies for migrating existing inventory from BinderPOS to Shopify, specifically designed for trading card game stores.

## 📊 CSV Template Structure

### Master Product Import Template

**File**: `product-import-template.csv`

| Column | Required | Description | Example |
|--------|----------|-------------|---------|
| Handle | Yes | Unique product identifier | `lightning-bolt-mtg` |
| Title | Yes | Product name | `Lightning Bolt` |
| Body (HTML) | No | Product description | `Classic red instant spell` |
| Vendor | No | Card manufacturer | `Wizards of the Coast` |
| Product Type | Yes | Product category | `Magic: The Gathering` |
| Tags | No | Search tags | `red, instant, damage, classic` |
| Published | Yes | Visibility status | `TRUE` |
| Option1 Name | Yes | First variant option | `Condition` |
| Option1 Value | Yes | Variant value | `Near Mint` |
| Option2 Name | No | Second variant option | `Set` |
| Option2 Value | No | Second variant value | `Alpha` |
| Variant SKU | Yes | Stock keeping unit | `LB-MTG-NM-001` |
| Variant Grams | No | Weight in grams | `1` |
| Variant Inventory Tracker | Yes | Track inventory | `shopify` |
| Variant Inventory Qty | Yes | Stock quantity | `5` |
| Variant Inventory Policy | Yes | When out of stock | `deny` |
| Variant Fulfillment Service | Yes | Fulfillment method | `manual` |
| Variant Price | Yes | Selling price | `5.99` |
| Variant Compare At Price | No | Original price | `7.99` |
| Variant Requires Shipping | Yes | Shipping required | `TRUE` |
| Variant Taxable | Yes | Subject to tax | `TRUE` |
| Variant Barcode | No | Product barcode | `123456789012` |
| Image Src | No | Product image URL | `https://example.com/image.jpg` |
| Image Position | No | Image order | `1` |
| Image Alt Text | No | Alt text for image | `Lightning Bolt card` |
| Gift Card | No | Is gift card | `FALSE` |
| SEO Title | No | Meta title | `Lightning Bolt - Magic: The Gathering` |
| SEO Description | No | Meta description | `Buy Lightning Bolt MTG card` |
| Google Shopping Category | No | Google category | `Toys & Games > Games > Card Games` |
| Gender | No | Target gender | `` |
| Age Group | No | Target age | `Adult` |
| MPN | No | Manufacturer part number | `MTG-LB-001` |
| Condition | No | Card condition | `Near Mint` |
| Cost per item | No | Cost price | `2.50` |

## 📦 Product Type Templates

### Magic: The Gathering Template

**File**: `mtg-import-template.csv`

```csv
Handle,Title,Body (HTML),Vendor,Product Type,Tags,Published,Option1 Name,Option1 Value,Option2 Name,Option2 Value,Variant SKU,Variant Inventory Qty,Variant Price,Variant Compare At Price,Image Src,Condition,Cost per item
lightning-bolt-mtg,Lightning Bolt,"<p>Lightning Bolt is one of the most iconic and powerful red instant spells in Magic: The Gathering. Deal 3 damage to any target for just 1 red mana.</p><p><strong>Card Details:</strong></p><ul><li>Mana Cost: R</li><li>Type: Instant</li><li>Rarity: Common</li><li>Set: Various</li></ul>",Wizards of the Coast,Magic: The Gathering,"red,instant,damage,classic,burn",TRUE,Condition,Near Mint,Set,Alpha,LB-MTG-NM-ALP,3,45.99,49.99,https://cards.scryfall.io/normal/front/c/e/ce711943-c1a1-43a0-8b89-8d169cfb8e06.jpg,Near Mint,25.00
lightning-bolt-mtg,Lightning Bolt,"<p>Lightning Bolt is one of the most iconic and powerful red instant spells in Magic: The Gathering. Deal 3 damage to any target for just 1 red mana.</p><p><strong>Card Details:</strong></p><ul><li>Mana Cost: R</li><li>Type: Instant</li><li>Rarity: Common</li><li>Set: Various</li></ul>",Wizards of the Coast,Magic: The Gathering,"red,instant,damage,classic,burn",TRUE,Condition,Lightly Played,Set,Alpha,LB-MTG-LP-ALP,2,39.99,49.99,https://cards.scryfall.io/normal/front/c/e/ce711943-c1a1-43a0-8b89-8d169cfb8e06.jpg,Lightly Played,25.00
black-lotus-mtg,Black Lotus,"<p>Black Lotus is the most valuable and powerful card in Magic: The Gathering history. Add three mana of any one color.</p><p><strong>Card Details:</strong></p><ul><li>Mana Cost: 0</li><li>Type: Artifact</li><li>Rarity: Rare</li><li>Set: Alpha/Beta/Unlimited</li></ul>",Wizards of the Coast,Magic: The Gathering,"artifact,mana,power nine,vintage,valuable",TRUE,Condition,Near Mint,Set,Alpha,BL-MTG-NM-ALP,1,25000.00,30000.00,https://cards.scryfall.io/normal/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg,Near Mint,20000.00
```

### Pokemon TCG Template

**File**: `pokemon-import-template.csv`

```csv
Handle,Title,Body (HTML),Vendor,Product Type,Tags,Published,Option1 Name,Option1 Value,Option2 Name,Option2 Value,Variant SKU,Variant Inventory Qty,Variant Price,Variant Compare At Price,Image Src,Condition,Cost per item
pikachu-vmax-pokemon,Pikachu VMAX,"<p>Pikachu VMAX is a powerful Electric-type Pokemon VMAX card. High HP and devastating attacks make this a tournament staple.</p><p><strong>Card Details:</strong></p><ul><li>HP: 310</li><li>Type: Electric</li><li>Rarity: Ultra Rare</li><li>Set: Vivid Voltage</li></ul>",Pokemon Company,Pokemon TCG,"electric,pikachu,vmax,ultra rare,tournament",TRUE,Condition,Near Mint,Set,Vivid Voltage,PIK-VMAX-NM-VV,8,25.99,29.99,https://images.pokemontcg.io/swsh4/188_hires.png,Near Mint,15.00
pikachu-vmax-pokemon,Pikachu VMAX,"<p>Pikachu VMAX is a powerful Electric-type Pokemon VMAX card. High HP and devastating attacks make this a tournament staple.</p><p><strong>Card Details:</strong></p><ul><li>HP: 310</li><li>Type: Electric</li><li>Rarity: Ultra Rare</li><li>Set: Vivid Voltage</li></ul>",Pokemon Company,Pokemon TCG,"electric,pikachu,vmax,ultra rare,tournament",TRUE,Condition,Lightly Played,Set,Vivid Voltage,PIK-VMAX-LP-VV,3,22.99,29.99,https://images.pokemontcg.io/swsh4/188_hires.png,Lightly Played,15.00
charizard-ex-pokemon,Charizard ex,"<p>Charizard ex is one of the most sought-after Pokemon cards. This Fire-type Pokemon ex delivers massive damage.</p><p><strong>Card Details:</strong></p><ul><li>HP: 330</li><li>Type: Fire</li><li>Rarity: Ultra Rare</li><li>Set: Obsidian Flames</li></ul>",Pokemon Company,Pokemon TCG,"fire,charizard,ex,ultra rare,popular",TRUE,Condition,Near Mint,Set,Obsidian Flames,CHAR-EX-NM-OF,2,89.99,99.99,https://images.pokemontcg.io/sv3pt5/125_hires.png,Near Mint,60.00
```

### Booster Packs Template

**File**: `booster-packs-template.csv`

```csv
Handle,Title,Body (HTML),Vendor,Product Type,Tags,Published,Variant SKU,Variant Inventory Qty,Variant Price,Image Src,Cost per item
mtg-march-machine-booster,March of the Machine Booster Pack,"<p>March of the Machine booster pack contains 15 Magic: The Gathering cards including 1 rare or mythic rare.</p><p><strong>Pack Contents:</strong></p><ul><li>15 Magic cards</li><li>1 Rare or Mythic Rare</li><li>3-4 Uncommons</li><li>10-11 Commons</li></ul>",Wizards of the Coast,Magic: The Gathering,"booster pack,march of the machine,sealed product",TRUE,MOM-BOOST-001,24,4.99,https://cards.scryfall.io/large/front/c/7/c74c8d0b-ae43-4b51-bce4-7e5f934f8d8b.jpg,2.80
pokemon-paldea-evolved-booster,Paldea Evolved Booster Pack,"<p>Paldea Evolved booster pack contains 11 Pokemon cards including rare cards and special art cards.</p><p><strong>Pack Contents:</strong></p><ul><li>11 Pokemon cards</li><li>1 Rare or better</li><li>3 Uncommons</li><li>7 Commons</li></ul>",Pokemon Company,Pokemon TCG,"booster pack,paldea evolved,sealed product",TRUE,PAL-EVO-BOOST-001,36,4.49,https://images.pokemontcg.io/sv2/logo.png,2.50
```

## 🔄 Import Processing Scripts

### CSV Validation Script

**File**: `validate-import.js`

```javascript
const fs = require('fs');
const csv = require('csv-parser');

function validateProductCSV(filePath) {
  const requiredColumns = [
    'Handle', 'Title', 'Product Type', 'Published',
    'Option1 Name', 'Option1 Value', 'Variant SKU',
    'Variant Inventory Qty', 'Variant Price'
  ];

  const results = [];
  const errors = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row, index) => {
        // Validate required columns
        const missingColumns = requiredColumns.filter(col => !row[col]);
        if (missingColumns.length > 0) {
          errors.push({
            row: index + 1,
            error: `Missing required columns: ${missingColumns.join(', ')}`
          });
        }

        // Validate price format
        if (row['Variant Price'] && isNaN(parseFloat(row['Variant Price']))) {
          errors.push({
            row: index + 1,
            error: 'Invalid price format'
          });
        }

        // Validate inventory quantity
        if (row['Variant Inventory Qty'] && isNaN(parseInt(row['Variant Inventory Qty']))) {
          errors.push({
            row: index + 1,
            error: 'Invalid inventory quantity'
          });
        }

        results.push(row);
      })
      .on('end', () => {
        resolve({ results, errors });
      })
      .on('error', reject);
  });
}

module.exports = { validateProductCSV };
```

### Bulk Import Script

**File**: `bulk-import.js`

```javascript
const Shopify = require('shopify-api-node');

const shopify = new Shopify({
  shopName: process.env.SHOPIFY_SHOP_NAME,
  accessToken: process.env.SHOPIFY_ACCESS_TOKEN
});

async function bulkImportProducts(csvData) {
  const batchSize = 50;
  const results = [];

  for (let i = 0; i < csvData.length; i += batchSize) {
    const batch = csvData.slice(i, i + batchSize);

    try {
      const batchResults = await Promise.all(
        batch.map(productData => createProduct(productData))
      );

      results.push(...batchResults);

      // Rate limiting - respect Shopify's API limits
      if (i + batchSize < csvData.length) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

    } catch (error) {
      console.error(`Batch import failed for batch starting at ${i}:`, error);
    }
  }

  return results;
}

async function createProduct(productData) {
  const product = {
    title: productData.Title,
    body_html: productData['Body (HTML)'],
    vendor: productData.Vendor,
    product_type: productData['Product Type'],
    tags: productData.Tags,
    published: productData.Published === 'TRUE',
    variants: [{
      option1: productData['Option1 Value'],
      option2: productData['Option2 Value'],
      sku: productData['Variant SKU'],
      inventory_quantity: parseInt(productData['Variant Inventory Qty']),
      price: parseFloat(productData['Variant Price']),
      compare_at_price: productData['Variant Compare At Price'] ?
        parseFloat(productData['Variant Compare At Price']) : null,
      requires_shipping: productData['Variant Requires Shipping'] === 'TRUE',
      taxable: productData['Variant Taxable'] === 'TRUE',
      inventory_management: 'shopify',
      inventory_policy: 'deny'
    }],
    options: [{
      name: productData['Option1 Name'],
      values: [productData['Option1 Value']]
    }],
    images: productData['Image Src'] ? [{
      src: productData['Image Src'],
      alt: productData['Image Alt Text'] || productData.Title
    }] : []
  };

  try {
    const result = await shopify.product.create(product);
    console.log(`Created product: ${result.title}`);
    return { success: true, product: result };
  } catch (error) {
    console.error(`Failed to create product ${productData.Title}:`, error);
    return { success: false, error: error.message, productData };
  }
}

module.exports = { bulkImportProducts };
```

## 🎮 Game-Specific Import Examples

### Complete MTG Collection Import

**File**: `mtg-complete-import.csv`

```csv
Handle,Title,Body (HTML),Vendor,Product Type,Tags,Published,Option1 Name,Option1 Value,Option2 Name,Option2 Value,Variant SKU,Variant Inventory Qty,Variant Price,Cost per item
ancestral-recall-mtg,Ancestral Recall,"<p>Ancestral Recall - Draw three cards for one blue mana. Part of the Power Nine.</p>",Wizards of the Coast,Magic: The Gathering,"blue,power nine,vintage,card draw",TRUE,Condition,Near Mint,Set,Alpha,AR-MTG-NM-ALP,1,8500.00,6000.00
time-walk-mtg,Time Walk,"<p>Time Walk - Take an extra turn for two mana. Another Power Nine card.</p>",Wizards of the Coast,Magic: The Gathering,"blue,power nine,vintage,extra turn",TRUE,Condition,Near Mint,Set,Alpha,TW-MTG-NM-ALP,1,4200.00,3000.00
mox-sapphire-mtg,Mox Sapphire,"<p>Mox Sapphire - Add one blue mana. Zero mana cost artifact from the Power Nine.</p>",Wizards of the Coast,Magic: The Gathering,"artifact,mox,power nine,vintage",TRUE,Condition,Lightly Played,Set,Alpha,MS-MTG-LP-ALP,1,3800.00,2800.00
```

### Pokemon Tournament Staples

**File**: `pokemon-tournament-import.csv`

```csv
Handle,Title,Body (HTML),Vendor,Product Type,Tags,Published,Option1 Name,Option1 Value,Variant SKU,Variant Inventory Qty,Variant Price,Cost per item
professor-research-pokemon,Professor's Research,"<p>Professor's Research - Discard your hand and draw 7 cards. Essential trainer card.</p>",Pokemon Company,Pokemon TCG,"trainer,supporter,staple,tournament",TRUE,Condition,Near Mint,PROF-RES-NM-001,20,2.99,1.50
ultra-ball-pokemon,Ultra Ball,"<p>Ultra Ball - Search your deck for a Pokemon. Tournament staple item card.</p>",Pokemon Company,Pokemon TCG,"item,search,staple,tournament",TRUE,Condition,Near Mint,ULTRA-BALL-NM-001,15,3.49,2.00
quick-ball-pokemon,Quick Ball,"<p>Quick Ball - Search for a Basic Pokemon if you play it first. Popular item card.</p>",Pokemon Company,Pokemon TCG,"item,search,basic,tournament",TRUE,Condition,Near Mint,QUICK-BALL-NM-001,12,1.99,1.25
```

## 📋 Import Checklist

### Pre-Import Preparation
- [ ] **Backup existing data** before import
- [ ] **Validate CSV format** using validation script
- [ ] **Test import** with small batch (5-10 products)
- [ ] **Verify image URLs** are accessible
- [ ] **Check pricing** for accuracy
- [ ] **Confirm inventory quantities**

### During Import
- [ ] **Monitor API rate limits** (2 calls per second max)
- [ ] **Log all errors** for review
- [ ] **Verify product creation** in Shopify admin
- [ ] **Check variant structure** is correct
- [ ] **Confirm image uploads**

### Post-Import Verification
- [ ] **Review all products** in Shopify admin
- [ ] **Test product pages** on storefront
- [ ] **Verify search functionality**
- [ ] **Check collection assignments**
- [ ] **Confirm inventory tracking**
- [ ] **Test cart and checkout** with sample products

## 🔧 Troubleshooting Common Issues

### Image Upload Problems
```javascript
// Fix for image upload issues
async function uploadProductImages(product, imageUrls) {
  const images = [];

  for (const [index, url] of imageUrls.entries()) {
    try {
      // Download and re-upload to Shopify
      const response = await fetch(url);
      const buffer = await response.buffer();

      const image = await shopify.productImage.create(product.id, {
        position: index + 1,
        attachment: buffer.toString('base64'),
        filename: `${product.handle}-${index + 1}.jpg`
      });

      images.push(image);
    } catch (error) {
      console.error(`Failed to upload image ${url}:`, error);
    }
  }

  return images;
}
```

### Inventory Sync Issues
```javascript
// Fix for inventory quantity sync
async function syncInventoryLevels(products) {
  for (const product of products) {
    for (const variant of product.variants) {
      try {
        await shopify.inventoryLevel.adjust({
          location_id: 'your-location-id',
          inventory_item_id: variant.inventory_item_id,
          available_adjustment: variant.inventory_quantity
        });
      } catch (error) {
        console.error(`Inventory sync failed for ${variant.sku}:`, error);
      }
    }
  }
}
```

---

**Usage**: Download the appropriate CSV template, fill with your product data, validate using the scripts, and import to Shopify using the bulk import tools.
