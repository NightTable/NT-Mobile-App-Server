const express = require("express");
const stripe = require("stripe")(process.env.liveTestKeyStripe);
const router = express.Router();
const Customer = require("../models/Customer");


// whenever there is a payment to be made, we create an intent through this api --- capture method is manual
// so that we can hold the payment first and complete the payment in the end

router.post("/create-customer", async (req, res) => {
  try {
    const userId = req.body.userId;
    const paymentMethodId = req.body.paymentMethodId;
    const stripeCustomer = await stripe.customers.create({
      payment_method: paymentMethodId
    });
    const customerInternal = await Customer.create({
      stripeCustomerId: stripeCustomer.id,
      userId: userId,
      paymentMethodId: paymentMethodId,
      paymentIntentIds: []
    });
    res.status(200).send(customerInternal);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

// Create Payment Intent
router.post("/create-payment-intent", async (req, res) => {
  try {
    // Your existing code for getting request parameters
    const lineItems = req.body.lineItems;
    const paymentType = req.body.paymentType;
    const paymentMethodId = req.body.paymentMethodId;
    const customerId = req.body.customerId;
    let amount = req.body.amount;
    let nightTableFee = 28;
    const totalFee = lineItems.reduce((acc, val) => acc + val, 0) + nightTableFee;
    amount = Math.floor(amount * (1 + (totalFee / 100)) * 100);

    // Fetch internal customer data from your database
    const customerInternal = await Customer.findOne({ stripeCustomerId: customerId });

    // Check if customerInternal exists in the database
    if (!customerInternal) {
      return res.status(404).send({ error: "Customer not found" });
    }

    // Determine the capture method, default is "automatic"
    let cpMethod = "automatic";

    // Override capture method if paymentType is "snpl"
    if (paymentType === "snpl") {
      cpMethod = "manual";
    }

    // Override capture method if paymentType is "add-on" or "pnsl"
    if (["add-on", "pnsl"].includes(paymentType)) {
      cpMethod = "automatic";
    }

    // Create a new PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
      confirmation_method: "automatic",
      capture_method: cpMethod,
      payment_method_types: ['card'],
      payment_method: paymentMethodId,
      customer: customerId
    });

    // Ensure that paymentIntentIds is an array before pushing new ids
    if (!Array.isArray(customerInternal.paymentIntentIds)) {
      customerInternal.paymentIntentIds = [];
    }

    // Add the new PaymentIntent id to customerInternal's paymentIntentIds array
    customerInternal.paymentIntentIds.push(paymentIntent.id);

    // Save the updated customerInternal
    await customerInternal.save();

    // Prepare and send the response
    const clientSecret = paymentIntent.client_secret;
    return res.json({
      paymentIntent: paymentIntent,
      clientSecret: clientSecret
    });
  } catch (error) {
    // Handle errors
    // console.error(error);
    res.status(500).send({ error: error.message });
  }
});


// Capture Payment Intent
router.post("/capture-payment-intent", async (req, res) => {
  try {
    const paymentIntentId = req.body.paymentIntentId;
    const paymentIntent = await stripe.paymentIntents.capture(paymentIntentId);
    res.status(200).send({ status: paymentIntent.status });
  } catch (error) {
    // console.log(error);
    res.status(500).send({ error: error.message });
  }
});

// Update Internal Customer
router.patch("/update-internalCustomer/:id", async (req, res) => {
  try {
    const internalCustomerId = req.params.id;
    console.log("Internal Customer ID: ", internalCustomerId);
    
    const updatedDetails = req.body;
    console.log("Updated Details: ", updatedDetails);

    const resultCustomer = await Customer.updateOne(
      {_id: internalCustomerId},
      {$set: updatedDetails}
    );

    console.log("Update Result: ", resultCustomer);  // Add this line

    if (resultCustomer.matchedCount === 0){
      return res.status(400).send({ message: 'Customer not found' });
    }
    else {
      const updatedCustomer = await Customer.findOne({ _id: internalCustomerId });
      return res.json(updatedCustomer);    
    }
  } catch (error) {
    // console.log("Error: ", error);
    res.status(500).send({ error: error.message });
  }
});

// Get Stripe Customer
router.get("/get-stripe-customer/:id", async (req, res) => {
  try {
    const stripeCustomerId = req.params.id;
    const customer = await stripe.customers.retrieve(
      stripeCustomerId
    );
    return res.status(200).send(customer);
  } catch (error) {
    // console.log(error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;


/*
  Please check whether a payment method can be used more than once
  to create more payment intents. Write / modify code accordingly
*/




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