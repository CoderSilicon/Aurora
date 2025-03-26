"use client"
import React from "react";
import { Book, FileText, CheckSquare, Brain, LayoutDashboard, Mail, Sparkles, Lock, Calendar, BarChart2, Tag, Folder, Search, Share2, Download, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: FileText,
    title: "Journal Notes",
    description: "Create and organize your journal entries with our powerful note-taking system",
    sections: [
      {
        title: "Creating Notes",
        steps: [
          "Click the 'New Note' button in your dashboard",
          "Choose between different note types (Text, Mind Map, or Task)",
          "Add your thoughts, ideas, or reflections",
          "Use rich text formatting for better organization",
          "Add images, links, and attachments"
        ]
      },
      {
        title: "Organizing Notes",
        steps: [
          "Use tags to categorize your notes",
          "Create folders for different topics or projects",
          "Use the search function to find specific notes",
          "Sort notes by date, title, or last modified",
          "Pin important notes to the top"
        ]
      },
      {
        title: "Advanced Features",
        steps: [
          "Use templates for recurring notes",
          "Enable version history to track changes",
          "Export notes in various formats",
          "Share notes with collaborators",
          "Set reminders for important entries"
        ]
      }
    ]
  },
  {
    icon: CheckSquare,
    title: "Todo Lists",
    description: "Master task management with our smart todo system",
    sections: [
      {
        title: "Creating Tasks",
        steps: [
          "Create a new todo list from the dashboard",
          "Add tasks with due dates and priorities",
          "Set task dependencies",
          "Add subtasks for complex projects",
          "Attach files and notes to tasks"
        ]
      },
      {
        title: "Managing Tasks",
        steps: [
          "Use the drag-and-drop interface to organize tasks",
          "Mark tasks as complete with one click",
          "Set reminders for important deadlines",
          "Filter tasks by status, priority, or due date",
          "Use the Kanban board view for visual organization"
        ]
      },
      {
        title: "Smart Features",
        steps: [
          "AI-powered task suggestions",
          "Automatic task prioritization",
          "Progress tracking and analytics",
          "Task templates for recurring items",
          "Integration with calendar"
        ]
      }
    ]
  },
  {
    icon: Brain,
    title: "Mind Mapping",
    description: "Visualize your thoughts and ideas with our mind mapping feature",
    sections: [
      {
        title: "Creating Mind Maps",
        steps: [
          "Start a new mind map from the dashboard",
          "Add your central topic or idea",
          "Create branches for related concepts",
          "Use colors and icons to categorize ideas",
          "Connect related concepts with arrows"
        ]
      },
      {
        title: "Customizing Mind Maps",
        steps: [
          "Choose from various layout options",
          "Customize colors and themes",
          "Add images and icons",
          "Adjust spacing and alignment",
          "Use different node styles"
        ]
      },
      {
        title: "Advanced Features",
        steps: [
          "AI-powered branch suggestions",
          "Convert mind maps to outlines",
          "Export to various formats",
          "Collaborative mind mapping",
          "Template library"
        ]
      }
    ]
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard Organization",
    description: "Customize your workspace for maximum productivity",
    sections: [
      {
        title: "Layout Customization",
        steps: [
          "Arrange your widgets in the dashboard",
          "Create custom folders for different projects",
          "Use the quick access bar for frequent actions",
          "Set up your preferred view (list, grid, or kanban)",
          "Enable/disable features based on your needs"
        ]
      },
      {
        title: "Widgets and Tools",
        steps: [
          "Add calendar widget for scheduling",
          "Include progress tracking charts",
          "Set up task overview widgets",
          "Add note preview widgets",
          "Customize widget sizes and positions"
        ]
      },
      {
        title: "Personalization",
        steps: [
          "Choose your preferred theme",
          "Set up keyboard shortcuts",
          "Configure notification preferences",
          "Customize the sidebar layout",
          "Set up workspace templates"
        ]
      }
    ]
  },
  {
    icon: Sparkles,
    title: "AI Features",
    description: "Leverage AI to enhance your productivity",
    sections: [
      {
        title: "Writing Assistance",
        steps: [
          "Get AI-powered writing suggestions",
          "Use smart templates based on context",
          "Get grammar and style improvements",
          "Generate summaries of long notes",
          "Get writing prompts when stuck"
        ]
      },
      {
        title: "Organization Help",
        steps: [
          "AI-powered task suggestions",
          "Smart categorization of notes",
          "Automatic tag suggestions",
          "Content organization recommendations",
          "Priority management assistance"
        ]
      },
      {
        title: "Smart Features",
        steps: [
          "Predictive task scheduling",
          "Content relevance suggestions",
          "Smart search improvements",
          "Pattern recognition in notes",
          "Personalized productivity tips"
        ]
      }
    ]
  },
  {
    icon: Lock,
    title: "Security & Privacy",
    description: "Keep your thoughts and data secure",
    sections: [
      {
        title: "Data Protection",
        steps: [
          "Enterprise-grade encryption",
          "Secure cloud storage",
          "Regular security updates",
          "Two-factor authentication",
          "Secure data backup"
        ]
      },
      {
        title: "Privacy Controls",
        steps: [
          "Granular sharing permissions",
          "Private note options",
          "Data export controls",
          "Activity tracking settings",
          "Account security settings"
        ]
      },
      {
        title: "Compliance",
        steps: [
          "GDPR compliance",
          "Data retention policies",
          "Privacy policy adherence",
          "Secure data transmission",
          "Regular security audits"
        ]
      }
    ]
  }
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

