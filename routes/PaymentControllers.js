const express = require("express");
const stripe = require("stripe")(process.env.liveTestKeyStripe);
const router = express.Router();
const Customer = require("../models/Customer");
const Club = require('../models/Club')


// whenever there is a payment to be made, we create an intent through this api --- capture method is manual
// so that we can hold the payment first and complete the payment in the end

// Creating a customer internally and in stripe
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
    return res.status(200).send(customerInternal);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Something went wrong." });
  }
});

// Create Payment Intent
router.post("/create-payment-intent", async (req, res) => {
  try {
    const lineItems = req.body.lineItems;
    const paymentType = req.body.paymentType;
    const paymentMethodId = req.body.paymentMethodId;
    const customerId = req.body.customerId;
    let amount = req.body.amount;
    let nightTableFee = 28;
    const totalFee = lineItems.reduce((acc, val) => acc + val, 0) + nightTableFee;
    amount = Math.floor(amount * (1 + (totalFee / 100)) * 100);

    const customerInternal = await Customer.findOne({ stripeCustomerId: customerId });

    if (!customerInternal) {
      return res.status(404).send({ error: "Customer not found" });
    }

    let cpMethod = "automatic";

    if (paymentType === "snpl") {
      cpMethod = "manual";
    }

    if (["add-on", "pnsl"].includes(paymentType)) {
      cpMethod = "automatic";
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
      confirm: (cpMethod === 'manual' ? false : true),
      confirmation_method: "automatic",
      capture_method: cpMethod,
      payment_method_types: ['card'],
      payment_method: paymentMethodId,
      customer: customerId
    });

    if (!Array.isArray(customerInternal.paymentIntentIds)) {
      customerInternal.paymentIntentIds = [];
    }

    customerInternal.paymentIntentIds.push(paymentIntent.id);

    await customerInternal.save();

    const clientSecret = paymentIntent.client_secret;
    return res.json({
      paymentIntent: paymentIntent,
      clientSecret: clientSecret
    });
  } catch (error) {
    return res.status(500).send({ error: "Something went wrong." });
  }
});


// Capture Payment Intent
router.post("/capture-payment-intent", async (req, res) => {
  try {
    const paymentIntentId = req.body.paymentIntentId;
    const paymentIntent = await stripe.paymentIntents.capture(paymentIntentId);
    res.status(200).send({ paymentIntent: paymentIntent.id, status: paymentIntent.status });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Something went wrong.", paymentIntent: paymentIntent.id });
  }
});

router.post("/confirm-payment-intent", async (req, res) => {
  try {
    const paymentIntentId = req.body.paymentIntentId;
    const paymentIntent = await stripe.paymentIntents.capture(paymentIntentId);
    res.status(200).send({ paymentIntent: paymentIntent.id, status: paymentIntent.status });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Something went wrong.", paymentIntent: paymentIntent.id });
  }
});

// Get Stripe Customer by internal id or stripe id
router.get("/get-stripe-customer/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let stripeCustomerId;

    // Check if the ID starts with "cus_" to identify it as a Stripe customer ID
    if (id.startsWith("cus_")) {
      stripeCustomerId = id;
    } else {
      // Assume it's an internal customer object ID
      const customerInternal = await Customer.findById(id);
      if (!customerInternal) {
        return res.status(404).send({ error: "No such customer found." });
      }
      stripeCustomerId = customerInternal.stripeCustomerId;
    }

    // Retrieve Stripe customer
    const customer = await stripe.customers.retrieve(stripeCustomerId);
    return res.status(200).send(customer);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "An error occurred while retrieving the customer." });
  }
});

// get a payment intent with a given payment intent id
router.get("/paymentIntent/:id", async (req, res) => {
  try {
    const paymentIntentId = req.params.id;
    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId
    );

    if (!paymentIntent){
      return res.status(404).send({ error: "No such payment intent found." });
    }
    return res.status(200).send(paymentIntent);

  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Could not retrieve payment intent with given id" });
  }
});

