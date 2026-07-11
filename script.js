// ---------------------------------------------------------
// RENDER LOGIC — you shouldn't need to edit this file for
// normal catalog updates. Edit products.js instead.
// ---------------------------------------------------------

function buildWhatsappLink(message) {
  return `https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function renderProducts() {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = '';

  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';

    const imgContent = p.image
      ? `<img src="${p.image}" alt="${p.name} candle" style="width:100%;height:100%;object-fit:cover;">`
      : p.name;

    const orderLink = buildWhatsappLink(`Hi! I'd like to order the ${p.name} candle`);

    card.innerHTML = `
      <div class="img">${imgContent}</div>
      <div class="info">
        <div class="sprig-divider"></div>
        <div class="name">${p.name}</div>
        <div class="scent">${p.scent}</div>
        <div class="row">
          <span class="price">₹${p.price}</span>
          <a class="order" href="${orderLink}" target="_blank" rel="noopener">Order →</a>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}

function wireStaticWhatsappLinks() {
  // Any element with data-wa-message gets its WhatsApp link built automatically,
  // so the phone number only ever needs to be changed in one place: products.js
  document.querySelectorAll('[data-wa-message]').forEach(el => {
    el.href = buildWhatsappLink(el.dataset.waMessage);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  wireStaticWhatsappLinks();
});
