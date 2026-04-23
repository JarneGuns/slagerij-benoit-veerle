"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { sendContact } from "@/app/actions/sendContact";
import { CheckCircle, Loader2 } from "lucide-react";

const schema = z.object({
  naam: z.string().min(2, "Naam is verplicht"),
  email: z.string().email("Geef een geldig e-mailadres op"),
  telefoon: z.string().min(9, "Geef een geldig telefoonnummer op"),
  bericht: z.string().min(10, "Omschrijf uw vraag (min. 10 tekens)"),
});

type FormData = z.infer<typeof schema>;

const inputClass =
  "w-full border border-creme-dark rounded-xl px-4 py-3 text-antraciet bg-creme focus:outline-none focus:ring-2 focus:ring-rood focus:border-transparent transition-shadow placeholder:text-gray-400 text-base";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-red-500 text-sm mt-1">{message}</p>;
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    const result = await sendContact(data);
    if (result.success) {
      setSubmitted(true);
    } else {
      setServerError(result.error);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <CheckCircle size={52} className="text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-antraciet mb-2">Bericht ontvangen!</h3>
        <p className="text-antraciet-light">
          Bedankt voor uw bericht. Wij nemen zo snel mogelijk contact met u op.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div>
        <label htmlFor="naam" className="block text-sm font-medium text-antraciet mb-1.5">
          Naam *
        </label>
        <input
          id="naam"
          type="text"
          autoComplete="name"
          placeholder="Jan Janssen"
          className={inputClass}
          {...register("naam")}
        />
        <FieldError message={errors.naam?.message} />
      </div>

      <div>
        <label htmlFor="c-email" className="block text-sm font-medium text-antraciet mb-1.5">
          E-mailadres *
        </label>
        <input
          id="c-email"
          type="email"
          autoComplete="email"
          placeholder="jan@voorbeeld.be"
          className={inputClass}
          {...register("email")}
        />
        <FieldError message={errors.email?.message} />
      </div>

      <div>
        <label htmlFor="c-tel" className="block text-sm font-medium text-antraciet mb-1.5">
          Telefoon *
        </label>
        <input
          id="c-tel"
          type="tel"
          autoComplete="tel"
          placeholder="0499 12 34 56"
          className={inputClass}
          {...register("telefoon")}
        />
        <FieldError message={errors.telefoon?.message} />
      </div>

      <div>
        <label htmlFor="bericht" className="block text-sm font-medium text-antraciet mb-1.5">
          Waarmee kunnen we u helpen? *
        </label>
        <textarea
          id="bericht"
          rows={5}
          placeholder="Stel hier uw vraag..."
          className={`${inputClass} resize-none`}
          {...register("bericht")}
        />
        <FieldError message={errors.bericht?.message} />
      </div>

      {serverError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-rood text-white font-semibold py-4 px-8 rounded-xl hover:bg-rood-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Versturen...
          </>
        ) : (
          "Bericht versturen"
        )}
      </button>
    </form>
  );
}