// Get internal customer by either stripe id or internal customer object id
router.get("/internal-customer/:customerId", async (req, res) => {
  try {
    const customerId = req.params.customerId;
    let customerInternal = null;

    if (customerId.startsWith("cus_")) {
      // This is a Stripe customer ID
      customerInternal = await Customer.findOne({ stripeCustomerId: customerId });
    } else {
      // This is an internal ID
      customerInternal = await Customer.findById(customerId);
    }

    if (!customerInternal) {
      return res.status(404).send({ error: "Customer not found." });
    }
    return res.status(200).send(customerInternal);

  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Could not find customer with the given id." });
  }
});

// Get payment method by payment method id
router.get("/paymentMethod/:id", async (req, res) => {
  try {
    const pmId = req.params.id;
    const paymentMethod = await stripe.paymentMethods.retrieve(
      pmId
    );
    if (!paymentMethod) {
      return res.status(404).send({ error: "Payment method not found." });
    }
    return res.status(200).send(paymentMethod);

  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Could not find payment method with the given id." });
  }
});

// Get all card objects of customer
router.get("/customer-cards/:id", async (req, res) => {
  try {
    const customerId = req.params.customerId;
    let cards;

    if (customerId.startsWith("cus_")) {
      // This is a Stripe customer ID
      cards = await stripe.customers.listSources(
        customerId,
        {object: 'card', limit: 100}
      );
    } else {
      // This is an internal ID
      const customerInternal = await Customer.findById(customerId);
      if (!customerInternal) {
        return res.status(404).send({ error: "Card not found." });
      }
      cards = await stripe.customers.listSources(
        customerInternal.stripeCustomerId,
        {object: 'card', limit: 100}
      );
    }

    if (!cards) {
      return res.status(404).send({ error: "Card not found." });
    }

    return res.status(200).send(cards);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Could not find card with the given id." });
  }
});

// Update Internal Customer
router.patch("/update-internalCustomer/:id", async (req, res) => {
  try {
    const internalCustomerId = req.params.id;    
    const updatedDetails = req.body;
    const resultCustomer = await Customer.updateOne(
      {_id: internalCustomerId},
      {$set: updatedDetails}
    );

    if (resultCustomer.matchedCount === 0){
      return res.status(400).send({ message: 'Customer not found' });
    }

    else {
      const updatedCustomer = await Customer.findOne({ _id: internalCustomerId });
      if (!updatedCustomer){
        return res.status(400).send({ message: 'Customer not found' });
      }
      return res.json(updatedCustomer);    
    }

  } catch (error) {
    return res.status(500).send({ error: "Something went wrong." });
  }
});

// Update payment intent. This endpoint is used when user is in polling room screen,
// and instead of contributing 500, they want to contribute 600
// or some amount that's >= the minimum required joining price
router.patch("/update-payment-intent/:id", async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });
    const newFee = req.body.newFee; 
    const oldFee = req.body.joiningFee;
    const lineItems = req.body.lineItems;
    let nightTableFee = 28;

    if (!customer){
      return res.status(500).send({error: "No such customer found"})
    }

    if (newFee < oldFee){
      return res.status(500).send({error: "Your contribution must be more than or equal to the current joining fee"})
    }

    if (customer.paymentIntentIds.length > 1){
      return res.status(500).send({error: "Payment has already been made to join the table"})
    }
    else{
      const charges = lineItems.reduce((acc, val) => acc + val, 0) + nightTableFee;
      let amount = Math.floor(newFee * (1 + (charges / 100)) * 100);
      const paymentIntent = customer.paymentIntentIds[0];
      const newPaymentIntent = await stripe.paymentIntents.update(
        paymentIntent,
        {amount: amount}
      );
      if (!paymentIntent){
        return res.status(500).send({error: "Unable to update payment intent"})
      }
      return newPaymentIntent;
    }

  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Unable to update payment intent" });
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
