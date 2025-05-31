import React from "react";
import {
  Brain,
  Lightbulb,
  Rocket,
  Users,
  Code2,
  Heart,
  Coffee,
  Sparkles,
  Zap,
  Target,
  Globe,
  Shield,
  Star,
  Award,
  HeartHandshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const milestones = [
  {
    year: "2023",
    title: "The Lightbulb Moment",
    description: "As a student, I had a brilliant idea while staring at a blank page. The rest is history (and a lot of coffee).",
    icon: Lightbulb,
  },
  {
    year: "2024",
    title: "The Launch",
    description: "I launched Vector Mind to the world, powered by AI and Cursor. The world said 'Finally!'",
    icon: Rocket,
  },
  {
    year: "2024",
    title: "The Growth",
    description: "My user base grew faster than my assignment deadlines.",
    icon: Users,
  },
];

const teamValues = [
  {
    icon: Brain,
    title: "AI-Powered Innovation",
    description: "I leverage cutting-edge AI to make your thoughts flow like a river.",
  },
  {
    icon: Heart,
    title: "Student-First Approach",
    description: "Built by a student, for students. No more late-night assignment panics!",
  },
  {
    icon: Code2,
    title: "Cursor Magic",
    description: "Crafted with Cursor, the AI-powered IDE that makes coding dreams come true.",
  },
  {
    icon: Coffee,
    title: "Coffee Driven",
    description: "Powered by coffee, AI, and the occasional pizza during study sessions.",
  },
];

const funFacts = [
  {
    icon: Sparkles,
    title: "Fun Fact #1",
    description: "I've consumed enough coffee to power a small AI model.",
  },
  {
    icon: Zap,
    title: "Fun Fact #2",
    description: "I once debugged for 12 hours straight. The bug was a missing semicolon (thanks Cursor for catching it next time!).",
  },
  {
    icon: Target,
    title: "Fun Fact #3",
    description: "My AI assistant has better attendance than I do at 8 AM lectures.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/50 to-transparent dark:from-amber-900/20 dark:to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 dark:from-amber-400 dark:via-amber-300 dark:to-amber-200 josefin-700">
              (<span className="text-amber-600 dark:text-amber-400 josefin-700">VM.</span>) Story: From Coffee to Code
            </h1>
            <p className="text-lg sm:text-xl text-amber-700 dark:text-amber-300 mb-8">
              Once upon a time, in a coffee shop not so far away...
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Origin Story */}
        <div className="max-w-4xl mx-auto mb-16 sm:mb-24">
          <Card className="bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-900/30 dark:to-amber-900/20 border-amber-200 dark:border-amber-800">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 bg-amber-200 dark:bg-amber-800 rounded-full flex items-center justify-center">
                  <Coffee className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 dark:text-amber-100">
                  The Birth of Vector Mind
                </h2>
              </div>
              <div className="space-y-4 text-amber-700 dark:text-amber-300">
                <p>
                  It all started on a rainy Tuesday morning in my university's library. Armed 
                  with my third espresso of the day, I stared at a blank page, frustrated with the chaos 
                  of my thoughts. "There has to be a better way," I muttered, while my AI assistant 
                  suggested I take a break.
                </p>
                <p>
                  That's when the lightbulb moment happened (and no, it wasn't just the caffeine). What if I 
                  could create a tool that not only captures thoughts but helps organize them in a way that 
                  makes sense to our unique minds? A tool that's as beautiful as it is functional, as intuitive 
                  as it is powerful, and as smart as my AI study buddy.
                </p>
                <p>
                  And so, Vector Mind was born. Not with a bang, but with a "Eureka!" and a spilled latte 
                  (thankfully not on my laptop).
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto mb-16 sm:mb-24">
          <Card className="bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-900/40 dark:to-amber-900/30 border-amber-200 dark:border-amber-800">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 bg-amber-200 dark:bg-amber-800 rounded-full flex items-center justify-center">
                  <Target className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 dark:text-amber-100">
                  Our Mission
                </h2>
              </div>
              <p className="text-lg sm:text-xl text-amber-700 dark:text-amber-300">
                To transform the way students think, organize, and create. I'm not just building a tool; 
                I'm crafting a digital extension of your mind, powered by AI and built with Cursor. Think of me as your 
                brain's favorite study buddy, minus the awkward small talk.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Milestones */}
        <div className="max-w-4xl mx-auto mb-16 sm:mb-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-amber-900 dark:text-amber-100 mb-8">
            My Journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {milestones.map((milestone, index) => (
              <Card key={index} className="bg-white dark:bg-slate-900 border-amber-200 dark:border-amber-800">
                <CardContent className="p-6">
                  <div className="h-12 w-12 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center mb-4">
                    <milestone.icon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="text-amber-600 dark:text-amber-400 font-semibold mb-2">{milestone.year}</div>
                  <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-2">{milestone.title}</h3>
                  <p className="text-amber-700 dark:text-amber-300">{milestone.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Values */}
        <div className="max-w-4xl mx-auto mb-16 sm:mb-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-amber-900 dark:text-amber-100 mb-8">
            My Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {teamValues.map((value, index) => (
              <Card key={index} className="bg-white dark:bg-slate-900 border-amber-200 dark:border-amber-800">
                <CardContent className="p-6">
                  <div className="h-12 w-12 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-2">{value.title}</h3>
                  <p className="text-amber-700 dark:text-amber-300">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Fun Facts */}
        <div className="max-w-4xl mx-auto mb-16 sm:mb-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-amber-900 dark:text-amber-100 mb-8">
            Fun Facts About Me
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {funFacts.map((fact, index) => (
              <Card key={index} className="bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-900/30 dark:to-amber-900/20 border-amber-200 dark:border-amber-800">
                <CardContent className="p-6">
                  <div className="h-12 w-12 bg-amber-200 dark:bg-amber-800 rounded-full flex items-center justify-center mb-4">
                    <fact.icon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-2">{fact.title}</h3>
                  <p className="text-amber-700 dark:text-amber-300">{fact.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-900/50 dark:to-amber-900/30">
            <CardContent className="p-8 sm:p-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 dark:text-amber-100 mb-4">
                Ready to Join My Story?
              </h2>
              <p className="text-lg text-amber-700 dark:text-amber-300 mb-8">
                Be part of the next chapter in my journey. Start organizing your thoughts today!
              </p>
              <Link href="/dashboard">
                <Button className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white px-8 py-6 rounded-full text-lg">
                  Start Your Journey <Rocket className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
