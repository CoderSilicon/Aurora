import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-gray-900 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white transform rotate-45"></div>
            </div>
          </div>
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-4">PRICING PLANS</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{"It's really free. But you can do more."}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Select from our flexible plans designed to accommodate everything from personal projects to professional
            creative workflows.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 bg-gray-100 rounded-lg px-4 py-2 inline-flex">
            <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
            Premium features like Code Mode, Share are free during the beta.
          </div>
        </div>

        {/* Pricing Cards - Vertical Layout */}
        <div className="max-w-md mx-auto space-y-6 mb-16">
          {/* Free Plan - Basic */}
          <Card className="relative">
            <CardHeader className="text-center pb-4">
              <h3 className="text-2xl font-bold">Free</h3>
              <p className="text-gray-600">Basic with daily limits</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm">5 daily standard messages</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm">Custom API keys</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm">App prompts</span>
              </div>
            </CardContent>
          </Card>

          {/* Free Plan - Premium */}
          <Card className="relative">
            <CardHeader className="text-center pb-4">
              <h3 className="text-2xl font-bold">Free</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm">0 premium messages</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm">Voice to text</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm">Code mode</span>
              </div>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="relative border-2 border-blue-500">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-blue-500 text-white">Popular</Badge>
            </div>
            <CardHeader className="text-center pb-4">
              <h3 className="text-2xl font-bold">Pro</h3>
              <p className="text-gray-600">Premium with higher limits</p>
              <div className="mt-4">
                <span className="text-3xl font-bold">$10</span>
                <span className="text-gray-600">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm">500 monthly standard messages</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm">100 monthly premium messages</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm">Access to Claude 3.5/3.7 & Gemini Pro</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm">Custom models</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm">No daily limits</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm">Export to Figma</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm">Prompt Builder</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm">All Free features included</span>
              </div>
              <Button className="w-full bg-black text-white hover:bg-gray-800 mt-6">Subscribe</Button>
            </CardContent>
          </Card>

          {/* Max Plan */}
          <Card className="relative">
            <CardHeader className="text-center pb-4">
              <h3 className="text-2xl font-bold">Max</h3>
              <p className="text-gray-600">Maximum for power users</p>
              <div className="mt-4">
                <span className="text-3xl font-bold">$20</span>
                <span className="text-gray-600">/month</span>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Custom Solutions */}
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-4">CUSTOM SOLUTIONS</p>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need something specific?</h2>
            <p className="text-gray-600">
              Contact us for custom pricing options or to request specific features that would help your workflow.
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-4">SUPPORT</p>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Feature requests</h2>
            <p className="text-gray-600">
              {
                "Have ideas for improvements? We'd love to hear them. We're available to answer any questions. Contact us"
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
