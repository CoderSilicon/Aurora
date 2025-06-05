"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    quote:
      "VectoreMind has completely transformed how I approach daily reflection. The simplicity allows me to focus on what truly matters.",
    author: "Sarah Chen",
    role: "Product Designer",
    location: "San Francisco",
    cardType: "geometric",
  },
  {
    id: 2,
    quote:
      "I've tried countless journaling apps, but VectoreMind's minimalist approach finally made it stick. It's become an essential part of my routine.",
    author: "Marcus Rodriguez",
    role: "Software Engineer",
    location: "Austin",
    cardType: "rounded",
  },
  {
    id: 3,
    quote:
      "The clean interface doesn't distract from the writing experience. It feels like having a conversation with myself.",
    author: "Emma Thompson",
    role: "Writer",
    location: "London",
    cardType: "tilted",
  },
  {
    id: 4,
    quote:
      "VectoreMind helped me develop a consistent journaling habit. The thoughtful design makes every entry feel intentional.",
    author: "David Park",
    role: "Therapist",
    location: "Seattle",
    cardType: "bordered",
  },
]

const getCardStyles = (cardType: string) => {
  switch (cardType) {
    case "geometric":
      return "bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 border-l-4 border-blue-500 dark:border-blue-400 relative overflow-hidden"
    case "rounded":
      return "bg-gradient-to-tr from-purple-50 to-pink-100 dark:from-purple-950 dark:to-pink-900 rounded-3xl shadow-lg dark:shadow-purple-900/20 relative overflow-hidden"
    case "tilted":
      return "bg-gradient-to-bl from-emerald-50 to-teal-100 dark:from-emerald-950 dark:to-teal-900 rounded-2xl shadow-xl dark:shadow-emerald-900/20 relative overflow-hidden transform hover:rotate-0 transition-transform duration-300"
    case "bordered":
      return "bg-white dark:bg-gray-900 border-2 border-dashed border-orange-300 dark:border-orange-600 rounded-xl shadow-md relative overflow-hidden"
    default:
      return "bg-white dark:bg-gray-800 rounded-lg shadow-lg relative overflow-hidden"
  }
}