export default function DocsPage() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const tipsRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isFeaturesInView = useInView(featuresRef, { once: true });
  const isTipsInView = useInView(tipsRef, { once: true });

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/50 to-transparent dark:from-amber-900/20 dark:to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 dark:from-amber-400 dark:via-amber-300 dark:to-amber-200 josefin-700"
            >
              (<span className="text-amber-600 dark:text-amber-400 josefin-700">VM.</span>) Complete User Guide
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl text-amber-700 dark:text-amber-300 mb-8"
            >
              Master Vector Mind's powerful features with our comprehensive guide. From basic note-taking to advanced AI features, we've got you covered.
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <motion.div
          ref={featuresRef}
          variants={containerVariants}
          initial="hidden"
          animate={isFeaturesInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="h-full bg-white dark:bg-slate-900 border-amber-100 dark:border-amber-900/20 hover:border-amber-200 dark:hover:border-amber-800 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                        {feature.title}
                      </h2>
                      <p className="text-amber-700 dark:text-amber-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {feature.sections.map((section, sectionIndex) => (
                      <motion.div
                        key={sectionIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isFeaturesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
                      >
                        <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-3">
                          {section.title}
                        </h3>
                        <ul className="space-y-2">
                          {section.steps.map((step, stepIndex) => (
                            <motion.li
                              key={stepIndex}
                              initial={{ opacity: 0, x: -20 }}
                              animate={isFeaturesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                              transition={{ duration: 0.5, delay: (sectionIndex * 0.1) + (stepIndex * 0.05) }}
                              className="flex items-start gap-2 text-amber-700 dark:text-amber-300"
                            >
                              <div className="h-2 w-2 rounded-full bg-amber-400 dark:bg-amber-500 mt-2" />
                              <span>{step}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Reference */}
        <motion.div
          ref={tipsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isTipsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="mt-16 sm:mt-20"
        >
          <h2 className="text-3xl font-bold text-amber-900 dark:text-amber-100 mb-8 text-center">
            Quick Reference
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isTipsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-amber-100 dark:border-amber-900/20"
            >
              <h3 className="text-xl font-semibold text-amber-900 dark:text-amber-100 mb-4">
                Keyboard Shortcuts
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center justify-between text-amber-700 dark:text-amber-300">
                  <span>New Note</span>
                  <span className="font-mono">Ctrl + N</span>
                </li>
                <li className="flex items-center justify-between text-amber-700 dark:text-amber-300">
                  <span>New Task</span>
                  <span className="font-mono">Ctrl + T</span>
                </li>
                <li className="flex items-center justify-between text-amber-700 dark:text-amber-300">
                  <span>New Mind Map</span>
                  <span className="font-mono">Ctrl + M</span>
                </li>
                <li className="flex items-center justify-between text-amber-700 dark:text-amber-300">
                  <span>Toggle Dark Mode</span>
                  <span className="font-mono">Ctrl + D</span>
                </li>
                <li className="flex items-center justify-between text-amber-700 dark:text-amber-300">
                  <span>Search</span>
                  <span className="font-mono">Ctrl + K</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isTipsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-amber-100 dark:border-amber-900/20"
            >
              <h3 className="text-xl font-semibold text-amber-900 dark:text-amber-100 mb-4">
                Best Practices
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-amber-700 dark:text-amber-300">
                  <div className="h-2 w-2 rounded-full bg-amber-400 dark:bg-amber-500 mt-2" />
                  <span>Use consistent tags for better organization</span>
                </li>
                <li className="flex items-start gap-2 text-amber-700 dark:text-amber-300">
                  <div className="h-2 w-2 rounded-full bg-amber-400 dark:bg-amber-500 mt-2" />
                  <span>Regularly review and update your mind maps</span>
                </li>
                <li className="flex items-start gap-2 text-amber-700 dark:text-amber-300">
                  <div className="h-2 w-2 rounded-full bg-amber-400 dark:bg-amber-500 mt-2" />
                  <span>Break down complex tasks into subtasks</span>
                </li>
                <li className="flex items-start gap-2 text-amber-700 dark:text-amber-300">
                  <div className="h-2 w-2 rounded-full bg-amber-400 dark:bg-amber-500 mt-2" />
                  <span>Use templates for recurring content</span>
                </li>
                <li className="flex items-start gap-2 text-amber-700 dark:text-amber-300">
                  <div className="h-2 w-2 rounded-full bg-amber-400 dark:bg-amber-500 mt-2" />
                  <span>Regularly backup your important notes</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isTipsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 sm:mt-20 text-center"
        >
          <h2 className="text-3xl font-bold text-amber-900 dark:text-amber-100 mb-4">
            Need More Help?
          </h2>
          <p className="text-amber-700 dark:text-amber-300 mb-8">
            Our support team is here to help you get the most out of Vector Mind.
          </p>
          <Link href="/contact">
            <Button className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white">
              Contact Support
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 