// Global JavaScript for Darkside Games Theme

// Polyfills for older browsers
if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;
    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

// Global utilities
window.theme = window.theme || {};

window.theme.utils = {
  // Format money
  formatMoney: function(cents, format) {
    if (typeof cents === 'string') {
      cents = cents.replace('.', '');
    }
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = (format || '${{amount}}');

    function formatWithDelimiters(number, precision, thousands, decimal) {
      precision = precision || 2;
      thousands = thousands || ',';
      decimal = decimal || '.';

      if (isNaN(number) || number == null) {
        return 0;
      }

      number = (number / 100.0).toFixed(precision);

      var parts = number.split('.');
      var dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
      var centsAmount = parts[1] ? (decimal + parts[1]) : '';

      return dollarsAmount + centsAmount;
    }

    switch (formatString.match(placeholderRegex)[1]) {
      case 'amount':
        value = formatWithDelimiters(cents, 2);
        break;
      case 'amount_no_decimals':
        value = formatWithDelimiters(cents, 0);
        break;
      case 'amount_with_comma_separator':
        value = formatWithDelimiters(cents, 2, '.', ',');
        break;
      case 'amount_no_decimals_with_comma_separator':
        value = formatWithDelimiters(cents, 0, '.', ',');
        break;
    }

    return formatString.replace(placeholderRegex, value);
  },

  // Get URL parameters
  getUrlParameter: function(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  },

  // Debounce function
  debounce: function(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  },

  // Check if element is in viewport
  isInViewport: function(element) {
    var rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
};

// Cart functionality
window.theme.cart = {
  // Get cart
  get: function() {
    return fetch('/cart.js')
      .then(response => response.json())
      .catch(error => {
        console.error('Error fetching cart:', error);
      });
  },

  // Add item to cart
  add: function(data) {
    return fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error adding to cart:', error);
    });
  },

  // Update cart
  update: function(data) {
    return fetch('/cart/update.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error updating cart:', error);
    });
  },

  // Remove item from cart
  remove: function(lineItemKey) {
    return this.update({ [lineItemKey]: 0 });
  }
};

// Product functionality
window.theme.product = {
  // Get product data
  get: function(handle) {
    return fetch(`/products/${handle}.js`)
      .then(response => response.json())
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  }
};

// Initialize global functionality
document.addEventListener('DOMContentLoaded', function() {
  // Add loading class to body
  document.body.classList.add('loaded');

  // Handle external links
  var externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
  externalLinks.forEach(function(link) {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });

  // Handle skip links
  var skipLinks = document.querySelectorAll('.skip-to-content-link');
  skipLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.focus();
        target.scrollIntoView();
      }
    });
  });

  // Handle form submissions
  var forms = document.querySelectorAll('form[data-remote]');
  forms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      // Handle AJAX form submission
      var formData = new FormData(this);
      fetch(this.action, {
        method: this.method,
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        // Handle success
        console.log('Form submitted successfully:', data);
      })
      .catch(error => {
        console.error('Form submission error:', error);
      });
    });
  });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
  var imageObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var image = entry.target;
        image.src = image.dataset.src;
        image.classList.remove('lazy');
        imageObserver.unobserve(image);
      }
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    var lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(function(img) {
      imageObserver.observe(img);
    });
  });
}

// Performance monitoring
window.addEventListener('load', function() {
  if ('performance' in window) {
    var loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
    console.log('Page load time:', loadTime + 'ms');
  }
});
