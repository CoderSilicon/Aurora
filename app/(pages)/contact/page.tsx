"use client";

import React, { useState } from "react";
import {
  Mail,
  MessageSquare,
  Send,
  Shield,
  Rocket,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      toast.success("Message sent successfully!");
    } catch (error) {
      setSubmitStatus("error");
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/50 to-transparent dark:from-amber-900/20 dark:to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 dark:from-amber-400 dark:via-amber-300 dark:to-amber-200 josefin-700">
              (<span className="text-amber-600 dark:text-amber-400 josefin-700">VM.</span>) Get in Touch
            </h1>
            <p className="text-lg sm:text-xl text-amber-700 dark:text-amber-300 mb-8">
              Have questions or suggestions? I'd love to hear from you!
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Contact Form */}
        <div className="max-w-4xl mx-auto mb-16 sm:mb-24">
          <Card className="bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-900/30 dark:to-amber-900/20 border-amber-200 dark:border-amber-800">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 bg-amber-200 dark:bg-amber-800 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 dark:text-amber-100">
                  Send Me a Message
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-amber-700 dark:text-amber-300 mb-2"
                    >
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-white dark:bg-slate-900 border-amber-200 dark:border-amber-800 focus:border-amber-500 dark:focus:border-amber-400"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-amber-700 dark:text-amber-300 mb-2"
                    >
                      Your Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-white dark:bg-slate-900 border-amber-200 dark:border-amber-800 focus:border-amber-500 dark:focus:border-amber-400"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-amber-700 dark:text-amber-300 mb-2"
                  >
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="bg-white dark:bg-slate-900 border-amber-200 dark:border-amber-800 focus:border-amber-500 dark:focus:border-amber-400"
                    placeholder="How can I help?"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-amber-700 dark:text-amber-300 mb-2"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-white dark:bg-slate-900 border-amber-200 dark:border-amber-800 focus:border-amber-500 dark:focus:border-amber-400 min-h-[150px]"
                    placeholder="Your message here..."
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Info */}
        <div className="max-w-4xl mx-auto mb-16 sm:mb-24">
          <Card className="bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-900/40 dark:to-amber-900/30 border-amber-200 dark:border-amber-800">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 bg-amber-200 dark:bg-amber-800 rounded-full flex items-center justify-center">
                  <Mail className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 dark:text-amber-100">
                  Other Ways to Connect
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-2">
                    Email
                  </h3>
                  <p className="text-amber-700 dark:text-amber-300">
                    For direct inquiries, you can email me at{" "}
                    <a
                      href="mailto:your-email@example.com"
                      className="text-amber-600 dark:text-amber-400 hover:underline"
                    >
                      your-email@example.com
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-2">
                    Response Time
                  </h3>
                  <p className="text-amber-700 dark:text-amber-300">
                    I typically respond to messages within 24-48 hours during weekdays.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
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
                    What kind of messages do you welcome?
                  </h3>
                  <p className="text-amber-700 dark:text-amber-300">
                    I welcome all types of feedback, suggestions, bug reports, and feature requests. Your input helps make Vector Mind better for everyone!
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-2">
                    Will you respond to my message?
                  </h3>
                  <p className="text-amber-700 dark:text-amber-300">
                    Yes! I personally read and respond to every message. While I can't promise to implement every suggestion, I value your feedback and will always acknowledge your message.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-2">
                    Is my information secure?
                  </h3>
                  <p className="text-amber-700 dark:text-amber-300">
                    Absolutely! Your information is encrypted and secure. I never share your contact details with third parties.
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
                Ready to Get Started?
              </h2>
              <p className="text-lg text-amber-700 dark:text-amber-300 mb-8">
                Join thousands of students who are already using Vector Mind to organize their thoughts and boost their productivity.
              </p>
              <a href="/dashboard">
                <Button className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white px-8 py-6 rounded-full text-lg">
                  Start Free <Rocket className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
