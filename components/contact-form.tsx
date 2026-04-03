"use client";

import type { FormEvent } from "react";
import { useState } from "react";

type FormStatus = "error" | "idle" | "loading" | "success";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = `${formData.get("name") ?? ""}`.trim();
    const email = `${formData.get("email") ?? ""}`.trim();
    const phone = `${formData.get("phone") ?? ""}`.trim();
    const message = `${formData.get("message") ?? ""}`.trim();
    const honeypot = `${formData.get("companyWebsite") ?? ""}`.trim();

    if (!name || !email || !message) {
      setStatus("error");
      setFeedback("Vyplňte prosím meno, e-mail a správu.");
      return;
    }

    if (!emailPattern.test(email)) {
      setStatus("error");
      setFeedback("Zadajte prosím platnú e-mailovú adresu.");
      return;
    }

    try {
      setStatus("loading");
      setFeedback("Odosielam správu...");

      const response = await fetch("/api/contact/", {
        body: JSON.stringify({
          email,
          honeypot,
          message,
          name,
          phone,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const payload = (await response.json().catch(() => null)) as
        | {
            message?: string;
          }
        | null;

      if (!response.ok) {
        throw new Error(payload?.message || "Správu sa nepodarilo odoslať.");
      }

      setStatus("success");
      setFeedback(
        payload?.message || "Ďakujeme, vaša správa bola odoslaná. Ozveme sa vám čo najskôr.",
      );
      form.reset();
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error ? error.message : "Správu sa nepodarilo odoslať. Skúste to znovu.",
      );
    }
  };

  const fieldClassName =
    "w-full rounded-xl border border-white/8 bg-white/10 px-5 py-4 text-base text-white outline-none transition placeholder:text-white/45 focus:border-[var(--color-accent)] focus:bg-white/12";

  return (
    <form className="space-y-5" noValidate onSubmit={handleSubmit}>
      <div>
        <p className="text-[2rem] font-semibold tracking-[-0.03em] text-white">Potrebujete pomôcť?</p>
        <p className="mt-3 max-w-[34rem] text-base leading-7 text-white/68">
          Pošlite nám pár viet o realizácii a my sa vám ozveme späť e-mailom alebo telefonicky.
        </p>
      </div>

      <input className={fieldClassName} name="name" placeholder="Meno a priezvisko" required type="text" />
      <input className={fieldClassName} name="email" placeholder="Email" required type="email" />
      <input className={fieldClassName} name="phone" placeholder="Telefón" type="tel" />
      <textarea
        className={`${fieldClassName} min-h-36 resize-y`}
        name="message"
        placeholder="Píšte sem"
        required
      />

      <input
        aria-hidden="true"
        autoComplete="off"
        className="hidden"
        name="companyWebsite"
        tabIndex={-1}
        type="text"
      />

      {feedback ? (
        <p
          aria-live="polite"
          className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
            status === "success"
              ? "bg-[#12331e] text-[#d9ffe5]"
              : status === "error"
                ? "bg-[#3d1515] text-[#ffdada]"
                : "bg-white/10 text-white/72"
          }`}
        >
          {feedback}
        </p>
      ) : null}

      <button
        className="inline-flex items-center gap-2 rounded-full bg-white px-12 py-4 text-base font-semibold text-black transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        disabled={status === "loading"}
        type="submit"
      >
        {status === "loading" ? "Odosielam" : "Odoslať"}
        <span aria-hidden>&rarr;</span>
      </button>
    </form>
  );
}
