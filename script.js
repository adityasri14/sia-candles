// ---------------------------------------------------------
// RENDER LOGIC — you shouldn't need to edit this file for
// normal catalog updates. Edit products.js instead.
// ---------------------------------------------------------

function buildWhatsappLink(message) {
  return `https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function renderProductCard(p) {
  const card = document.createElement('div');
  card.className = 'card';

  const imgStyle = p.image
    ? `background-image:url('${p.image}');`
    : '';

  const orderLink = buildWhatsappLink(`Hi! I'd like to order the ${p.name} candle`);
  const badge = p.bestseller ? 'Bestseller' : '';

  card.innerHTML = `
    <div class="img" style="${imgStyle}"></div>
    <div class="eyebrow-small">${badge}</div>
    <div class="name">${p.name}</div>
    <div class="scent">${p.scent}</div>
    <div class="row">
      <span class="price">₹${p.price}</span>
      <a class="order" href="${orderLink}" target="_blank" rel="noopener">Order</a>
    </div>`;
  return card;
}

function renderBestsellers() {
  const row = document.getElementById('bestseller-grid');
  if (!row) return;
  const bestsellers = products.filter(p => p.bestseller);
  bestsellers.forEach(p => row.appendChild(renderProductCard(p)));
}

function renderFullCollection() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  products.forEach(p => grid.appendChild(renderProductCard(p)));
}

function wireStaticWhatsappLinks() {
  document.querySelectorAll('[data-wa-message]').forEach(el => {
    el.href = buildWhatsappLink(el.dataset.waMessage);
  });
}

function wireInstagramLinks() {
  document.querySelectorAll('[data-instagram-link]').forEach(el => {
    el.href = businessInfo.instagramUrl;
  });
  document.querySelectorAll('[data-instagram-handle]').forEach(el => {
    el.textContent = '@' + businessInfo.instagramHandle;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderBestsellers();
  renderFullCollection();
  wireStaticWhatsappLinks();
  wireInstagramLinks();
});
