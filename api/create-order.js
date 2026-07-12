const Razorpay = require('razorpay');

module.exports = async (req, res) => {
  // 1. Enable CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 2. Fail early if Environment Variables are missing entirely
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return res.status(500).json({ 
      error: 'Configuration Missing', 
      details: 'Razorpay API keys are not detected in the current Vercel deployment environment.'
    });
  }

  try {
    // 3. Handle unparsed body streams safely
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({ error: 'Invalid JSON body payload format.' });
      }
    }

    const { amount, currency } = body || {};

    if (!amount || amount < 100) {
      return res.status(400).json({ error: 'Amount must be at least 100 paise.' });
    }

    // 4. Initialize Razorpay instance safely
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: parseInt(amount),
      currency: currency || 'INR',
      receipt: `rcpt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    
    return res.status(200).json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency
    });

  } catch (error) {
    return res.status(500).json({ 
      error: 'Razorpay Order Creation Failed',
      details: error.message || error.toString()
    });
  }
};
