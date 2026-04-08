// PRODUCT DATABASE
const allProducts = [
  { id: 1, name: "Classic White Polo", fulltitle: "Classic White Polo", price: 150, original: 170, desc: "Crisp, breathable cotton. Timeless staple for any wardrobe.", material: "100% Combed Cotton", fit: "Regular fit, true to size", care: "Machine wash cold", img: "white.jpg", layer: "bestseller" },
  { id: 2, name: "Earth Brown Polo", fulltitle: "Earth Brown Polo", price: 150, original: 170, desc: "Warm earthy tone inspired by nature. Soft texture and excellent color retention.", material: "Premium Cotton Blend", fit: "Slim comfort fit", care: "Gentle cycle, iron low", img: "brown.jpg", layer: "bestseller" },
  { id: 3, name: "Brown Blue Polo", fulltitle: "Brown Blue Polo", price: 155, original: 175, desc: "Unique brown-blue blend. Perfect for casual elegance.", material: "Cotton Blend", fit: "Regular fit", care: "Machine wash", img: "brown blue.jpg", layer: "bestseller" },
  { id: 4, name: "Midnight Black", fulltitle: "Midnight Black Polo", price: 150, original: 170, desc: "Sleek modern edge with anti-wrinkle fabric. Sharp from day to night.", material: "Performance Blend", fit: "Athletic slim cut", care: "Machine wash", img: "black.jpg", layer: "bestseller" },
  { id: 5, name: "Dark Brown Polo", fulltitle: "Dark Brown Polo", price: 160, original: 180, desc: "Rich dark brown shade. Sophisticated and versatile.", material: "Premium Cotton", fit: "Classic fit", care: "Gentle cycle", img: "dark brown.jpg", layer: "new" },
  { id: 6, name: "Full Black Edition", fulltitle: "Full Black Edition", price: 175, original: 195, desc: "Complete blackout style. Ultra-sleek and modern.", material: "Performance Blend", fit: "Slim fit", care: "Cold wash", img: "full black.jpg", layer: "new" },
  { id: 7, name: "Full White Edition", fulltitle: "Full White Edition", price: 175, original: 195, desc: "Crisp pure white. Clean and sophisticated look.", material: "Supima Cotton", fit: "Tailored fit", care: "Hand wash recommended", img: "full white.jpg", layer: "new" },
  { id: 8, name: "Slate Grey", fulltitle: "Slate Grey Polo", price: 160, original: 180, desc: "Modern grey, wrinkle-resistant technology. Perfect for daily wear.", material: "Cotton-Linen Blend", fit: "Slim fit", care: "Dry clean optional", img: "grey.jpg", layer: "new" }
];

let cart = [];
let wishlist = [];

// Update badge counts
function updateBadges() {
  document.getElementById('cartCount').innerText = cart.length;
  document.getElementById('wishlistCount').innerText = wishlist.length;
}

// Render cart
function renderCart() {
  const container = document.getElementById('cartItemsContainer');
  const footer = document.getElementById('cartFooter');
  if (cart.length === 0) {
    container.innerHTML = '<div class="empty-message">Your cart is empty</div>';
    footer.style.display = 'none';
    return;
  }
  let total = 0;
  container.innerHTML = cart.map(item => {
    total += item.price;
    return `<div class="cart-item"><img class="cart-item-img" src="${item.img}" onerror="this.src='https://placehold.co/600x600/f0ebe3/b9936c?text=MANJI'"><div class="cart-item-info"><div class="cart-item-title">${item.fulltitle}</div><div class="cart-item-price">${item.price}</div></div><button class="remove-item" onclick="removeFromCart(${item.id})"><i class="fas fa-trash-alt"></i></button></div>`;
  }).join('');
  document.getElementById('cartTotal').innerHTML = `Total: ${total}`;
  footer.style.display = 'block';
}

// Render wishlist
function renderWishlist() {
  const container = document.getElementById('wishlistItemsContainer');
  if (wishlist.length === 0) { container.innerHTML = '<div class="empty-message">Your wishlist is empty</div>'; return; }
  container.innerHTML = wishlist.map(item => `<div class="wishlist-item"><img class="wishlist-item-img" src="${item.img}" onerror="this.src='https://placehold.co/600x600/f0ebe3/b9936c?text=MANJI'"><div class="wishlist-item-info"><div class="wishlist-item-title">${item.fulltitle}</div><div class="cart-item-price">${item.price}</div></div><button class="remove-item" onclick="removeFromWishlist(${item.id})"><i class="fas fa-trash-alt"></i></button></div>`).join('');
}

// Cart functions
function addToCart(product) {
  cart.push(product);
  updateBadges();
  renderCart();
  alert(`🛒 ${product.fulltitle} added to cart!`);
}

