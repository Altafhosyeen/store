const PROMISES = [
  {
    icon: "medal",
    title: "Premium Quality",
    body: "Carefully selected products, graded and inspected batch by batch.",
  },
  {
    icon: "box-open",
    title: "Freshly Packed",
    body: "Packed for freshness in sealed, food-safe packaging.",
  },
  {
    icon: "truck-fast",
    title: "Nationwide Delivery",
    body: "Delivering across Pakistan, from Karachi to Gilgit.",
  },
  {
    icon: "shield-halved",
    title: "Secure Shopping",
    body: "Safe and simple checkout with Cash on Delivery available.",
  },
];

const REVEAL_DELAYS = ["", "reveal-d1", "reveal-d2", "reveal-d3"];

export const TrustSection = () => (
  <section className="relative overflow-hidden bg-walnutdk py-14">
    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:gap-6 sm:px-6 lg:grid-cols-4">
      {PROMISES.map((promise, index) => (
        <div
          key={promise.title}
          className={`reveal rounded-2xl border border-gold/15 bg-charcoal/50 p-5 text-center transition-colors hover:border-gold/40 sm:p-6 ${REVEAL_DELAYS[index]}`}
        >
          <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-lg text-gold">
            <i className={`fa-solid fa-${promise.icon}`} />
          </span>
          <p className="font-display font-bold text-cream">{promise.title}</p>
          <p className="mt-1.5 text-[12.5px] font-light text-ivory/60">{promise.body}</p>
        </div>
      ))}
    </div>
  </section>
);
