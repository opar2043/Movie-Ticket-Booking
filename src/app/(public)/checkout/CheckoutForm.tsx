"use client";

import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import axios from "axios";

export default function CheckoutForm({ movieId, userId }: { movieId: string | null, userId: string }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
      redirect: "if_required",
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || "An unexpected error occurred.");
      } else {
        setMessage("An unexpected error occurred.");
      }
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      try {
        if (movieId && userId) {
          await axios.post("https://moviebackend-eta.vercel.app/api/purchases", {
            movieId: movieId,
            userId: userId,
            purchaseType: "BUY",
            price: 19.99
          });
        }
        window.location.href = `/success?payment_intent=${paymentIntent.id}`;
      } catch (err) {
        console.error("Error creating purchase:", err);
        setMessage("Payment succeeded, but we couldn't save your purchase. Please contact support.");
      }
    }
    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <button 
        disabled={isLoading || !stripe || !elements} 
        id="submit"
        className="w-full bg-blue-600 text-white rounded-md py-3 font-semibold hover:bg-blue-700 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner">Processing...</div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message" className="text-red-500 text-sm mt-4 text-center">{message}</div>}
    </form>
  );
}
