"use client";
import React from "react";
import axios from "axios";

const MakePaymentComponent = ({ selectedAmount }) => {
  const makePayment = async () => {
    const res = await initializeRazorpay();
    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    let data;
    try {
      const response = await axios.post("/api/razorpay", {
        taxAmt: selectedAmount,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      data = response.data;
    } catch (error) {
      console.error("Error fetching data: ", error);
      alert("Failed to fetch payment details. Please try again.");
      return;
    }

    var options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, // Use NEXT_PUBLIC prefix for client-side env variables
      name: "Indradhanu.online",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thank you for your test donation",
      image: "https://manuarora.in/logo.png",
      handler: function (response) {
        alert("Razorpay Response: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Shreyash Godmon",
        email: "admin@indradhanu.online",
        contact: "98534525519",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  return (
    <div>
      <button onClick={() => makePayment()}>Pay {selectedAmount} now</button>
    </div>
  );
};

export default MakePaymentComponent;
