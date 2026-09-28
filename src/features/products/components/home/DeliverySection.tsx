import { useState } from "react";
import { HOME_SECTION_IDS } from "@/constants";

const DELIVERY_ESTIMATES: Record<string, string> = {
  Islamabad: "1–2 working days",
  Rawalpindi: "1–2 working days",
  Lahore: "2–4 working days",
  Karachi: "2–4 working days",
  Peshawar: "2–4 working days",
  Quetta: "2–4 working days",
  Faisalabad: "2–4 working days",
  Multan: "2–4 working days",
  Other: "3–6 working days",
};

const ZONES = [
  { name: "Islamabad / Rawalpindi", days: "1–2 working days" },
  { name: "Major Cities", days: "2–4 working days" },
  { name: "Other Areas", days: "3–6 working days" },
];

export const DeliverySection = () => {
  const [city, setCity] = useState("Rawalpindi");

  return (
    <section id={HOME_SECTION_IDS.delivery} className="paper-texture py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="reveal relative overflow-hidden rounded-3xl border border-sand bg-white/80 p-6 shadow-soft sm:p-10">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <div className="mb-8 text-center">
            <h2 className="font-display text-2xl font-bold text-walnutdk sm:text-4xl">
              Nationwide Delivery Available <span aria-hidden="true">🇵🇰</span>
            </h2>
            <p className="mt-3 font-light text-cocoa">
              Select your city to see the estimated delivery window.
            </p>
          </div>
          <div className="mx-auto max-w-md">
            <label
              htmlFor="delivery-city"
              className="mb-2 block text-[13px] font-semibold text-walnut"
            >
              Your City
            </label>
            <select
              id="delivery-city"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className="w-full cursor-pointer rounded-xl border border-sand bg-cream px-4 py-3 text-walnut"
            >
              {Object.keys(DELIVERY_ESTIMATES).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div className="mt-4 rounded-xl border border-gold/30 bg-gold/10 px-5 py-4 text-center">
              <p className="font-semibold text-walnutdk">
                <i className="fa-solid fa-truck-fast mr-2 text-golddk" />
                {city}: estimated delivery in {DELIVERY_ESTIMATES[city]}
              </p>
            </div>
          </div>
          <div className="mt-8 grid gap-4 text-center text-[13.5px] sm:grid-cols-3">
            {ZONES.map((zone) => (
              <div key={zone.name} className="rounded-xl border border-sand bg-cream px-4 py-4">
                <p className="font-semibold text-walnutdk">{zone.name}</p>
                <p className="mt-1 text-cocoa/80">{zone.days}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-[12px] text-cocoa/60">
            Delivery times are estimates and may vary during peak seasons, sales and public
            holidays. Free delivery applies on orders above Rs. 3,000.
          </p>
        </div>
      </div>
    </section>
  );
};
