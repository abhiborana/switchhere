import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Compass,
  Target,
} from "lucide-react";
import Link from "next/link";

// Reusable components
const SectionHeading = ({ title, subtitle, className = "" }) => (
  <div className={`text-center mb-16 ${className}`}>
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
    {subtitle && (
      <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
    )}
  </div>
);

const Feature = ({ icon, color, title, description }) => (
  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div
      className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center mb-4`}
    >
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const ActionButton = ({ href, primary = false, children }) => (
  <Link
    href={href}
    className={`${
      primary
        ? "bg-white text-indigo-700 hover:bg-indigo-50"
        : "bg-indigo-700 text-white hover:bg-indigo-800 border border-white"
    } py-3 px-6 rounded-full font-medium flex items-center justify-center gap-2 transition-all`}
  >
    {children}
  </Link>
);

const Step = ({ number, title, description, showConnector = false }) => (
  <div className="relative">
    <div className="text-center">
      <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
        {number}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
    {showConnector && (
      <div className="hidden md:block absolute top-1/2 left-full w-12 h-1 bg-indigo-200 -translate-y-1/2 -translate-x-6"></div>
    )}
  </div>
);

const PricingPlan = ({
  title,
  price,
  description,
  features,
  popular = false,
  primaryBtn = false,
}) => (
  <div
    className={`bg-white border${popular ? "-2 border-indigo-600 shadow-md" : " border-gray-200 shadow-sm"} rounded-2xl overflow-hidden relative`}
  >
    {popular && (
      <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold py-1 px-3">
        MOST POPULAR
      </div>
    )}
    <div className="p-6">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="text-3xl font-bold mb-4">
        {price}
        {price === "$0" && (
          <span className="text-base font-normal text-gray-500">/month</span>
        )}
      </div>
      <p className="text-gray-600 mb-6">{description}</p>
      <ul className="space-y-3 mb-6">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/auth"
        className={`block w-full py-2 px-4 ${
          primaryBtn
            ? "bg-indigo-600 hover:bg-indigo-700 text-white"
            : "bg-gray-100 hover:bg-gray-200"
        } text-center rounded-lg font-medium transition-colors`}
      >
        {title === "Free" ? "Start Free" : "Get Started"}
      </Link>
    </div>
  </div>
);

const FaqItem = ({ question, answer }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm">
    <h3 className="text-xl font-semibold mb-2">{question}</h3>
    <p className="text-gray-600">{answer}</p>
  </div>
);

const Switchhere = () => {
  const features = [
    {
      icon: <Compass className="text-indigo-600" size={24} />,
      color: "indigo",
      title: "AI Personalized Roadmaps",
      description:
        "Custom career transition paths based on your experience, skills, and goals.",
    },
    {
      icon: <BarChart3 className="text-green-600" size={24} />,
      color: "green",
      title: "Progress Visualization",
      description:
        "Track your journey with motivating progress metrics and milestone celebrations.",
    },
    {
      icon: <Target className="text-blue-600" size={24} />,
      color: "blue",
      title: "Distraction-Free Learning",
      description:
        "Focus on what matters with our carefully selected resources and guided path.",
    },
  ];

  const steps = [
    {
      number: 1,
      title: "Choose Your Path",
      description:
        "Tell us about your current skills and dream career. Our AI will generate a personalized roadmap.",
    },
    {
      number: 2,
      title: "Follow Your Roadmap",
      description:
        "Access curated free resources like videos, tutorials, and projects organized in a structured path.",
    },
    {
      number: 3,
      title: "Track Your Progress",
      description:
        "Stay motivated with visual progress tracking and celebrate milestones as you complete them.",
    },
  ];

  const pricingPlans = [
    {
      title: "Pro",
      price: "$4.99",
      description: "Complete career transition toolkit",
      features: [
        "Unlimited Career Roadmaps",
        "Premium Curated Resources",
        "Advanced Progress Tracking",
        "Weekly Goal Setting",
        "Email Reminders",
      ],
    },
    {
      title: "Free",
      price: "$0",
      description: "Basic career exploration",
      features: [
        "5 Career Roadmaps",
        "Access to Free Resources",
        "Basic Progress Tracking",
      ],
      popular: true,
      primaryBtn: true,
    },
  ];

  const faqs = [
    {
      question: "How does SwitchHere create personalized roadmaps?",
      answer:
        "Our AI analyzes your current skills, experience, and career goals to create a custom learning path. It identifies skill gaps and recommends the most efficient way to build the knowledge needed for your target career.",
    },
    {
      question: "Are the learning resources really free?",
      answer:
        "Yes! We curate the best free resources from across the web, including YouTube videos, blogs, open-source documentation, and free courses. Our value is in the curation, organization, and progress tracking.",
    },
    {
      question: "How long does it typically take to switch careers?",
      answer:
        "It varies based on your target career and starting point, but most users successfully transition within 6-12 months of consistent effort. Our roadmaps are designed to be efficient and focused on practical skills.",
    },
  ];

  return (
    <div className="overflow-y-auto flex flex-col gap-10 scroll-smooth">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Your Career Switch,{" "}
                <span className="text-yellow-300">Powered by AI</span>
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                Personalized roadmaps, curated resources, and progress tracking
                to help you successfully transition to your dream career.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <ActionButton href="/auth" primary>
                  Get Started <ArrowRight size={18} />
                </ActionButton>
                <ActionButton href="#how-it-works">Learn More</ActionButton>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-white/20">
                <div className="aspect-video bg-indigo-200/20 rounded-lg flex items-center justify-center">
                  <span className="text-lg text-white/70">
                    AI Career Dashboard Preview
                  </span>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-yellow-400 text-indigo-900 py-2 px-4 rounded-full font-bold transform rotate-6">
                AI Powered
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="p-10 bg-gray-50" id="features">
        <div className="container mx-auto">
          <SectionHeading
            title="Why Choose SwitchHere?"
            subtitle="The only platform that combines AI-powered career planning with progress tracking to keep you motivated."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <Feature key={idx} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="p-10 bg-indigo-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands who've successfully switched careers with our
            AI-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ActionButton href="/auth" primary>
              Get Started <ArrowRight size={18} />
            </ActionButton>
            <ActionButton href="#pricing">View Pricing</ActionButton>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="p-10 bg-white">
        <div className="container mx-auto">
          <SectionHeading
            title="How SwitchHere Works"
            subtitle="A simple 3-step process to transform your career"
          />

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <Step
                key={idx}
                {...step}
                showConnector={idx < steps.length - 1}
              />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/roadmap"
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-8 rounded-full font-medium inline-flex items-center gap-2 transition-all"
            >
              Start Your Journey <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="p-10 bg-white" id="pricing">
        <div className="container mx-auto">
          <SectionHeading
            title="Simple, Transparent Pricing"
            subtitle="Choose the plan that's right for your career journey"
          />

          <div className="flex justify-center gap-8 flex-wrap max-w-5xl mx-auto">
            {pricingPlans.map((plan, idx) => (
              <PricingPlan key={idx} {...plan} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="p-10 bg-gray-50" id="faq">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about SwitchHere"
          />

          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <FaqItem key={idx} {...faq} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="p-10 bg-indigo-600 text-white text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Your Career Transformation Today
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of successful career switchers who found their path
            with SwitchHere.
          </p>
          <Link
            href="/auth"
            className="bg-white text-indigo-700 hover:bg-indigo-50 py-3 px-8 rounded-full font-medium inline-flex items-center gap-2 transition-all"
          >
            Get Started For Free <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Switchhere;
