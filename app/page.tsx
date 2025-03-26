"use client"
import React from "react";
import {
  Book,
  Sparkles,
  Lock,
  Calendar,
  ChevronRight,
  BarChart2,
  FileText,
  LayoutDashboard,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

import { TestimonialCarousel } from "@/components/ui/testimonial-carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

import faqs from "@/data/faqs.json";

const features = [
  {
    icon: Book,
    title: "Neural Writing",
    description:
      "Express your thoughts with our AI-enhanced editor that adapts to your writing style.",
  },
  {
    icon: Sparkles,
    title: "Mind Mapping",
    description:
      "Visualize your thoughts with dynamic mind maps and connection patterns.",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description:
      "Your mind's content is protected with enterprise-grade encryption.",
  },
  {
    icon: LayoutDashboard,
    title: "Kanban Board",
    description:
      "Organize tasks and ideas with our intuitive drag-and-drop board.",
  },
  {
    icon: FileText,
    title: "Journal Tasks",
    description:
      "Convert your journal entries into actionable tasks and track progress.",
  },
  {
    icon: CheckCircle,
    title: "Smart Todo",
    description:
      "AI-powered task management with intelligent prioritization.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function LandingPage() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const kanbanRef = useRef(null);
  const journalRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isFeaturesInView = useInView(featuresRef, { once: true });
  const isKanbanInView = useInView(kanbanRef, { once: true });
  const isJournalInView = useInView(journalRef, { once: true });

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-12 lg:pb-16">
        {/* Hero Section */}
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center space-y-4 sm:space-y-6 lg:space-y-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 dark:from-amber-400 dark:via-amber-300 dark:to-amber-200 josefin-700"
          >
            Vector Mind: <br /> <span>Where Thoughts Take Shape</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-700 dark:from-amber-100 dark:via-amber-200 dark:to-amber-300 bg-clip-text text-transparent font-medium px-4 sm:px-0"
          >
            Elevate your note-taking with AI-powered organization. Capture ideas, create visual connections, and unlock your productivity potential.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-amber-50 dark:from-slate-900 via-transparent to-transparent pointer-events-none z-10" />
            <div className="bg-white dark:bg-slate-900 rounded-lg sm:rounded-2xl p-4 sm:p-6 max-w-4xl mx-auto shadow-xl border border-amber-100 dark:border-amber-900/20">
              <div className="border-b border-amber-100 dark:border-amber-900/20 pb-4 sm:pb-6 mb-4 sm:mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 dark:text-amber-400" />
                  <span className="text-amber-900 dark:text-amber-100 font-medium text-base sm:text-lg">
                    Today&rsquo;s Mind Map
                  </span>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-amber-200 dark:bg-amber-800" />
                  <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-amber-300 dark:bg-amber-700" />
                  <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-amber-400 dark:bg-amber-600" />
                </div>
              </div>
              <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-amber-900 dark:text-amber-100">
                  Explore Your Mind's Patterns
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                  <div className="space-y-3 sm:space-y-4">
                    <Skeleton className="h-4 sm:h-6 bg-amber-100 dark:bg-amber-900/50 rounded w-3/4" />
                    <Skeleton className="h-4 sm:h-6 bg-amber-100 dark:bg-amber-900/50 rounded w-full" />
                    <Skeleton className="h-4 sm:h-6 bg-amber-100 dark:bg-amber-900/50 rounded w-2/3" />
                    <Skeleton className="h-4 sm:h-6 bg-amber-100 dark:bg-amber-900/50 rounded w-5/6" />
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <Skeleton className="h-4 sm:h-6 bg-amber-100 dark:bg-amber-900/50 rounded w-full" />
                    <Skeleton className="h-4 sm:h-6 bg-amber-100 dark:bg-amber-900/50 rounded w-4/5" />
                    <Skeleton className="h-4 sm:h-6 bg-amber-100 dark:bg-amber-900/50 rounded w-3/4" />
                    <Skeleton className="h-4 sm:h-6 bg-amber-100 dark:bg-amber-900/50 rounded w-full" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
                  <Skeleton className="h-16 sm:h-24 bg-amber-100 dark:bg-amber-900/50 rounded" />
                  <Skeleton className="h-16 sm:h-24 bg-amber-100 dark:bg-amber-900/50 rounded" />
                  <Skeleton className="h-16 sm:h-24 bg-amber-100 dark:bg-amber-900/50 rounded" />
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-4 px-4 sm:px-0"
          >
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button
                variant="default"
                className="w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-6 rounded-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white"
              >
                Start Mapping <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            <Link href="#features" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-6 rounded-full border-amber-600 dark:border-amber-500 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-slate-900"
              >
                Explore Features
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Feature Cards */}
        <motion.section
          ref={featuresRef}
          variants={containerVariants}
          initial="hidden"
          animate={isFeaturesInView ? "visible" : "hidden"}
          className="mt-16 sm:mt-20 lg:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="shadow-lg border-amber-100 dark:border-amber-900/20 hover:border-amber-200 dark:hover:border-amber-800 transition-colors bg-white dark:bg-slate-900">
                <CardContent className="p-4 sm:p-6">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="font-semibold text-lg sm:text-xl text-amber-900 dark:text-amber-100 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-amber-700 dark:text-amber-300 text-sm sm:text-base">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.section>

        {/* Kanban Board Showcase */}
        <motion.div
          ref={kanbanRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isKanbanInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="mt-16 sm:mt-20 lg:mt-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isKanbanInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4 sm:space-y-6"
            >
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center">
                <LayoutDashboard className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-amber-900 dark:text-amber-100">
                Visual Task Management
              </h3>
              <p className="text-base sm:text-lg text-amber-700 dark:text-amber-300">
                Experience seamless task organization with our Kanban board:
              </p>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-400 dark:bg-amber-500" />
                  <span className="text-sm sm:text-base text-amber-700 dark:text-amber-300">Drag-and-drop task management</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-400 dark:bg-amber-500" />
                  <span className="text-sm sm:text-base text-amber-700 dark:text-amber-300">Customizable columns and workflows</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-400 dark:bg-amber-500" />
                  <span className="text-sm sm:text-base text-amber-700 dark:text-amber-300">Progress tracking and analytics</span>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isKanbanInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-3 sm:space-y-4 bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border border-amber-100 dark:border-amber-900/20"
            >
              {/* Kanban Board Preview */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-3">
                  <div className="h-6 bg-amber-100 dark:bg-amber-900/50 rounded w-24"></div>
                  <div className="space-y-2">
                    <div className="h-16 bg-amber-50 dark:bg-amber-900/30 rounded"></div>
                    <div className="h-16 bg-amber-50 dark:bg-amber-900/30 rounded"></div>
                    <div className="h-16 bg-amber-50 dark:bg-amber-900/30 rounded"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-6 bg-amber-100 dark:bg-amber-900/50 rounded w-24"></div>
                  <div className="space-y-2">
                    <div className="h-16 bg-amber-50 dark:bg-amber-900/30 rounded"></div>
                    <div className="h-16 bg-amber-50 dark:bg-amber-900/30 rounded"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-6 bg-amber-100 dark:bg-amber-900/50 rounded w-24"></div>
                  <div className="space-y-2">
                    <div className="h-16 bg-amber-50 dark:bg-amber-900/30 rounded"></div>
                    <div className="h-16 bg-amber-50 dark:bg-amber-900/30 rounded"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Journal Tasks Showcase */}
        <motion.div
          ref={journalRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isJournalInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="mt-16 sm:mt-20 lg:mt-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isJournalInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-3 sm:space-y-4 bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border border-amber-100 dark:border-amber-900/20 md:order-2"
            >
              {/* Journal Tasks Preview */}
              <div className="space-y-4">
                <div className="h-8 bg-amber-100 dark:bg-amber-900/50 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-amber-50 dark:bg-amber-900/30 rounded w-full"></div>
                  <div className="h-4 bg-amber-50 dark:bg-amber-900/30 rounded w-5/6"></div>
                  <div className="h-4 bg-amber-50 dark:bg-amber-900/30 rounded w-4/6"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-6 w-6 rounded-full bg-amber-200 dark:bg-amber-800"></div>
                  <div className="h-6 w-6 rounded-full bg-amber-300 dark:bg-amber-700"></div>
                  <div className="h-6 w-6 rounded-full bg-amber-400 dark:bg-amber-600"></div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isJournalInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4 sm:space-y-6 md:order-1"
            >
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center">
                <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-amber-900 dark:text-amber-100">
                Journal to Tasks
              </h3>
              <p className="text-base sm:text-lg text-amber-700 dark:text-amber-300">
                Transform your journal entries into actionable tasks:
              </p>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-400 dark:bg-amber-500" />
                  <span className="text-sm sm:text-base text-amber-700 dark:text-amber-300">AI-powered task extraction</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-400 dark:bg-amber-500" />
                  <span className="text-sm sm:text-base text-amber-700 dark:text-amber-300">Smart task categorization</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-400 dark:bg-amber-500" />
                  <span className="text-sm sm:text-base text-amber-700 dark:text-amber-300">Progress tracking</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Testimonials Carousel */}
        <TestimonialCarousel />

        {/* FAQ Section */}
        <div className="mt-16 sm:mt-20 lg:mt-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-100/20 to-amber-50/20 dark:from-amber-900/10 dark:to-amber-800/10 rounded-3xl transform -skew-y-2"></div>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-amber-900 dark:text-amber-100 mb-8 sm:mb-12 relative">
            <span className="inline-block transform hover:scale-105 transition-transform duration-300">
              Curious About Something?
            </span>
          </h2>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto relative">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="group transition-all duration-300 hover:scale-[1.02] my-2"
              >
                <AccordionTrigger className="text-amber-900 dark:text-amber-100 text-base sm:text-lg group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
                  <span className="flex items-center">
                    <span className="mr-3 opacity-70">#{index + 1}</span>
                    {faq.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-amber-700 dark:text-amber-300 text-sm sm:text-base bg-amber-50/50 dark:bg-amber-900/20 rounded-lg p-4 mt-2 transform transition-all duration-300">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA Section */}
        <div className="mt-16 sm:mt-20 lg:mt-24">
          <Card className="bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-900/50 dark:to-amber-900/30">
            <CardContent className="p-6 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 dark:text-amber-100 mb-4 sm:mb-6">
                Start Mapping Your Mind Today
              </h2>
              <p className="text-base sm:text-lg text-amber-700 dark:text-amber-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
                Join thousands of thinkers who have discovered the power of visual thought organization.
              </p>
              <Button size="lg" variant="default" className="animate-bounce bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white w-full sm:w-auto">
                Begin Your Journey <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
