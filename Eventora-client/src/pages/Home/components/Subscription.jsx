import { FaCheck } from "react-icons/fa";
import SectionTitle from "../../../components/shared/SectionTitle";

const Subscription = () => {
  // NOTE: Removed useEffect hook here to prevent scroll jumping issues on the Home page.

  const plans = [
    {
      name: "Standard",
      price: "29",
      desc: "For small intimate gatherings.",
      features: [
        "5% Discount on all Bookings",
        "Priority Support",
        "Quarterly Trends Newsletter",
      ],
    },
    {
      name: "Premium",
      price: "59",
      desc: "Perfect for weddings & corporate.",
      features: [
        "10% Discount on all Bookings",
        "Dedicated Style Consultant",
        "Free Consultation Visits",
        "Early Access to New Collections",
      ],
      recommended: true, // This makes it pop
    },
    {
      name: "Elite",
      price: "99",
      desc: "Full VIP concierge service.",
      features: [
        "20% Discount on all Bookings",
        "24/7 Concierge Access",
        "Unlimited Free Reschedules",
        "VIP Event Access",
        "Custom Design Mockups",
      ],
    },
  ];

  return (
    <section className="py-24 bg-base-100">
      <div className="container mx-auto px-6">
        <SectionTitle
          heading="Membership Plans"
          subHeading="Unlock Exclusive Perks"
          center={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto items-center">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative p-8 rounded-2xl border transition-all duration-300 flex flex-col h-full ${
                plan.recommended
                  ? "border-primary shadow-2xl scale-105 z-10 bg-base-100"
                  : "border-base-200 hover:border-primary/30 hover:shadow-lg bg-base-100/50"
              }`}
            >
              {/* Recommended Badge */}
              {plan.recommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
                  {plan.name}
                </h3>
                <div className="text-4xl font-serif font-bold text-base-content mb-2">
                  <span className="text-2xl align-top opacity-60">$</span>
                  {plan.price}
                  <span className="text-sm font-sans font-medium text-base-content/50">
                    /mo
                  </span>
                </div>
                <p className="text-xs text-base-content/60">{plan.desc}</p>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-base-200 mb-8"></div>

              {/* Features List */}
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-base-content/80"
                  >
                    <div className="w-5 h-5 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0 mt-0.5">
                      <FaCheck size={10} />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <button
                className={`btn w-full rounded-xl font-bold tracking-wide ${
                  plan.recommended
                    ? "btn-primary text-white shadow-lg shadow-primary/20"
                    : "btn-outline border-base-300 hover:border-primary hover:text-primary"
                }`}
              >
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Subscription;