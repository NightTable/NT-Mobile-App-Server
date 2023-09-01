const express = require("express");
const stripe = require("stripe")(process.env.StripeSecretKey);
const router = express.Router();

// whenever there is a payment to be made, we create an intent through this api --- capture method is manual
// so that we can hold the payment first and complete the payment in the end

router.post("/make-payment", async (req, res) => {
  try {
    const lineItems = req.body.lineItems;
    let amount = req.body.amount;
    let nightTableFee = 28;
    const totalFee = lineItems.reduce((acc, val) => acc + val, 0) + nightTableFee;
    amount = amount * (1 + (totalFee / 100));
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "USD",
      confirm: true,
      description: `${req.body.customerId}, ${req.body.club}, ${req.body.event}`,
      capture_method: automatic_async
    });
    const capturedIntent = await stripe.paymentIntents.capture(paymentIntent.id);

  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Something went wrong." });
  }
  /*try {
    const { amount, currency } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      // capture_method: "manual", // Set capture_method to 'manual'
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Something went wrong." });
  }*/
});

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      capture_method: "manual", // Set capture_method to 'manual'
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Something went wrong." });
  }
});

router.post("/capture-payment", async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    const paymentIntent = await stripe.paymentIntents.capture(paymentIntentId);

    res.send({ status: paymentIntent.status });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Something went wrong." });
  }
});

module.exports = router;




//frontEnd code to block and capture payment
// <!-- Include Stripe.js -->
// <script src="https://js.stripe.com/v3/"></script>

// <!-- Your payment form -->
// <form id="payment-form">
//   <input type="text" name="amount" placeholder="Amount">
//   <input type="text" name="currency" placeholder="Currency (e.g., USD)">
//   <button type="submit">Hold Payment</button>
// </form>

// <!-- Your JavaScript code -->
// <script>
//   const form = document.getElementById('payment-form');
//   const stripe = Stripe('YOUR_PUBLISHABLE_KEY');

//   form.addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const formData = new FormData(form);
//     const amount = formData.get('amount');
//     const currency = formData.get('currency');

//     const response = await fetch('/create-payment-intent', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ amount, currency }),
//     });

//     const data = await response.json();

//     const result = await stripe.confirmCardPayment(data.clientSecret, {
//       payment_method: {
//         card: {
//           number: '4242424242424242',
//           exp_month: 12,
//           exp_year: 2024,
//           cvc: '123',
//         },
//       },
//     });

//     if (result.error) {
//       console.error(result.error.message);
//     } else {
//       console.log('Payment held successfully!');
//       // You can later capture the payment by calling the capture method on the Payment Intent.
//     }
//   });
// </script>
