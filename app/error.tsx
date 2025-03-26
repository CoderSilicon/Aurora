"use client"
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="h-24 w-24 mx-auto bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center">
              <AlertCircle className="h-12 w-12 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-700/20 dark:from-amber-400/10 dark:to-amber-600/10 blur-3xl -z-10" />
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold text-amber-900 dark:text-amber-100">
              Something Went Wrong
            </h2>
            <p className="text-lg text-amber-700 dark:text-amber-300">
              We apologize for the inconvenience. Please try again or contact support if the problem persists.
            </p>
            {error.digest && (
              <p className="text-sm text-amber-500 dark:text-amber-400 font-mono">
                Error ID: {error.digest}
              </p>
            )}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              onClick={reset}
              className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white"
            >
              Try Again
            </Button>
            <Link href="/">
              <Button className="border-amber-600 dark:border-amber-500 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-slate-900">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-amber-600 dark:border-amber-500 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-slate-900"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 