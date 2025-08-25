# Darkside Games Shopify Theme

A modern, dark-themed Shopify theme designed specifically for trading card game stores.

## 🎮 Theme Features

### Design
- **Dark Gaming Aesthetic**: Modern dark theme with red accents
- **Fully Responsive**: Optimized for desktop, tablet, and mobile
- **Card-Based Layouts**: Modern UI components throughout
- **Custom Typography**: Clean, readable fonts optimized for gaming content

### E-commerce Functionality
- **Product Collections**: Organized by game type (MTG, Pokemon, One Piece, etc.)
- **Variant Support**: Handle different card conditions (NM, LP, MP, HP, DM)
- **Shopping Cart**: Interactive cart with quantity controls
- **Product Search**: Fast search with predictive results
- **Customer Accounts**: User registration and login

### Store Features
- **Store Information**: Hours, location, contact details
- **Newsletter Signup**: Email collection with custom messaging
- **Social Media Integration**: Links to all your social platforms
- **SEO Optimized**: Meta tags, structured data, and search optimization

## 📦 Installation via GitHub Integration

This branch is specifically formatted for Shopify's GitHub integration:

1. **In Shopify Admin**: Go to Online Store > Themes
2. **Connect to GitHub**: Click "Connect from GitHub"
3. **Select Repository**: Choose `ZazPrime/darkside-games-improved`
4. **Select Branch**: Choose `shopify-theme` (this branch)
5. **Install**: Shopify will automatically sync the theme

## 🛠️ Configuration

### Required Setup

#### 1. Navigation Menu
Create a main menu with the following structure:
- **Shop** (with submenu)
  - Magic: The Gathering
  - Pokemon
  - One Piece TCG
  - Flesh & Blood
  - Lorcana
  - Gaming Supplies
- **Events**
- **Sell Your Cards**
- **About**

#### 2. Collections
Create collections for each game type:
- `magic-the-gathering`
- `pokemon`
- `one-piece`
- `flesh-blood`
- `lorcana`
- `gaming-supplies`

#### 3. Product Setup
For card condition variants:
1. Create option sets for "Condition"
2. Add variants: NM, LP, MP, HP, DM
3. Set different prices for each condition

## 🎨 Customization

### Theme Settings
Access customization options in the theme editor:

#### Colors
- Primary accent color (default: red)
- Secondary accent color
- Background colors
- Text colors

#### Store Information
- Store address
- Phone number
- Email address
- Store hours
- Social media links

## 🎯 Gaming Store Specific Features

### Product Categories
The theme is optimized for these TCG categories:
- Magic: The Gathering (Singles, Booster Packs, Commander Decks)
- Pokemon TCG (Singles, Booster Packs, Elite Trainer Boxes)
- One Piece TCG (Starter Decks, Booster Packs)
- Flesh & Blood (Blitz Decks, Booster Packs)
- Lorcana (Starter Decks, Booster Packs)
- Gaming Supplies (Sleeves, Deck Boxes, Playmats)

### Card Condition Support
- **NM (Near Mint)**: Perfect condition
- **LP (Lightly Played)**: Minor wear
- **MP (Moderately Played)**: Moderate wear
- **HP (Heavily Played)**: Heavy wear
- **DM (Damaged)**: Significant damage

## 📁 Theme Structure

```
├── assets/              # CSS, JavaScript, and other assets
├── config/              # Theme settings and configuration
├── layout/              # Theme layout files
├── locales/             # Translation files
├── sections/            # Reusable page sections
├── snippets/            # Small reusable components
└── templates/           # Page templates
```

## 🔧 Development

This theme is built with:
- **Shopify Liquid** templating language
- **Modern CSS** with custom properties
- **Vanilla JavaScript** for interactions
- **Mobile-first** responsive design

## 📞 Support

For technical support with this theme:
- Review Shopify's official theme documentation
- Check the main repository for additional documentation
- Contact your development team for custom modifications

---

**Theme Version**: 1.0.0
**Compatible with**: Shopify 2.0+
**Main Repository**: https://github.com/ZazPrime/darkside-games-improved

Built with ❤️ for the gaming community 🎮
