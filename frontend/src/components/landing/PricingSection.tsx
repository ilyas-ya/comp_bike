import Link from "next/link";

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  buttonStyle: string;
  isPopular?: boolean;
  priceColor: string;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Free",
    price: "€0",
    period: "per month",
    priceColor: "text-cyan-400",
    features: [
      "5 checks per day",
      "Standard database",
      "Basic reports",
      "Community support",
    ],
    buttonText: "Start for free",
    buttonStyle:
      "w-full inline-flex justify-center items-center px-6 py-3 border border-white/20 rounded-lg text-white font-medium hover:bg-white/10 transition-all duration-300",
  },
  {
    name: "Pro",
    price: "19€",
    period: "per month",
    priceColor: "text-cyan-400",
    features: [
      "Unlimited checks",
      "Complete database",
      "Detailed reports",
      "Priority support",
    ],
    buttonText: "Try Pro",
    buttonStyle:
      "w-full inline-flex justify-center items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white font-medium hover:from-cyan-400 hover:to-blue-500 transition-all duration-300",
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    priceColor: "text-purple-400",
    features: [
      "Dedicated API",
      "Custom integration",
      "24/7 Dedicated support",
      "Team training",
    ],
    buttonText: "Contact us",
    buttonStyle:
      "w-full inline-flex justify-center items-center px-6 py-3 border border-white/20 rounded-lg text-white font-medium hover:bg-white/10 transition-all duration-300",
  },
];

function CheckIcon() {
  return (
    <svg
      className="h-5 w-5 text-green-400 mr-3"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative z-10 py-20 bg-white/5 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Simple and transparent pricing
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Choose the plan that fits your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.name}
              className={`
                backdrop-blur-lg rounded-2xl border p-8 transition-all duration-300 relative
                ${
                  plan.isPopular
                    ? "bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-2 border-cyan-400/50 transform scale-105"
                    : "bg-white/10 border-white/20 hover:bg-white/15"
                }
              `}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Popular
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {plan.name}
                </h3>
                <div className={`text-4xl font-bold ${plan.priceColor} mb-2`}>
                  {plan.price}
                </div>
                <div className="text-white/80 mb-8">{plan.period}</div>

                <ul className="space-y-4 mb-8 text-left">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-white/80"
                    >
                      <CheckIcon />
                      {feature}
                    </li>
                  ))}
                </ul>

                {plan.name === "Enterprise" ? (
                  <button className={plan.buttonStyle}>
                    {plan.buttonText}
                  </button>
                ) : (
                  <Link href="/app" className={plan.buttonStyle}>
                    {plan.buttonText}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
