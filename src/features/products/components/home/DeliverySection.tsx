import { TruckOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { useState } from "react";
import { brandColors, brandFontFamily } from "@/theme";

const CITY_ESTIMATES: Record<string, string> = {
  "Same City": "1–2 working days",
  "Nearby Region": "2–4 working days",
  "Other Areas": "3–6 working days",
};

const TIMELINE_TABLE = [
  { zone: "Same City", window: "1–2 working days" },
  { zone: "Major Cities", window: "2–4 working days" },
  { zone: "Other Areas", window: "3–6 working days" },
];

/** City-based delivery estimate card plus a general timeline table. */
export const DeliverySection = () => {
  const [city, setCity] = useState("Same City");

  return (
    <section className="py-16 sm:py-20" style={{ background: brandColors.cream }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div
          className="relative overflow-hidden rounded-3xl border p-6 sm:p-10"
          style={{
            background: "rgba(255,255,255,.8)",
            borderColor: brandColors.sand,
            boxShadow: "0 10px 40px -12px rgba(51,34,15,.18)",
          }}
        >
          <div className="text-center">
            <h2
              className="text-2xl font-bold sm:text-4xl"
              style={{ fontFamily: brandFontFamily.display, color: brandColors.walnutDark }}
            >
              Nationwide Delivery Available
            </h2>
            <p className="mt-3 font-light" style={{ color: brandColors.cocoa }}>
              Select your area to see the estimated delivery window.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-md">
            <label
              htmlFor="delivery-city"
              className="mb-2 block text-[13px] font-semibold"
              style={{ color: brandColors.walnut }}
            >
              Your Area
            </label>
            <Select
              id="delivery-city"
              size="large"
              className="w-full"
              value={city}
              onChange={setCity}
              options={Object.keys(CITY_ESTIMATES).map((zone) => ({ value: zone, label: zone }))}
            />
            <div
              className="mt-4 rounded-xl border px-5 py-4 text-center"
              style={{ background: "rgba(201,162,75,.1)", borderColor: "rgba(201,162,75,.3)" }}
            >
              <p className="font-semibold" style={{ color: brandColors.walnutDark }}>
                <TruckOutlined className="mr-2" style={{ color: brandColors.goldDark }} />
                Estimated delivery: {CITY_ESTIMATES[city]}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 text-center text-[13.5px] sm:grid-cols-3">
            {TIMELINE_TABLE.map((row) => (
              <div
                key={row.zone}
                className="rounded-xl border px-4 py-4"
                style={{ background: brandColors.cream, borderColor: brandColors.sand }}
              >
                <p className="font-semibold" style={{ color: brandColors.walnutDark }}>
                  {row.zone}
                </p>
                <p className="mt-1" style={{ color: brandColors.cocoa, opacity: 0.8 }}>
                  {row.window}
                </p>
              </div>
            ))}
          </div>

          <p
            className="mt-6 text-center text-[12px]"
            style={{ color: brandColors.cocoa, opacity: 0.7 }}
          >
            Delivery times are estimates and may vary during peak seasons and public holidays. Free
            delivery applies on orders above Rs. 3,000.
          </p>
        </div>
      </div>
    </section>
  );
};