const getQuoteIconStyles = (cardType: string) => {
  switch (cardType) {
    case "geometric":
      return "text-blue-500 dark:text-blue-400 bg-blue-100 dark:bg-blue-900"
    case "rounded":
      return "text-purple-500 dark:text-purple-400 bg-purple-100 dark:bg-purple-900"
    case "tilted":
      return "text-emerald-500 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900"
    case "bordered":
      return "text-orange-500 dark:text-orange-400 bg-orange-100 dark:bg-orange-900"
    default:
      return "text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800"
  }
}

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 50

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume auto-play after 10 seconds
  }

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) goToNext()
    if (isRightSwipe) goToPrevious()
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-950">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm border dark:border-gray-700 mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Live Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 dark:text-gray-100 mb-4 sm:mb-6">
            What our users say
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-light text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover how VectoreMind is helping people build meaningful journaling habits
          </p>
        </div>

        {/* Main Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <div className="relative" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            <Card
              className={`border-0 shadow-none ${getCardStyles(currentTestimonial.cardType)} min-h-[400px] sm:min-h-[450px] md:min-h-[500px]`}
            >
              <CardContent className="p-6 sm:p-8 md:p-10 lg:p-12 h-full flex flex-col justify-center">
                {/* Quote Icon */}
                <div className="flex justify-center mb-6 sm:mb-8">
                  <div className={`p-3 sm:p-4 rounded-full ${getQuoteIconStyles(currentTestimonial.cardType)}`}>
                    <Quote className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                  </div>
                </div>

                {/* Quote Text */}
                <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-gray-700 dark:text-gray-200 leading-relaxed text-center mb-8 sm:mb-10">
                  "{currentTestimonial.quote}"
                </blockquote>

                {/* Author Info */}
                <div className="text-center">
                  <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-500 to-transparent mx-auto mb-4 sm:mb-6"></div>
                  <div className="font-semibold text-gray-800 dark:text-gray-100 text-base sm:text-lg md:text-xl mb-2">
                    {currentTestimonial.author}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 font-light text-sm sm:text-base">
                    {currentTestimonial.role}
                    <span className="hidden sm:inline"> • {currentTestimonial.location}</span>
                  </div>
                </div>

                {/* Decorative Elements */}
                {currentTestimonial.cardType === "geometric" && (
                  <div className="absolute top-4 right-4 w-6 h-6 sm:w-8 sm:h-8 bg-blue-200 dark:bg-blue-800 transform rotate-45 opacity-50"></div>
                )}
                {currentTestimonial.cardType === "rounded" && (
                  <div className="absolute -top-2 -right-2 w-4 h-4 sm:w-6 sm:h-6 bg-purple-300 dark:bg-purple-700 rounded-full opacity-60"></div>
                )}
                {currentTestimonial.cardType === "tilted" && (
                  <div className="absolute bottom-4 left-4 flex gap-1">
                    <div className="w-2 h-2 bg-emerald-400 dark:bg-emerald-500 rounded-full opacity-60"></div>
                    <div className="w-2 h-2 bg-emerald-300 dark:bg-emerald-600 rounded-full opacity-40"></div>
                    <div className="w-2 h-2 bg-emerald-200 dark:bg-emerald-700 rounded-full opacity-20"></div>
                  </div>
                )}
                {currentTestimonial.cardType === "bordered" && (
                  <div className="absolute bottom-4 left-4 flex gap-1">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-400 dark:bg-orange-500 rounded-full"></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-300 dark:bg-orange-600 rounded-full"></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-200 dark:bg-orange-700 rounded-full"></div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation Controls - Moved to bottom */}
        <div className="flex flex-col items-center mt-8 sm:mt-12 space-y-6">
          {/* Navigation Arrows and Dots in a single row */}
          <div className="flex items-center justify-center w-full gap-4 sm:gap-6 md:gap-8">
            {/* Previous Button */}
            <Button
              variant="outline"
              size="lg"
              className="h-10 sm:h-12 px-3 sm:px-5 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-md hover:shadow-lg transition-all duration-300 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 border dark:border-gray-700"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">Previous</span>
            </Button>

            {/* Dot Indicators */}
            <div className="flex justify-center space-x-2 sm:space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`relative transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? "w-8 sm:w-10 md:w-12 h-2 sm:h-3 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400"
                      : "w-2 sm:w-3 h-2 sm:h-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  {index === currentIndex && (
                    <div className="absolute inset-0 bg-white dark:bg-gray-200 rounded-full animate-pulse opacity-30"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <Button
              variant="outline"
              size="lg"
              className="h-10 sm:h-12 px-3 sm:px-5 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-md hover:shadow-lg transition-all duration-300 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 border dark:border-gray-700"
              onClick={goToNext}
            >
              <span className="text-xs sm:text-sm">Next</span>
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 ml-1 sm:ml-2" />
            </Button>
          </div>

          {/* Progress Indicator */}
          <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full border dark:border-gray-700">
            <span className="text-sm text-gray-500 dark:text-gray-400 font-light">
              {currentIndex + 1} of {testimonials.length}
            </span>
            <div className="w-16 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 transition-all duration-500 rounded-full"
                style={{ width: `${((currentIndex + 1) / testimonials.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Mobile Swipe Hint */}
          <div className="text-center sm:hidden">
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
              <ChevronLeft className="h-3 w-3" />
              Swipe to navigate
              <ChevronRight className="h-3 w-3" />
            </p>
          </div>
        </div>

        {/* Testimonial Preview Cards (Hidden on mobile) */}
        <div className="hidden lg:flex justify-center mt-12 space-x-4 opacity-60">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              className={`text-left p-4 rounded-lg border transition-all duration-300 max-w-xs ${
                index === currentIndex
                  ? "border-blue-300 dark:border-blue-600 bg-blue-50 dark:bg-blue-950"
                  : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
              onClick={() => goToSlide(index)}
            >
              <div className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">{testimonial.author}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{testimonial.role}</div>
              <div className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                "{testimonial.quote.substring(0, 80)}..."
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
