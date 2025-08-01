interface Step {
  number: number;
  title: string;
  description: string;
  gradient: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: "Select your components",
    description:
      "Click on the interactive bike diagram to select the components you want to check.",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    number: 2,
    title: "Automatic Analysis",
    description:
      "Our system instantly analyzes the compatibility between your selected components.",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    number: 3,
    title: "Detailed Results",
    description:
      "Get clear results with recommendations to optimize your configuration.",
    gradient: "from-purple-500 to-pink-600",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative z-10 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            How it works
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Three simple steps to check the compatibility of your components
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div
                className={`w-16 h-16 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center mx-auto mb-6`}
              >
                <span className="text-2xl font-bold text-white">
                  {step.number}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                {step.title}
              </h3>
              <p className="text-white/80">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
