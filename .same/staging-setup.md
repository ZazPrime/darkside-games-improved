# Staging Environment Setup Guide

## 🎯 Overview

This guide helps you set up a staging environment to safely test the Darkside Games Shopify theme before going live.

## 📋 Prerequisites

- Shopify Partner Account (free)
- GitHub repository access
- Basic understanding of Shopify admin

## 🏗️ Step 1: Create Development Store

### Option A: Shopify Partner Dashboard
1. Go to [partners.shopify.com](https://partners.shopify.com)
2. Click **"Stores"** > **"Add store"**
3. Choose **"Development store"**
4. Store details:
   - **Store name**: `darkside-games-staging`
   - **Store URL**: `darkside-games-staging.myshopify.com`
   - **Purpose**: Testing theme and functionality
   - **Build for**: Yourself or clients

### Option B: Direct Development Store
1. Visit [accounts.shopify.com/store-create](https://accounts.shopify.com/store-create)
2. Create with trial account (no credit card required)
3. Use prefix `staging-` for clear identification

## 🚀 Step 2: Deploy Theme to Staging

### Method 1: GitHub Integration (Recommended)
```bash
# Create staging branch
git checkout -b staging
git push origin staging
```

In Shopify Admin:
1. **Online Store** > **Themes**
2. **Connect from GitHub**
3. Repository: `ZazPrime/darkside-games-improved`
4. Branch: `staging`
5. **Install**

### Method 2: Theme Inspector for Chrome
1. Install [Shopify Theme Inspector](https://chrome.google.com/webstore/detail/shopify-theme-inspector/fndnankcflemoafdeboboehphmiijkgp)
2. Enable **Local development**
3. Connect to staging store

## 🔧 Step 3: Basic Configuration

### Navigation Setup
```
Main Menu Structure:
├── Shop
│   ├── Magic: The Gathering
│   ├── Pokemon TCG
│   ├── One Piece TCG
│   ├── Flesh & Blood
│   ├── Lorcana
│   └── Gaming Supplies
├── Events
├── Sell Your Cards
└── About
```

### Create Test Collections
1. **magic-the-gathering**: Handle = `magic-the-gathering`
2. **pokemon**: Handle = `pokemon`
3. **one-piece**: Handle = `one-piece`
4. **flesh-blood**: Handle = `flesh-blood`
5. **lorcana**: Handle = `lorcana`
6. **gaming-supplies**: Handle = `gaming-supplies`

## 📦 Step 4: Test Data Setup

### Sample Products Structure
Create these test products for each collection:

#### Magic: The Gathering
- **Lightning Bolt** (Multiple conditions)
- **Black Lotus** (High-value test)
- **Booster Pack - March of the Machine**

#### Pokemon TCG
- **Pikachu VMAX** (Multiple conditions)
- **Charizard ex** (High-value test)
- **Booster Pack - Paldea Evolved**

### Card Conditions Setup
For each card product, create variants:
- **NM (Near Mint)**: $X.XX
- **LP (Lightly Played)**: $X.XX × 0.9
- **MP (Moderately Played)**: $X.XX × 0.8
- **HP (Heavily Played)**: $X.XX × 0.7
- **DM (Damaged)**: $X.XX × 0.5

## 🧪 Step 5: Testing Checklist

### Theme Functionality
- [ ] Homepage loads correctly
- [ ] Navigation menu works
- [ ] Product pages display properly
- [ ] Cart functionality works
- [ ] Search function operates
- [ ] Mobile responsiveness
- [ ] Dark theme displays correctly

### E-commerce Features
- [ ] Add to cart works
- [ ] Quantity adjustments
- [ ] Variant selection (card conditions)
- [ ] Checkout process
- [ ] Customer account creation
- [ ] Newsletter signup

### Performance Testing
- [ ] Page load speeds < 3 seconds
- [ ] Image optimization working
- [ ] CSS/JS minification
- [ ] Mobile page speed

## 🔄 Step 6: Staging Workflow

### Development Cycle
1. **Make changes** in local development
2. **Commit to staging branch**
3. **Test in staging store**
4. **Get approval/feedback**
5. **Merge to main branch**
6. **Deploy to production**

### Version Control
```bash
# Work on features
git checkout -b feature/card-comparison
# ... make changes ...
git commit -m "Add card condition comparison feature"

# Merge to staging for testing
git checkout staging
git merge feature/card-comparison
git push origin staging

# After testing approval
git checkout main
git merge staging
git push origin main
```

## 🚨 Important Notes

### Staging Store Limitations
- **Development stores expire** after 60 days without activity
- **Payment processing** is in test mode only
- **App installations** may have restrictions
- **Theme access** is the same as production

### Security Considerations
- **Never use real customer data** in staging
- **Use test payment information** only
- **Keep staging URLs private**
- **Regular cleanup** of test data

## 📊 Monitoring & Analytics

### Testing Tools
- **Google PageSpeed Insights**: Performance testing
- **GTmetrix**: Load time analysis
- **Shopify Theme Inspector**: Debug theme issues
- **Mobile-Friendly Test**: Mobile optimization

### Analytics Setup (Optional)
- **Google Analytics 4**: User behavior tracking
- **Google Tag Manager**: Event tracking
- **Hotjar**: User session recordings
- **Shopify Analytics**: Built-in reporting

## 🎉 Go-Live Checklist

Before moving from staging to production:

### Final Checks
- [ ] All theme sections working
- [ ] Product imports completed
- [ ] Payment processing configured
- [ ] Shipping zones set up
- [ ] Tax settings configured
- [ ] Legal pages created (Privacy, Terms, etc.)
- [ ] Domain connected
- [ ] SSL certificate active
- [ ] Email notifications configured
- [ ] Social media links updated

### Backup Plan
- [ ] **Theme backup** of current live site
- [ ] **Product export** backup
- [ ] **Customer data** backup
- [ ] **Rollback procedure** documented

---

**Next Steps**: Follow the product import templates and API integration guides for full functionality.
