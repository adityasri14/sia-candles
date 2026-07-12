// 1. Render Products Dynamically
function renderProducts() {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;

    productGrid.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            ${product.isBestseller ? '<span class="tag">BESTSELLER</span>' : ''}
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.name}" class="product-image">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-notes">${product.notes}</p>
                <div class="product-footer">
                    <span class="price">₹${product.price}</span>
                    <button class="buy-now-btn">BUY NOW</button>
                </div>
            </div>
        </div>
    `).join('');

    // Attach click events to all the newly rendered buttons
    initCheckout();
}

// 2. Handle Razorpay Checkout Flow
function initCheckout() {
    const buyButtons = document.querySelectorAll('.buy-now-btn');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            const card = e.target.closest('.product-card');
            const priceText = card.querySelector('.price').innerText;
            
            // Clean the currency symbol and convert standard price to paise (e.g., 499 -> 49900)
            const cleanAmount = parseInt(priceText.replace(/[^0-9]/g, '')) * 100;
            
            // Set loading state on button
            const originalText = button.innerText;
            button.innerText = "PROCESSING...";
            button.disabled = true;

            try {
                // Call Vercel serverless backend function to create order
                const response = await fetch('/api/create-order', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        amount: cleanAmount,
                        currency: 'INR'
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.details || data.error || 'Failed to create order');
                }

                // Razorpay checkout modal configurations
                const options = {
                    key: 'rzp_test_TCeSxhXP2QYPl5', // Your active Razorpay Test Key ID
                    amount: data.amount,
                    currency: data.currency,
                    name: 'SIA Scented Candles',
                    description: 'Hand-poured Small Batch Soy Candles',
                    order_id: data.order_id,
                    handler: async function (paymentResponse) {
                        // Send payment details to verify-payment backend endpoint
                        try {
                            const verifyResponse = await fetch('/api/verify-payment', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    razorpay_order_id: paymentResponse.razorpay_order_id,
                                    razorpay_payment_id: paymentResponse.razorpay_payment_id,
                                    razorpay_signature: paymentResponse.razorpay_signature
                                })
                            });

                            const verifyData = await verifyResponse.json();
                            
                            if (verifyData.status === 'success') {
                                alert('Payment Successful! Thank you for ordering from SIA Candles.');
                            } else {
                                alert('Payment verification failed: ' + verifyData.message);
                            }
                        } catch (err) {
                            alert('Error verifying payment.');
                        }
                    },
                    prefill: {
                        name: '',
                        email: '',
                        contact: ''
                    },
                    theme: {
                        color: '#1a1a1a'
                    }
                };

                const rzp = new Razorpay(options);
                rzp.open();

            } catch (error) {
                console.error('Checkout Error:', error);
                alert('Checkout error: ' + error.message);
            } finally {
                // Reset button UI state
                button.innerText = originalText;
                button.disabled = false;
            }
        });
    });
}

// 3. Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});
