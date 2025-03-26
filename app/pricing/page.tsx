import React from "react";
import {
  Check,
  Sparkles,
  Brain,
  Coffee,
  Shield,
  Code2,
  Heart,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const features = [
  "AI-powered mind mapping",
  "Smart suggestions",
  "Unlimited mind maps",
  "Beautiful templates",
  "Community support",
  "Export to multiple formats",
  "Custom themes",
  "Collaboration tools",
];

const testimonials = [
  {
    quote: "Vector Mind helped me organize my thesis research. The AI suggestions were spot-on!",
    author: "Sarah Chen",
    role: "PhD Student",
    icon: Brain,
  },
  {
    quote: "Best study companion ever. The mind mapping feature is a game-changer!",
    author: "Mike Rodriguez",
    role: "Computer Science Student",
    icon: Code2,
  },
  {
    quote: "The AI-powered features are like having a study buddy who never sleeps.",
    author: "Emma Thompson",
    role: "Medical Student",
    icon: Heart,
  },
];

export default function PricingPage() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/50 to-transparent dark:from-amber-900/20 dark:to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 dark:from-amber-400 dark:via-amber-300 dark:to-amber-200 josefin-700">
              (<span className="text-amber-600 dark:text-amber-400 josefin-700">VM.</span>) Unlock Your Full Potential
            </h1>
            <p className="text-lg sm:text-xl text-amber-700 dark:text-amber-300 mb-8">
              Start your journey with Vector Mind. No credit card required - just pure productivity!
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Features Card */}
        <div className="max-w-4xl mx-auto mb-16 sm:mb-24">
          <Card className="bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-900/30 dark:to-amber-900/20 border-amber-200 dark:border-amber-800">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 bg-amber-200 dark:bg-amber-800 rounded-full flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 dark:text-amber-100">
                  Everything You Need, Completely Free
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-amber-500" />
                    <span className="text-amber-700 dark:text-amber-300">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto mb-16 sm:mb-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-amber-900 dark:text-amber-100 mb-8">
            What Students Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white dark:bg-slate-900 border-amber-200 dark:border-amber-800">
                <CardContent className="p-6">
                  <div className="h-12 w-12 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center mb-4">
                    <testimonial.icon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <p className="text-amber-700 dark:text-amber-300 mb-4">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-semibold text-amber-900 dark:text-amber-100">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-amber-600 dark:text-amber-400">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-16 sm:mb-24">
          <Card className="bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-900/40 dark:to-amber-900/30 border-amber-200 dark:border-amber-800">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 bg-amber-200 dark:bg-amber-800 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 dark:text-amber-100">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-2">
                    Is Vector Mind really free?
                  </h3>
                  <p className="text-amber-700 dark:text-amber-300">
                    Yes! Vector Mind is completely free to use. No hidden costs or premium features - everything is available to everyone.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-2">
                    Do I need to create an account?
                  </h3>
                  <p className="text-amber-700 dark:text-amber-300">
                    Yes, a free account is required to save your mind maps and access all features. It only takes a minute to sign up!
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-2">
                    How do I get started?
                  </h3>
                  <p className="text-amber-700 dark:text-amber-300">
                    Simply click the "Start Free" button below, create your account, and you're ready to go! No credit card required.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-900/50 dark:to-amber-900/30">
            <CardContent className="p-8 sm:p-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 dark:text-amber-100 mb-4">
                Ready to Unlock Your Potential?
              </h2>
              <p className="text-lg text-amber-700 dark:text-amber-300 mb-8">
                Join thousands of students who are already using Vector Mind to organize their thoughts and boost their productivity. Start free today!
              </p>
              <Link href="/dashboard">
                <Button className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white px-8 py-6 rounded-full text-lg">
                  Start Free <Rocket className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
