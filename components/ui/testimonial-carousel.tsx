"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"

const testimonials = [
  {
    quote: "Vector Mind has revolutionized how I organize my thoughts. The mind mapping feature is incredible!",
    author: "Dr. Sarah Chen",
    role: "Cognitive Scientist"
  },
  {
    quote: "The AI-powered suggestions help me see connections I never would have noticed before.",
    author: "Marcus Rodriguez",
    role: "Research Analyst"
  },
  {
    quote: "As a creative professional, this tool has become essential for my brainstorming process.",
    author: "Emma Thompson",
    role: "UX Designer"
  }
]

export function TestimonialCarousel() {
  return (
    <div className="mt-24">
      <h2 className="text-3xl font-bold text-center text-amber-900 mb-12">
        What Our Users Say
      </h2>
      <Carousel className="w-full max-w-3xl mx-auto">
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index}>
              <div className="p-6 text-center">
                <p className="text-lg text-amber-700 mb-4">{testimonial.quote}</p>
                <p className="font-semibold text-amber-900">{testimonial.author}</p>
                <p className="text-sm text-amber-600">{testimonial.role}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-amber-600 border-amber-200 hover:bg-amber-50" />
        <CarouselNext className="text-amber-600 border-amber-200 hover:bg-amber-50" />
      </Carousel>
    </div>
  )
} 