function removeFromCart(id) { 
  cart = cart.filter(p => p.id !== id); 
  updateBadges(); 
  renderCart(); 
  if (cart.length === 0) closeCart(); 
}

// Wishlist functions
function addToWishlist(product) { 
  if (!wishlist.find(p => p.id === product.id)) { 
    wishlist.push(product); 
    updateBadges(); 
    renderWishlist(); 
    alert(`❤️ ${product.fulltitle} added to wishlist!`); 
  } 
}

function removeFromWishlist(id) { 
  wishlist = wishlist.filter(p => p.id !== id); 
  updateBadges(); 
  renderWishlist(); 
  if (wishlist.length === 0) closeWishlist(); 
}

// Open/close panels
function openCart() { 
  document.getElementById('cartPanel').classList.add('open'); 
  document.body.style.overflow = 'hidden'; 
}

function closeCart() { 
  document.getElementById('cartPanel').classList.remove('open'); 
  document.body.style.overflow = ''; 
}

function openWishlist() { 
  document.getElementById('wishlistPanel').classList.add('open'); 
  document.body.style.overflow = 'hidden'; 
}

function closeWishlist() { 
  document.getElementById('wishlistPanel').classList.remove('open'); 
  document.body.style.overflow = ''; 
}

// Open product modal
function openModal(product) {
  const similar = allProducts.filter(p => p.id !== product.id).slice(0, 4);
  const saveAmount = product.original - product.price;
  const modalContent = `
    <div class="modal-product-image"><img src="${product.img}" onerror="this.src='https://placehold.co/600x600/f0ebe3/b9936c?text=MANJI'"></div>
    <div class="modal-product-title">${product.fulltitle}</div>
    <div class="modal-product-price">${product.price} <del>${product.original}</del> <span class="badge-save">Save ${saveAmount}</span></div>
    <p>${product.desc}</p>
    <ul class="details-list"><li><i class="fas fa-tshirt"></i> <strong>Material:</strong> ${product.material}</li><li><i class="fas fa-people-arrows"></i> <strong>Fit:</strong> ${product.fit}</li><li><i class="fas fa-hand-sparkles"></i> <strong>Care:</strong> ${product.care}</li></ul>
    <div class="modal-action"><button class="btn-add-cart-modal" id="modalAddCartBtn"><i class="fas fa-shopping-bag"></i> Add to Cart — ${product.price}</button><button class="btn-wishlist-modal" id="modalWishlistBtn"><i class="far fa-heart"></i> Save</button></div>
    <div class="similar-section"><div class="similar-title">You May Also Like</div><div class="similar-grid">${similar.map(s => `<div class="similar-item" data-sim-id="${s.id}" data-sim-img="${s.img}" data-sim-name="${s.fulltitle}" data-sim-price="${s.price}" data-sim-original="${s.original}" data-sim-desc="${s.desc}" data-sim-material="${s.material}" data-sim-fit="${s.fit}" data-sim-care="${s.care}"><img class="similar-img" src="${s.img}" onerror="this.src='https://placehold.co/600x600/f0ebe3/b9936c?text=MANJI'"><div><h4>${s.fulltitle}</h4><div>${s.price}</div></div></div>`).join('')}</div></div>
  `;
  document.getElementById('modalDynamicContent').innerHTML = modalContent;
  document.getElementById('productModalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
  
  document.querySelectorAll('.similar-item').forEach(item => {
    item.addEventListener('click', () => openModal({
      id: parseInt(item.dataset.simId), fulltitle: item.dataset.simName, price: parseInt(item.dataset.simPrice), original: parseInt(item.dataset.simOriginal),
      desc: item.dataset.simDesc, material: item.dataset.simMaterial, fit: item.dataset.simFit, care: item.dataset.simCare, img: item.dataset.simImg
    }));
  });
  document.getElementById('modalAddCartBtn')?.addEventListener('click', () => addToCart(product));
  document.getElementById('modalWishlistBtn')?.addEventListener('click', () => addToWishlist(product));
}

// Render product grids
function renderProductGrid(containerId, productList) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  productList.forEach(prod => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `<div class="product-image"><img src="${prod.img}" onerror="this.src='https://placehold.co/600x600/f0ebe3/b9936c?text=MANJI'"></div><div class="product-info"><div class="product-title">${prod.name}</div><div class="product-price">${prod.price} <del>${prod.original}</del></div></div>`;
    card.onclick = () => openModal(prod);
    container.appendChild(card);
  });
}

// Tab switching
function switchTab(tabId) {
  document.querySelectorAll('.tab-page').forEach(page => page.classList.remove('active-page'));
  document.getElementById(`${tabId}Tab`).classList.add('active-page');
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  document.querySelector(`.nav-link[data-tab="${tabId}"]`).classList.add('active');
  if (tabId === 'home' && window.sliderInstance) window.sliderInstance.resetTimer();
}

