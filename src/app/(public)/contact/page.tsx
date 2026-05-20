"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  User,
  MessageSquare,
  Phone,
  MapPin,
  Globe,
  Clock,
  Send,
  CheckCircle2,
  Headphones,
  ArrowUpRight,
} from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  return (
    <main className="bg-[#121315]">
      {/* HERO */}
      <section className="relative pt-2 pb-16">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <div className="relative h-[52vh] min-h-[420px] rounded-[2rem] overflow-hidden border border-white/8 luxury-shadow">
            <img
              src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1800&q=80"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#121315]/30 via-[#121315]/60 to-[#121315]" />

            <div className="relative h-full flex flex-col justify-end p-8 sm:p-14 max-w-4xl">
              <span className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-[10px] tracking-[0.35em] uppercase text-white/80 mb-6">
                <Headphones className="w-3 h-3" />
                Get in touch
              </span>
              <h1
                className="text-white font-light leading-[0.95] tracking-tight"
                style={{ fontSize: "clamp(2.75rem, 7vw, 5.5rem)" }}
              >
                We'd love to{" "}
                <span className="italic font-serif text-white/80">
                  hear from you.
                </span>
              </h1>
              <p className="text-white/70 mt-5 max-w-xl leading-relaxed">
                Partnership ideas, ticket support, feedback or just a hello —
                we'll write back within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="pb-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 grid lg:grid-cols-5 gap-6">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 rounded-3xl bg-[#23262B] border border-white/8 p-8 sm:p-10"
          >
            <p className="text-[11px] tracking-[0.45em] uppercase text-white/50 mb-4">
              Send a message
            </p>
            <h2
              className="text-white font-light tracking-tight mb-8"
              style={{ fontSize: "clamp(1.7rem, 3vw, 2.5rem)" }}
            >
              Write to the studio.
            </h2>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-14 text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-medium text-xl">Message sent</h3>
                <p className="text-white/55 max-w-xs">
                  Thanks for writing in, {form.name}. We'll reply to{" "}
                  <span className="text-white">{form.email}</span> within 24
                  hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="mt-3 text-sm text-white underline-offset-4 hover:underline"
                >
                  Send another →
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field
                    icon={<User className="w-4 h-4" />}
                    label="Full name"
                  >
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-white/8 bg-[#121315] text-white text-sm placeholder:text-white/35 focus:outline-none focus:border-white/30 transition-all"
                    />
                  </Field>
                  <Field
                    icon={<Mail className="w-4 h-4" />}
                    label="Email"
                  >
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-white/8 bg-[#121315] text-white text-sm placeholder:text-white/35 focus:outline-none focus:border-white/30 transition-all"
                    />
                  </Field>
                </div>

                <Field
                  icon={<MessageSquare className="w-4 h-4" />}
                  label="Subject"
                >
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-white/8 bg-[#121315] text-white text-sm focus:outline-none focus:border-white/30 transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select a subject…</option>
                    <option value="general">General Inquiry</option>
                    <option value="ticket">Ticket Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="career">Careers</option>
                    <option value="press">Press & Media</option>
                  </select>
                </Field>

                <div>
                  <p className="text-[10px] text-white/45 tracking-[0.35em] uppercase mb-2">
                    Message
                  </p>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Tell us a bit about what you need…"
                    className="w-full p-4 rounded-2xl border border-white/8 bg-[#121315] text-white text-sm placeholder:text-white/35 focus:outline-none focus:border-white/30 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2.5 pl-6 pr-2 py-2 self-start rounded-full bg-white text-[#121315] text-sm font-medium hover:scale-[1.02] transition-transform shadow-[0_14px_30px_-8px_rgba(255,255,255,0.25)]"
                >
                  Send message
                  <span className="w-9 h-9 rounded-full bg-[#121315] text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                    <Send className="w-3.5 h-3.5" />
                  </span>
                </button>
              </div>
            )}
          </motion.form>

          {/* Info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="rounded-3xl bg-[#23262B] border border-white/8 p-7">
              <p className="text-[11px] tracking-[0.45em] uppercase text-white/50 mb-3">
                Contact info
              </p>
              <h3
                className="text-white font-light tracking-tight mb-3"
                style={{ fontSize: "1.6rem" }}
              >
                Reach out anytime.
              </h3>
              <p className="text-white/55 text-sm leading-relaxed">
                Our team is online 7 days a week. Pick the channel that suits
                you — we'll do the rest.
              </p>
            </div>

            {[
              {
                icon: <Phone className="w-4 h-4" />,
                title: "Call",
                lines: ["+1 (800) 123-4567", "+1 (800) 765-4321"],
              },
              {
                icon: <MapPin className="w-4 h-4" />,
                title: "Visit",
                lines: ["350 Fifth Avenue, Suite 4000", "New York, NY 10118"],
              },
              {
                icon: <Globe className="w-4 h-4" />,
                title: "Global",
                lines: ["Operating in 40+ countries", "EN · ES · FR · JA"],
              },
              {
                icon: <Clock className="w-4 h-4" />,
                title: "Hours",
                lines: ["Mon–Fri: 9 AM – 6 PM", "Sat–Sun: 10 AM – 4 PM"],
              },
            ].map((c) => (
              <div
                key={c.title}
                className="flex items-start gap-4 p-5 rounded-2xl bg-[#23262B] border border-white/8 hover:bg-white/[0.03] transition-colors"
              >
                <div className="w-11 h-11 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white shrink-0">
                  {c.icon}
                </div>
                <div>
                  <p className="text-[10px] text-white/45 tracking-[0.35em] uppercase">
                    {c.title}
                  </p>
                  <p className="text-white font-medium text-[15px] mt-1">
                    {c.lines[0]}
                  </p>
                  <p className="text-white/55 text-xs mt-0.5">{c.lines[1]}</p>
                </div>
              </div>
            ))}

            <div className="rounded-3xl bg-[#23262B] border border-white/8 p-5">
              <p className="text-[10px] text-white/45 tracking-[0.35em] uppercase mb-3">
                Follow the studio
              </p>
              <div className="flex items-center gap-2">
                {[
                  { icon: <FaFacebookF className="w-3.5 h-3.5" />, label: "Facebook" },
                  { icon: <FaTwitter className="w-3.5 h-3.5" />, label: "Twitter" },
                  { icon: <FaInstagram className="w-3.5 h-3.5" />, label: "Instagram" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href="#"
                    aria-label={s.label}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/65 hover:text-[#121315] hover:bg-white hover:border-white transition-all"
                  >
                    {s.icon}
                  </a>
                ))}
                <a
                  href="#"
                  className="ml-auto group inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
                >
                  Press kit
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="pb-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <div className="relative rounded-3xl overflow-hidden border border-white/8 luxury-shadow h-[440px]">
            <iframe
              title="Our Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215209040437!2d-73.9856644!3d40.7484405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1700000000000"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: "grayscale(100%) invert(92%) contrast(120%)",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-6 left-6 glass-strong rounded-2xl px-5 py-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white text-[#121315] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">Movies OK HQ</p>
                <p className="text-white/55 text-xs">
                  350 Fifth Ave, New York, NY
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[10px] text-white/45 tracking-[0.35em] uppercase mb-2">
        {label}
      </p>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/45">
          {icon}
        </span>
        {children}
      </div>
    </div>
  );
}
