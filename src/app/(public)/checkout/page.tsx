"use client";

import { Suspense, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import axios from "axios";
import { authClient } from "@/src/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";

// Make sure to call loadStripe outside of a component's render to avoid recreating the Stripe object on every render.
const stripePromise = loadStripe('pk_test_51QfDLMIXauIQhi9zpYyko394OCzT9oOQKPvLFEn5siB1Eld53WIRA6H63Oowd9ldwe1lkzoOO6WrEjUq2bQM1Tgi004aRSvT6f');

function CheckoutContent() {
  const [clientSecret, setClientSecret] = useState("");
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const movieId = searchParams.get("movie");

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login?redirect=/checkout");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    axios.post("https://moviebackend-eta.vercel.app/api/payments/create-payment-intent", { amount: 1999 }) // Example amount $19.99
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => console.error("Error fetching client secret", err));
  }, []);

  const appearance = {
    theme: 'night' as const,
    variables: {
      colorPrimary: '#E50914',
      colorBackground: '#141414',
      colorText: '#141414',
      colorDanger: '#E50914',
      fontFamily: 'system-ui, sans-serif',
      borderRadius: '4px',
    }
  };
  const options = {
    clientSecret,
    appearance,
  };

  if (isPending || !session) return <div className="min-h-screen bg-[#000000] flex justify-center items-center text-white">Checking authorization...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#000000] py-10">
      <div className="max-w-md w-full p-8 bg-[#141414] border border-[#2B2B2B] rounded-sm shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">Secure Checkout</h1>
        {clientSecret ? (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm movieId={movieId} userId={session.user.id} />
          </Elements>
        ) : (
          <div className="text-center py-10 text-gray-400 font-medium">Loading Stripe Secure Portal...</div>
        )}
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#000000] flex justify-center items-center text-white">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
