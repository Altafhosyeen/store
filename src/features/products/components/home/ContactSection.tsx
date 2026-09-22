import { EnvironmentOutlined, MailOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { brandColors, brandFontFamily } from "@/theme";

/** Closing contact band: a short pitch plus contact details, matching the brand's dark accent sections. */
export const ContactSection = () => (
  <section className="py-16 sm:py-20" style={{ background: brandColors.cream }}>
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div
        className="overflow-hidden rounded-3xl"
        style={{
          background: brandColors.walnutDark,
          boxShadow: "0 24px 48px -16px rgba(51,34,15,.28)",
        }}
      >
        <div className="grid items-center gap-8 p-7 sm:p-12 lg:grid-cols-2">
          <div>
            <p
              className="text-[11px] font-semibold uppercase tracking-[.3em]"
              style={{ color: brandColors.gold }}
            >
              We&apos;re Here For You
            </p>
            <h2
              className="mt-3 text-3xl font-bold sm:text-4xl"
              style={{ fontFamily: brandFontFamily.display, color: brandColors.cream }}
            >
              Questions? Bulk order?
              <br />
              Let&apos;s talk.
            </h2>
            <p className="mt-4 max-w-md font-light" style={{ color: "rgba(243,236,221,.7)" }}>
              Reach out for gifting, corporate orders, or anything else — we're happy to help.
            </p>
            <div
              className="mt-6 space-y-3 text-[14.5px]"
              style={{ color: "rgba(243,236,221,.85)" }}
            >
              <p>
                <WhatsAppOutlined className="mr-2" style={{ color: brandColors.gold }} />
                Chat with us on WhatsApp
              </p>
              <p>
                <MailOutlined className="mr-2" style={{ color: brandColors.gold }} />
                hello@royalnuts.example
              </p>
              <p>
                <EnvironmentOutlined className="mr-2" style={{ color: brandColors.gold }} />
                Serving customers nationwide
              </p>
            </div>
          </div>

          <div
            className="rounded-2xl border p-6"
            style={{ background: "rgba(30,21,13,.6)", borderColor: "rgba(201,162,75,.2)" }}
          >
            <p
              className="mb-3 text-xl font-bold"
              style={{ fontFamily: brandFontFamily.display, color: brandColors.cream }}
            >
              <WhatsAppOutlined className="mr-2" style={{ color: brandColors.gold }} />
              Questions? Chat With Us
            </p>
            <p className="text-[14px] font-light" style={{ color: "rgba(243,236,221,.7)" }}>
              Place your order on the website with Cash on Delivery — for anything else, message us
              and we'll get back to you quickly.
            </p>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5"
              style={{ background: "#25D366" }}
            >
              <WhatsAppOutlined />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);
