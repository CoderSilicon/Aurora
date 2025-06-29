"use client"

import { useRef, useState } from "react"
import { Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    quote: "Aurora has completely transformed how I approach daily reflection.",
    author: "Sarah Chen",
    role: "Product Designer",
  },
  {
    id: 2,
    quote: "Aurora's minimalist approach finally made journaling stick for me.",
    author: "Marcus Rodriguez",
    role: "Software Engineer",
  },
  {
    id: 3,
    quote: "The clean interface doesn't distract from the writing experience.",
    author: "Emma Thompson",
    role: "Writer",
  },
  {
    id: 4,
    quote: "Aurora helped me develop a consistent journaling habit.",
    author: "David Park",
    role: "Therapist",
  },
]

export default function TestimonialCards() {
   const [currentIndex, setCurrentIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (
      touchStartX.current !== null &&
      touchEndX.current !== null
    ) {
      const diff = touchStartX.current - touchEndX.current
      if (diff > 50) {
        // swipe left
        setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)
      } else if (diff < -50) {
        // swipe right
        setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)
      }
    }
    touchStartX.current = null
    touchEndX.current = null
  }

return (
    <div className="w-full flex justify-center items-center py-10 ">
      <div className="w-full max-w-md sm:max-w-4xl px-4">
        <h2 className="text-xl font-light text-gray-900 dark:text-white mb-6 text-center poppins-400">
          Don't take our words!
        </h2>
        <div className="block sm:hidden relative">
          {/* Mobile slider with swipe */}
          <div
            className="flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <TestimonialCard testimonial={testimonials[currentIndex]} />
          </div>
          <div className="flex justify-center mt-4 gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`h-2 w-6 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "bg-zinc-800 dark:bg-zinc-700"
                    : "bg-zinc-300 dark:bg-zinc-700"
                }`}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 gap-4">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="rounded-lg p-9 bg-white border-2 border-zinc-900 dark:bg-zinc-900   flex flex-col items-center ]">
      <blockquote className="text-sm text-center text-gray-800 dark:text-gray-100 font-normal mb-2">
      “{testimonial.quote}”
      </blockquote>
      <div className="text-center">
      <div className="text-gray-900 dark:text-white text-sm">{testimonial.author}</div>
      <div className="text-gray-500 dark:text-gray-400 text-xs">{testimonial.role}</div>
      </div>
    </div>
  )
}



