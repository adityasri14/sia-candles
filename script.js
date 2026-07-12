// ---------------------------------------------------------
// RENDER LOGIC — now wired to use Razorpay Standard Checkout
// via minimal serverless backend endpoints.
// ---------------------------------------------------------

async function handleCheckout(priceInRupees, productName) {
  try {
    // 1. Convert rupees to paise (e.g., 299 -> 29900)
    const amountInPaise = priceInRupees * 100;

    // 2. Call the serverless backend order endpoint
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: amountInPaise, currency: 'INR' })
    });

    const orderData = await response.json();
    if (!response.ok) throw new Error(orderData.error);

    // 3. Configure and open Razorpay Modal
    const options = {
      "key": "rzp_test_TCeSxhXP2QYPl5", // Your public test key
      "amount": orderData.amount,
      "currency": orderData.currency,
      "name": "Sia Candles",
      "description": `Purchase: ${productName}`,
      "order_id": orderData.order_id,
      "handler": async function (authResponse) {
        // 4. Call serverless verification endpoint on authorization success
        const verifyResponse = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id: authResponse.razorpay_order_id,
            razorpay_payment_id: authResponse.razorpay_payment_id,
            razorpay_signature: authResponse.razorpay_signature
          })
        });

        const verifyData = await verifyResponse.json();
        if (verifyResponse.ok && verifyData.status === "success") {
          alert("Payment verified successfully! Order placed.");
        } else {
          alert(`Verification failed: ${verifyData.message}`);
        }
      },
      "theme": { "color": "#121212" }
    };

    const rzp = new window.Razorpay(options);
    
    rzp.on('payment.failed', function (response) {
      alert(`Payment failed: ${response.error.description}`);
    });

    rzp.open();

  } catch (error) {
    alert(`Checkout error: ${error.message}`);
  }
}

function renderProductCard(p) {
  const card = document.createElement('div');
  card.className = 'card';

  const imgStyle = p.image
    ? `background-image:url('${p.image}');`
    : '';

  const badge = p.bestseller ? 'Bestseller' : '';

  card.innerHTML = `
    <div class="img" style="${imgStyle}"></div>
    <div class="eyebrow-small">${badge}</div>
    <div class="name">${p.name}</div>
    <div class="scent">${p.scent}</div>
    <div class="row">
      <span class="price">₹${p.price}</span>
      <button class="order-btn" type="button">Buy Now</button>
    </div>`;

  // Attach the event listener to call Razorpay checkout securely
  card.querySelector('.order-btn').addEventListener('click', () => {
    handleCheckout(p.price, p.name);
  });

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

function buildWhatsappLink(message) {
  return `https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent(message)}`;
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
