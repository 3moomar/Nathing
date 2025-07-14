// بيانات المنتجات
const products = [
  {
    id: 1,
    name: "ساعة ذكية ذهبية",
    price: "12.5 دينار بحريني",
    description: "ساعة ذكية مزودة بمواصفات عالية الجودة مع شاشة AMOLED.",
    image: "watch.jpg",
    rating: 4.5
  },
  {
    id: 2,
    name: "abdoly",
    price: "3.530 دينار بحريني",
    description: "كائن فرهود عايز يتحرك 24 ساعة",
    image: "عبدالله للبيع.jpg",
    rating: 1.5
  },
   {
    id: 3,
    name: "marwan palo",
    price: "3.530 دينار بحريني",
    description: "لو قلت له عامل ايه هيقولك ابويا مش موافق",
    image: "مروان للبيع.jpg",
    rating: 1.5
  },
   {
    id: 4,
    name: "abdoly&marwan palo",
    price: "6.650 دينار بحريني",
    description: "عرص خاص ل فترة محدودة",
    image: "مروان وعبدالله للبيع.jpg",
    rating: 2.5
  },
  // ... باقي المنتجات
];

// نظام السلة
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// عرض المنتجات
function displayProducts() {
  const container = document.getElementById("products-container");
  if (!container) return;

  container.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h2>${product.name}</h2>
        <p class="price">${product.price}</p>
        <div class="rating">
          ${'<i class="fas fa-star"></i>'.repeat(Math.floor(product.rating))}
          <span>(${product.rating})</span>
        </div>
        <div class="product-actions">
          <a href="product.html?id=${product.id}" class="btn">
            <i class="fas fa-eye"></i> التفاصيل
          </a>
          <button onclick="addToCart(${product.id})" class="btn btn-secondary">
            <i class="fas fa-cart-plus"></i> أضف للسلة
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// إضافة منتج للسلة
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert("تمت الإضافة إلى السلة!");
}

// تحديث عداد السلة
function updateCartCount() {
  const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
  });
}

// عرض تفاصيل المنتج
function displayProductDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  const product = products.find(p => p.id === productId);
  const container = document.getElementById("product-details");

  if (!product) {
    container.innerHTML = `<p class="error">المنتج غير موجود</p>`;
    return;
  }

  container.innerHTML = `
    <div class="product-detail">
      <img src="${product.image}" alt="${product.name}">
      <div class="detail-info">
        <h2>${product.name}</h2>
        <p class="price">${product.price}</p>
        <p>${product.description}</p>
        <button onclick="addToCart(${product.id})" class="btn btn-block">
          <i class="fas fa-cart-plus"></i> أضف إلى السلة
        </button>
      </div>
    </div>
  `;
}

// التحميل الأولي
if (window.location.pathname.includes('product.html')) {
  window.onload = displayProductDetails;
} else if (window.location.pathname.includes('cart.html')) {
  window.onload = renderCart;
} else {
  window.onload = function() {
    displayProducts();
    updateCartCount();
  };
}
