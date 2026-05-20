"use client";

import { Suspense, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import axios from "axios";
import { useSession } from "@/src/app/(auth)/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Lock,
  ShieldCheck,
  CreditCard,
  Ticket,
  Loader2,
  Sparkles,
} from "lucide-react";

const stripePromise = loadStripe(
  "pk_test_51QfDLMIXauIQhi9zpYyko394OCzT9oOQKPvLFEn5siB1Eld53WIRA6H63Oowd9ldwe1lkzoOO6WrEjUq2bQM1Tgi004aRSvT6f",
);

function CheckoutContent() {
  const [clientSecret, setClientSecret] = useState("");
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const movieId = searchParams.get("movie");

  useEffect(() => {
    if (!isPending && !session) router.push("/login?redirect=/checkout");
  }, [session, isPending, router]);

  useEffect(() => {
    axios
      .post(
        "https://moviebackend-eta.vercel.app/api/payments/create-payment-intent",
        { amount: 1999 },
      )
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch((err) => console.error("Error fetching client secret", err));
  }, []);

  const appearance = {
    theme: "night" as const,
    variables: {
      colorPrimary: "#FEFEFE",
      colorBackground: "#121315",
      colorText: "#ffffff",
      colorDanger: "#ef4444",
      fontFamily: "Poppins, system-ui, sans-serif",
      borderRadius: "12px",
    },
  };
  const options = { clientSecret, appearance };

  if (isPending || !session)
    return (
      <div className="min-h-screen bg-[#121315] flex justify-center items-center text-white gap-3">
        <Loader2 className="w-5 h-5 animate-spin" />
        Checking authorization…
      </div>
    );

  return (
    <main className="min-h-screen bg-[#121315]">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-[10px] tracking-[0.35em] uppercase text-white/80 mb-5">
            <Lock className="w-3 h-3" />
            Secure Checkout
          </span>
          <h1
            className="text-white font-light leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.6rem)" }}
          >
            One step from{" "}
            <span className="italic font-serif text-white/80">showtime.</span>
          </h1>
          <p className="text-white/60 mt-4">
            Payments are encrypted end-to-end. We never store your card details.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Form */}
          <div className="lg:col-span-3 rounded-[2rem] bg-[#23262B] border border-white/8 p-7 sm:p-10 luxury-shadow">
            <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/8">
              <div className="w-11 h-11 rounded-full bg-white text-[#121315] flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-white/45 tracking-[0.35em] uppercase">
                  Payment details
                </p>
                <h2 className="text-white font-medium text-lg">
                  All major cards accepted
                </h2>
              </div>
            </div>

            {clientSecret ? (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm movieId={movieId} userId={session.user.id} />
              </Elements>
            ) : (
              <div className="flex items-center justify-center gap-3 py-16 text-white/60">
                <Loader2 className="w-5 h-5 animate-spin" />
                Loading Stripe secure portal…
              </div>
            )}

            <div className="mt-7 pt-6 border-t border-white/8 grid grid-cols-3 gap-3 text-center">
              {[
                { icon: <Lock className="w-4 h-4" />, l: "256-bit SSL" },
                {
                  icon: <ShieldCheck className="w-4 h-4" />,
                  l: "PCI Compliant",
                },
                { icon: <Sparkles className="w-4 h-4" />, l: "Instant Ticket" },
              ].map((b) => (
                <div
                  key={b.l}
                  className="rounded-2xl bg-[#121315] border border-white/8 py-3 px-3"
                >
                  <span className="text-white inline-flex">{b.icon}</span>
                  <p className="text-[10px] text-white/55 tracking-[0.25em] uppercase mt-1.5">
                    {b.l}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <aside className="lg:col-span-2">
            <div className="rounded-[2rem] border border-white/8 bg-[#23262B] p-7 sticky top-28 luxury-shadow">
              <div className="flex items-center gap-2 mb-5">
                <Ticket className="w-4 h-4 text-white" />
                <p className="text-[10px] text-white/45 tracking-[0.35em] uppercase">
                  Order summary
                </p>
              </div>

              <div className="space-y-3 text-sm">
                <Row label="Movie Ticket" value="$19.99" />
                <Row label="Booking fee" value="$0.00" />
                <Row label="Tax" value="Included" />
              </div>

              <div className="my-6 h-px bg-white/8" />

              <div className="flex justify-between items-baseline">
                <span className="text-white/60 text-sm">Total</span>
                <span
                  className="text-white font-light tracking-tight"
                  style={{ fontSize: "2.4rem" }}
                >
                  $19.99
                </span>
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-[#121315] border border-white/8 text-xs text-white/65 leading-relaxed">
                <span className="text-white font-medium">Free</span>{" "}
                cancellation up to 1 hour before showtime. Refunds processed in
                3–5 business days.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-white/65">
      <span>{label}</span>
      <span className="text-white">{value}</span>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#121315] flex justify-center items-center text-white">
          <Loader2 className="w-5 h-5 animate-spin" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