// Slideshow class
class Slider {
  constructor() {
    this.slides = document.querySelectorAll('.slide');
    this.idx = 0;
    this.total = this.slides.length;
    this.timer = null;
    this.bar = document.getElementById('timerBar');
    if (this.slides.length) this.init();
  }
  init() {
    this.slides.forEach(s => s.classList.remove('active'));
    this.show(0);
    this.createIndicators();
    document.getElementById('prevSlide')?.addEventListener('click', () => { this.prev(); this.resetTimer(); });
    document.getElementById('nextSlide')?.addEventListener('click', () => { this.next(); this.resetTimer(); });
    this.startTimer();
  }
  createIndicators() {
    const cont = document.getElementById('slideIndicators');
    if (!cont) return;
    cont.innerHTML = '';
    for (let i = 0; i < this.total; i++) {
      let ind = document.createElement('div');
      ind.classList.add('indicator');
      if (i === this.idx) ind.classList.add('active');
      ind.addEventListener('click', () => { this.goTo(i); this.resetTimer(); });
      cont.appendChild(ind);
    }
    this.inds = document.querySelectorAll('.indicator');
  }
  show(i) {
    this.slides.forEach(s => s.classList.remove('active'));
    this.slides[i].classList.add('active');
    if (this.inds) this.inds.forEach((ind, idx) => idx === i ? ind.classList.add('active') : ind.classList.remove('active'));
  }
  next() { this.idx = (this.idx + 1) % this.total; this.show(this.idx); }
  prev() { this.idx = (this.idx - 1 + this.total) % this.total; this.show(this.idx); }
  goTo(i) { this.idx = i; this.show(this.idx); }
  startTimer() {
    if (this.timer) clearInterval(this.timer);
    if (this.bar) {
      this.bar.style.transition = 'none';
      this.bar.style.width = '0%';
      this.bar.offsetHeight;
      this.bar.style.transition = `width 3000ms linear`;
      this.bar.style.width = '100%';
    }
    this.timer = setInterval(() => { this.next(); this.startTimer(); }, 3000);
  }
  resetTimer() {
    if (this.timer) clearInterval(this.timer);
    if (this.bar) {
      this.bar.style.transition = 'none';
      this.bar.style.width = '0%';
      this.bar.offsetHeight;
      this.bar.style.transition = `width 3000ms linear`;
      this.bar.style.width = '100%';
    }
    this.timer = setInterval(() => { this.next(); this.startTimer(); }, 3000);
  }
}

// Search functionality
function filterSearch() {
  const term = document.getElementById('searchInput').value.trim().toLowerCase();
  document.querySelectorAll('#homeTab .product-card, #collectionTab .product-card').forEach(card => {
    const name = card.querySelector('.product-title')?.innerText.toLowerCase() || '';
    card.style.display = (!term || name.includes(term)) ? '' : 'none';
  });
}

// Close modal
function closeModal() { 
  document.getElementById('productModalOverlay').classList.remove('active'); 
  document.body.style.overflow = ''; 
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Render all product grids
  renderProductGrid('homeLayer1', allProducts.filter(p => p.layer === 'bestseller'));
  renderProductGrid('homeLayer2', allProducts.filter(p => p.layer === 'new'));
  renderProductGrid('homeLayer3', allProducts.filter(p => p.layer === 'limited'));
  renderProductGrid('collectionGrid', allProducts);
  
  // Initialize slider
  window.sliderInstance = new Slider();
  
  // Set up event listeners
  document.getElementById('cartIconBtn').onclick = openCart;
  document.getElementById('wishlistIconBtn').onclick = openWishlist;
  document.getElementById('searchBtn').addEventListener('click', filterSearch);
  document.getElementById('searchInput').addEventListener('keypress', (e) => { if (e.key === 'Enter') filterSearch(); });
  
  // Modal close events
  const modalOverlay = document.getElementById('productModalOverlay');
  modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal(); });
  
  // Tab switching
  document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => switchTab(link.dataset.tab)));
  
  // Footer buttons
  document.getElementById('footerAboutBtn').addEventListener('click', (e) => {
    e.preventDefault();
    alert("MANJI | Premium Polo Brand\n\nEst. 2020\nCrafted for the modern gentleman with sustainable materials.\n📍 Manila, Philippines");
  });
  document.getElementById('footerContactBtn').addEventListener('click', (e) => {
    e.preventDefault();
    alert("📧 hello@manji.com\n📞 +63 (2) 8123 4567\n📍 123 Heritage Street, Makati\n🕒 Mon-Sat: 10AM - 7PM");
  });
  
  // Account buttons
  document.getElementById('loginBtn')?.addEventListener('click', () => alert('Welcome to MANJI! (Demo sign in)'));
  document.getElementById('createAccountLink')?.addEventListener('click', (e) => { e.preventDefault(); alert('Account creation demo.'); });
});