const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(`${process.env.REACT_APP_STRIPESECRET}`);
//api

//config
const app = express();

//middleware
app.use(cors({ origin: true }));
app.use(express.json());
//api routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.body.total;
  console.log(request.body);
  if (!Number.isInteger(total)) {
    return response.status(400).send();
  }

  console.log("Payment Request Recieved DAWG!! for this amount", total);

  const paymentIntent = await stripe.paymentIntents
    .create({
      amount: total,
      currency: "usd",
    })
    .catch((error) => console.log(error));

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

//listen
exports.api = functions.https.onRequest(app);

//example endpoint
//http://localhost:5001/clone-f5f06/us-central1/api
