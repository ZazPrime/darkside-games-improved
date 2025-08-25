/**
 * Darkside Games Theme JavaScript
 */

class DarksideTheme {
  constructor() {
    this.init();
  }

  init() {
    this.initMobileMenu();
    this.initCartDrawer();
    this.initProductForms();
    this.initSearch();
    this.initScrollEffects();
    this.initNewsletterForm();
  }

  initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
      mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-open');
        document.body.classList.toggle('mobile-menu-open');
      });
    }
  }

  initCartDrawer() {
    const cartButton = document.querySelector('#cart-icon-bubble');

    if (cartButton) {
      cartButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.openCartDrawer();
      });
    }

    // Update cart count on page load
    this.updateCartCount();
  }

  async openCartDrawer() {
    try {
      const response = await fetch('/cart.js');
      const cart = await response.json();
      console.log('Cart contents:', cart);
      // For now, redirect to cart page
      window.location.href = '/cart';
    } catch (error) {
      console.error('Error fetching cart:', error);
      window.location.href = '/cart';
    }
  }

  updateCartCount() {
    fetch('/cart.js')
      .then(response => response.json())
      .then(cart => {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
          cartCount.textContent = cart.item_count;
          cartCount.style.display = cart.item_count > 0 ? 'flex' : 'none';
        }
      })
      .catch(error => console.error('Error updating cart count:', error));
  }

  initProductForms() {
    const productForms = document.querySelectorAll('form[action*="/cart/add"]');

    productForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.addToCart(form);
      });
    });
  }

  async addToCart(form) {
    const formData = new FormData(form);
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;

    try {
      button.textContent = 'Adding...';
      button.disabled = true;

      const response = await fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        button.textContent = 'Added!';
        this.updateCartCount();
        this.showNotification('Item added to cart!', 'success');

        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
        }, 2000);
      } else {
        throw new Error('Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      button.textContent = 'Error';
      this.showNotification('Error adding item to cart', 'error');

      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 2000);
    }
  }

  initSearch() {
    const searchForm = document.querySelector('.search-bar form');
    const searchInput = document.querySelector('.search-input');

    if (searchInput) {
      searchInput.addEventListener('focus', () => {
        searchInput.parentElement.classList.add('search-focused');
      });

      searchInput.addEventListener('blur', () => {
        searchInput.parentElement.classList.remove('search-focused');
      });
    }
  }

  initScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      if (header) {
        if (currentScrollY > 100) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          header.classList.add('header-hidden');
        } else {
          header.classList.remove('header-hidden');
        }
      }

      lastScrollY = currentScrollY;
    });
  }

  initNewsletterForm() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');

    newsletterForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitNewsletterForm(form);
      });
    });
  }

  async submitNewsletterForm(form) {
    const email = form.querySelector('input[type="email"]').value;
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;

    try {
      button.textContent = 'Subscribing...';
      button.disabled = true;

      // Simulate API call (replace with actual newsletter service)
      await new Promise(resolve => setTimeout(resolve, 1000));

      button.textContent = 'Subscribed!';
      this.showNotification('Successfully subscribed to newsletter!', 'success');
      form.reset();

      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 2000);
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      button.textContent = 'Error';
      this.showNotification('Error subscribing to newsletter', 'error');

      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 2000);
    }
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? 'rgb(34 197 94)' : type === 'error' ? 'rgb(239 68 68)' : 'rgb(59 130 246)'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      z-index: 1000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      max-width: 300px;
    `;

    notification.textContent = message;
    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 10);

    // Remove notification
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
}

// Utility functions
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Wishlist functionality
class WishlistManager {
  constructor() {
    this.storageKey = 'darkside_wishlist';
    this.wishlist = this.loadWishlist();
    this.init();
  }

  init() {
    this.updateWishlistCount();
    this.bindWishlistEvents();
    this.updateWishlistIcons();
  }

  loadWishlist() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    } catch {
      return [];
    }
  }

  saveWishlist() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.wishlist));
    this.updateWishlistCount();
    this.updateWishlistIcons();
  }

  addToWishlist(product) {
    if (!this.isInWishlist(product.handle)) {
      this.wishlist.push({
        handle: product.handle,
        title: product.title,
        image: product.image,
        price: product.price,
        vendor: product.vendor,
        dateAdded: new Date().toISOString()
      });
      this.saveWishlist();
      return true;
    }
    return false;
  }

  removeFromWishlist(handle) {
    const index = this.wishlist.findIndex(item => item.handle === handle);
    if (index > -1) {
      this.wishlist.splice(index, 1);
      this.saveWishlist();
      return true;
    }
    return false;
  }

  isInWishlist(handle) {
    return this.wishlist.some(item => item.handle === handle);
  }

  updateWishlistCount() {
    const countElements = document.querySelectorAll('.wishlist-count');
    countElements.forEach(el => el.textContent = this.wishlist.length);
  }

  updateWishlistIcons() {
    const heartIcons = document.querySelectorAll('.wishlist-heart');
    heartIcons.forEach(icon => {
      const handle = icon.dataset.productHandle;
      icon.classList.toggle('active', this.isInWishlist(handle));
    });
  }

  bindWishlistEvents() {
    document.addEventListener('click', (e) => {
      if (e.target.matches('.wishlist-heart') || e.target.closest('.wishlist-heart')) {
        e.preventDefault();
        const button = e.target.matches('.wishlist-heart') ? e.target : e.target.closest('.wishlist-heart');
        this.toggleWishlist(button);
      }
    });
  }

  toggleWishlist(button) {
    const productData = {
      handle: button.dataset.productHandle,
      title: button.dataset.productTitle,
      image: button.dataset.productImage,
      price: button.dataset.productPrice,
      vendor: button.dataset.productVendor
    };

    if (this.isInWishlist(productData.handle)) {
      this.removeFromWishlist(productData.handle);
      this.showNotification('Removed from wishlist');
    } else {
      this.addToWishlist(productData);
      this.showNotification('Added to wishlist');
    }
  }

  showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'wishlist-notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 2rem;
      right: 2rem;
      background: rgb(239 68 68);
      color: white;
      padding: 1rem 2rem;
      border-radius: 0.5rem;
      z-index: 10000;
      opacity: 0;
      transform: translateY(-1rem);
      transition: all 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateY(0)';
    }, 10);

    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(-1rem)';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// Card Condition Comparison
class ConditionComparison {
  constructor() {
    this.searchInput = document.getElementById('comparison-search');
    this.searchResults = document.getElementById('search-results');
    this.comparisonTable = document.getElementById('comparison-table');
    this.init();
  }

  init() {
    if (!this.searchInput) return;

    let searchTimeout;
    this.searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      const query = e.target.value.trim();

      if (query.length < 2) {
        this.hideSearchResults();
        return;
      }

      searchTimeout = setTimeout(() => this.searchProducts(query), 300);
    });

    document.addEventListener('click', (e) => {
      if (!this.searchResults?.contains(e.target) && !this.searchInput?.contains(e.target)) {
        this.hideSearchResults();
      }
    });
  }

  async searchProducts(query) {
    try {
      const response = await fetch(`/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=8`);
      const data = await response.json();
      this.displaySearchResults(data.resources?.results?.products || []);
    } catch (error) {
      console.error('Search error:', error);
    }
  }

  displaySearchResults(products) {
    if (!this.searchResults || products.length === 0) {
      this.hideSearchResults();
      return;
    }

    const resultsHTML = products.map(product => `
      <div class="search-result-item" data-product-handle="${product.handle}">
        <img src="${product.featured_image || '/assets/placeholder.svg'}" alt="${product.title}" class="search-result-image">
        <div class="search-result-info">
          <h4>${product.title}</h4>
          <p>${product.product_type} • ${product.variants?.length || 0} variants</p>
        </div>
      </div>
    `).join('');

    this.searchResults.innerHTML = resultsHTML;
    this.searchResults.style.display = 'block';

    this.searchResults.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        this.loadProductComparison(item.dataset.productHandle);
        this.hideSearchResults();
        this.searchInput.value = '';
      });
    });
  }

  hideSearchResults() {
    if (this.searchResults) {
      this.searchResults.style.display = 'none';
    }
  }

  async loadProductComparison(handle) {
    try {
      const response = await fetch(`/products/${handle}.js`);
      const product = await response.json();
      this.displayProductComparison(product);
      if (this.comparisonTable) {
        this.comparisonTable.style.display = 'block';
      }
    } catch (error) {
      console.error('Error loading product:', error);
    }
  }

  displayProductComparison(product) {
    const cardImage = document.getElementById('selected-card-image');
    const cardDetails = document.getElementById('selected-card-details');
    const variantsList = document.getElementById('condition-variants-list');

    if (cardImage) {
      cardImage.innerHTML = `<img src="${product.featured_image || '/assets/placeholder.svg'}" alt="${product.title}">`;
    }

    if (cardDetails) {
      cardDetails.innerHTML = `
        <h3>${product.title}</h3>
        <p><strong>Type:</strong> ${product.product_type}</p>
        <p><strong>Vendor:</strong> ${product.vendor}</p>
      `;
    }

    if (variantsList) {
      const conditions = ['Near Mint', 'Lightly Played', 'Moderately Played', 'Heavily Played', 'Damaged'];
      const variantsHTML = conditions.map(condition => {
        const variant = product.variants.find(v =>
          v.option1 === condition || v.title.includes(condition)
        );

        if (!variant) {
          return `
            <div class="condition-variant">
              <div class="condition-name">${condition}</div>
              <div class="condition-price">—</div>
              <div class="condition-stock out-of-stock">Not Available</div>
              <div class="condition-action">
                <button class="btn btn--secondary" disabled>Unavailable</button>
              </div>
            </div>
          `;
        }

        const stockLevel = variant.inventory_quantity || 0;
        const stockClass = stockLevel === 0 ? 'out-of-stock' : stockLevel <= 3 ? 'low-stock' : 'in-stock';
        const stockText = stockLevel === 0 ? 'Out of Stock' : stockLevel <= 3 ? `${stockLevel} left` : 'In Stock';

        return `
          <div class="condition-variant">
            <div class="condition-name">${condition}</div>
            <div class="condition-price">${(variant.price / 100).toFixed(2)}</div>
            <div class="condition-stock ${stockClass}">${stockText}</div>
            <div class="condition-action">
              <button class="btn btn--primary"
                      ${stockLevel === 0 ? 'disabled' : ''}
                      onclick="addVariantToCart(${variant.id})">
                ${stockLevel === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        `;
      }).join('');

      variantsList.innerHTML = variantsHTML;
    }
  }
}

// Global function for adding variants to cart
window.addVariantToCart = async function(variantId) {
  try {
    const response = await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ id: variantId, quantity: 1 }] })
    });

    if (response.ok) {
      const button = event.target;
      const originalText = button.textContent;
      button.textContent = 'Added!';
      button.disabled = true;

      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 2000);

      // Update cart count
      const theme = new DarksideTheme();
      theme.updateCartCount();
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};

// Initialize theme when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new DarksideTheme();
  new WishlistManager();
  new ConditionComparison();
});

// Additional CSS for enhanced functionality
const additionalStyles = `
  .search-focused {
    box-shadow: 0 0 0 2px rgb(239 68 68) !important;
  }

  .header.scrolled {
    background: rgba(15, 23, 42, 0.98) !important;
    backdrop-filter: blur(20px) !important;
  }

  .header-hidden {
    transform: translateY(-100%) !important;
  }

  .mobile-menu-open {
    overflow: hidden;
  }

  @media (max-width: 768px) {
    .nav-menu.mobile-open {
      display: block !important;
      position: fixed;
      top: 100%;
      left: 0;
      right: 0;
      background: rgb(15 23 42);
      border-top: 1px solid rgb(71 85 105);
      padding: 2rem;
      z-index: 50;
    }

    .nav-menu.mobile-open .nav-list {
      flex-direction: column;
      gap: 1rem !important;
    }
  }

  .product-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  }

  .category-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  }

  .btn:hover {
    transform: translateY(-2px);
  }

  .btn:active {
    transform: translateY(0);
  }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
