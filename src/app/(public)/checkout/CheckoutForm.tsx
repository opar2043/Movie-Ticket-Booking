"use client";

import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { Lock, Loader2, ArrowUpRight, AlertCircle } from "lucide-react";

export default function CheckoutForm({
  movieId,
  userId,
}: {
  movieId: string | null;
  userId: string;
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);
    setMessage(null);

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
          await axios.post(
            "https://moviebackend-eta.vercel.app/api/purchases",
            {
              movieId,
              userId,
              purchaseType: "BUY",
              price: 19.99,
            },
          );
        }
        window.location.href = `/success?payment_intent=${paymentIntent.id}`;
      } catch (err) {
        console.error("Error creating purchase:", err);
        setMessage(
          "Payment succeeded, but we couldn't save your purchase. Please contact support.",
        );
      }
    }
    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-5">
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />

      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="group w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-[#121315] font-medium text-sm hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed transition-transform shadow-[0_14px_30px_-8px_rgba(255,255,255,0.25)]"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Processing…
          </>
        ) : (
          <>
            <Lock className="w-4 h-4" />
            Pay $19.99 securely
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          </>
        )}
      </button>

      {message && (
        <div
          id="payment-message"
          className="flex items-start gap-2 px-4 py-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          {message}
        </div>
      )}
    </form>
  );
}
