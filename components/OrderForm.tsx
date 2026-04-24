"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { sendOrder } from "@/app/actions/sendOrder";
import { CheckCircle, Loader2 } from "lucide-react";
import DatePicker, { registerLocale } from "react-datepicker";
import { nl } from "date-fns/locale/nl";
import "react-datepicker/dist/react-datepicker.css";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";

registerLocale("nl", nl);

const schema = z.object({
  voornaam: z.string().min(2, "Voornaam is verplicht"),
  achternaam: z.string().min(2, "Achternaam is verplicht"),
  email: z.string().email("Geef een geldig e-mailadres op"),
  telefoon: z.string().min(9, "Geef een geldig telefoonnummer op"),
  afhaaldatum: z.string().min(1, "Kies een afhaaldatum"),
  bestelling: z.string().min(10, "Omschrijf uw bestelling (min. 10 tekens)"),
});

type FormData = z.infer<typeof schema>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-red-500 text-sm mt-1">{message}</p>;
}

function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-antraciet mb-1.5">
      {children}
    </label>
  );
}

const inputClass =
  "w-full border border-creme-dark rounded-xl px-4 py-3 text-antraciet bg-creme focus:outline-none focus:ring-2 focus:ring-rood focus:border-transparent transition-shadow placeholder:text-gray-400 text-base";

function OrderFormInner() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [afhaalDatetime, setAfhaalDatetime] = useState<Date | null>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    const token = executeRecaptcha ? await executeRecaptcha("submit_order") : "";
    const result = await sendOrder(data, token);
    if (result.success) {
      setSubmitted(true);
    } else {
      setServerError(result.error);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-antraciet mb-3">Bestelling ontvangen!</h3>
        <p className="text-antraciet-light leading-relaxed max-w-sm mx-auto">
          Bedankt voor uw bestelling. U ontvangt een bevestigingsmail. Wij nemen zo snel
          mogelijk contact met u op.
        </p>
      </div>
    );
  }

  const today = new Date();

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="voornaam">Voornaam *</Label>
          <input
            id="voornaam"
            type="text"
            autoComplete="given-name"
            placeholder="Jan"
            className={inputClass}
            {...register("voornaam")}
          />
          <FieldError message={errors.voornaam?.message} />
        </div>
        <div>
          <Label htmlFor="achternaam">Achternaam *</Label>
          <input
            id="achternaam"
            type="text"
            autoComplete="family-name"
            placeholder="Janssen"
            className={inputClass}
            {...register("achternaam")}
          />
          <FieldError message={errors.achternaam?.message} />
        </div>
      </div>

      <div>
        <Label htmlFor="email">E-mailadres *</Label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="jan@voorbeeld.be"
          className={inputClass}
          {...register("email")}
        />
        <FieldError message={errors.email?.message} />
      </div>

      <div>
        <Label htmlFor="telefoon">Telefoonnummer *</Label>
        <input
          id="telefoon"
          type="tel"
          autoComplete="tel"
          placeholder="0499 12 34 56"
          className={inputClass}
          {...register("telefoon")}
        />
        <FieldError message={errors.telefoon?.message} />
      </div>

      <div>
        <Label htmlFor="afhaaldatum">Afhaaldatum & -uur *</Label>
        <DatePicker
          id="afhaaldatum"
          selected={afhaalDatetime}
          onChange={(val: Date | null) => {
            setAfhaalDatetime(val);
            setValue("afhaaldatum", val ? val.toISOString() : "", { shouldValidate: true });
          }}
          minDate={today}
          locale="nl"
          dateFormat="dd/MM/yyyy HH:mm"
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          timeCaption="Uur"
          placeholderText="Kies datum en uur"
          autoComplete="off"
          wrapperClassName="w-full"
          className={inputClass}
        />
        <input type="hidden" {...register("afhaaldatum")} />
        <FieldError message={errors.afhaaldatum?.message} />
      </div>

      <div>
        <Label htmlFor="bestelling">Uw bestelling *</Label>
        <textarea
          id="bestelling"
          rows={6}
          placeholder="Noteer hier uw producten en aantallen...&#10;Bijv:&#10;- 1 kg gehakt&#10;- 500g ambachtelijke boerenpaté&#10;- 2x krabsla (200g)"
          className={`${inputClass} resize-none`}
          {...register("bestelling")}
        />
        <FieldError message={errors.bestelling?.message} />
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
            Bestelling versturen...
          </>
        ) : (
          "Bestelling versturen"
        )}
      </button>

      <p className="text-xs text-antraciet-light text-center">
        * Verplichte velden. Wij gebruiken uw gegevens enkel voor de verwerking van uw bestelling.
      </p>
    </form>
  );
}

export default function OrderForm() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}>
      <OrderFormInner />
    </GoogleReCaptchaProvider>
  );
}
