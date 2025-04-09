// services/liqpayService.js
import sha1 from 'crypto-js/sha1';
import Base64 from 'crypto-js/enc-base64';

export default {
  generatePaymentForm(order) {
    const publicKey = 'YOUR_LIQPAY_PUBLIC_KEY';
    const privateKey = 'YOUR_LIQPAY_PRIVATE_KEY';
    
    const params = {
      public_key: publicKey,
      version: '3',
      action: 'pay',
      amount: order.totalAmount,
      currency: 'UAH',
      description: `Order #${order.id}`,
      order_id: order.id,
      result_url: `${window.location.origin}/order/success`,
      server_url: `${window.location.origin}/api/liqpay-callback`, // Your webhook endpoint
      language: 'uk', // Ukrainian language
    };
    
    // Create signature
    const dataString = Buffer.from(JSON.stringify(params)).toString('base64');
    const signString = privateKey + dataString + privateKey;
    const signature = Base64.stringify(sha1(signString));
    
    return {
      data: dataString,
      signature: signature
    };
  }
};