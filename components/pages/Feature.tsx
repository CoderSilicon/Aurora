
import { Edit3, Shield, TrendingUp, Sparkles } from "lucide-react"

export default function FeaturePage() {
  const features = [
    {
      icon: Edit3,
      title: "Digital Journal",
      description: "Beautiful writing space for your thoughts",
      color: "orange",
      href: "/features/digital-journal",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "End-to-end encrypted & secure",
      color: "green",
      href: "/features/privacy",
    },
    {
      icon: TrendingUp,
      title: "Daily Insights",
      description: "Track patterns & personal growth",
      color: "blue",
      href: "/features/insights",
    },
    {
      icon: Sparkles,
      title: "AI Assistant",
      description: "Smart prompts & writing guidance",
      color: "purple",
      href: "/features/ai-assistant",
    },
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      orange: {
        bg: "from-orange-400 to-orange-500",
        glow: "shadow-orange-200 dark:shadow-orange-900/50",
      },
      green: {
        bg: "from-green-400 to-green-500",
        glow: "shadow-green-200 dark:shadow-green-900/50",
      },
      blue: {
        bg: "from-blue-400 to-blue-500",
        glow: "shadow-blue-200 dark:shadow-blue-900/50",
      },
      purple: {
        bg: "from-[#00bfa6] to-[#00bfa6]",
        glow: "shadow-[#00bfa6]-200 dark:shadow-[#00bfa6]-900/50",
      },
    }
    return colors[color as keyof typeof colors] || colors.orange
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-950">
      <div className="container mx-auto px-4 py-8 sm:py-16 lg:py-20">
        {/* Minimal Header */}
        <div className="text-center mb-12 sm:mb-20">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light text-gray-900 dark:text-white mb-4 caveat-600">
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
            const colors = getColorClasses(feature.color)

            return (
              <div key={index}  className="group">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-200/50 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-800 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">
                  {/* Glowing Icon */}
                  <div
                    className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg ${colors.glow} group-hover:shadow-xl group-hover:scale-110 transition-all duration-500`}
                  >
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>

                  {/* Minimal Text */}
                  <div className="text-center">
                    <h3 className="text-xl sm:text-2xl font-medium text-gray-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
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
