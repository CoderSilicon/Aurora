import { Edit3, Shield, TrendingUp, Sparkles } from "lucide-react"

export default function FeaturePage() {
  const features = [
    {
      icon: Edit3,
      title: "Digital Journal",
      description: "Beautiful writing space for your thoughts",
      href: "/features/digital-journal",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "End-to-end encrypted & secure",
      href: "/features/privacy",
    },
    {
      icon: TrendingUp,
      title: "Daily Insights",
      description: "Track patterns & personal growth",
      href: "/features/insights",
    },
    {
      icon: Sparkles,
      title: "AI Assistant",
      description: "Smart prompts & writing guidance",
      href: "/features/ai-assistant",
    },
  ]

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-8 sm:py-16 lg:py-20">
        {/* Minimal Header */}
        <div className="text-center mb-12 sm:mb-20">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light text-black dark:text-white mb-4 caveat-600">
            Features
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg sm:text-xl max-w-md mx-auto caveat-400 ">
            Simple. Secure. Intelligent.
          </p>
        </div>

        {/* Minimal Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <div key={index} className="group">
                <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 lg:p-10 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">
                  {/* Icon */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow group-hover:scale-110 transition-all duration-500">
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-black dark:text-white" />
                  </div>

                  {/* Minimal Text */}
                  <div className="text-center">
                    <h3 className="text-xl sm:text-2xl font-medium text-black dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
