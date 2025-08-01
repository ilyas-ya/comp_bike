export function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Alex Thompson",
      role: "Professional Mechanic",
      company: "CycleTech Pro",
      image: "AT",
      quote:
        "Comp.bike has revolutionized how we check compatibility in our shop. What used to take hours of research now takes seconds.",
      rating: 5,
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Cycling Enthusiast",
      company: "Mountain Bike Club",
      image: "SC",
      quote:
        "I saved hundreds of euros by avoiding incompatible purchases. This tool is a game-changer for DIY bike builders.",
      rating: 5,
    },
    {
      id: 3,
      name: "Marco Rodriguez",
      role: "Bike Shop Owner",
      company: "Rodriguez Cycles",
      image: "MR",
      quote:
        "Our customers love the confidence this gives them. We've seen a 40% reduction in return rates since using Comp.bike.",
      rating: 5,
    },
  ];

  return (
    <section
      id="testimonials"
      className="relative z-10 py-20 bg-gradient-to-b from-transparent to-cyberpunk-darkgray/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cyberpunk-neon to-cyberpunk-accent bg-clip-text text-transparent">
              Trusted by Cyclists
            </span>
            <br />
            <span className="text-white">Worldwide</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            See what our community says about their experience with Comp.bike
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-cyberpunk-black/60 backdrop-blur-lg rounded-2xl border border-cyberpunk-red/30 p-8 hover:border-cyberpunk-accent/50 transition-all duration-300 group"
            >
              {/* Stars */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-white/90 mb-6 text-lg leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-cyberpunk-neon to-cyberpunk-accent rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.image}
                </div>
                <div>
                  <h4 className="text-white font-semibold">
                    {testimonial.name}
                  </h4>
                  <p className="text-white/70 text-sm">
                    {testimonial.role}
                    {testimonial.company && (
                      <>
                        <span className="text-cyberpunk-accent"> • </span>
                        {testimonial.company}
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-16 pt-8 border-t border-cyberpunk-red/30">
          <div className="text-center mb-8">
            <p className="text-white/70 font-medium">
              Trusted by leading bike shops and professionals
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 hover:opacity-80 transition-opacity duration-300">
            {/* Logo placeholders - in a real app, these would be actual partner logos */}
            <div className="flex items-center space-x-2 text-white/50">
              <div className="w-8 h-8 bg-cyberpunk-red/30 rounded"></div>
              <span className="font-medium">BikeShop Pro</span>
            </div>
            <div className="flex items-center space-x-2 text-white/50">
              <div className="w-8 h-8 bg-blue-500/30 rounded"></div>
              <span className="font-medium">CycleTech</span>
            </div>
            <div className="flex items-center space-x-2 text-white/50">
              <div className="w-8 h-8 bg-green-500/30 rounded"></div>
              <span className="font-medium">MountainGear</span>
            </div>
            <div className="flex items-center space-x-2 text-white/50">
              <div className="w-8 h-8 bg-purple-500/30 rounded"></div>
              <span className="font-medium">VeloWorks</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
