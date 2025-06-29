import { Rocket, Feather, CheckCircle } from "lucide-react";

export default function HowItWorks() {
    const steps = [
        {
            icon: Rocket,
            title: "Launch Vector Mind",
            description: "Start your journey—capture every thought effortlessly.",
            number: "01",
        },
        {
            icon: Feather,
            title: "Unleash Your Creativity",
            description: "Let your ideas flow freely and watch your mind expand!",
            number: "02",
        },
        {
            icon: CheckCircle,
            title: "Celebrate Progress",
            description: "Finish strong and get ready for your next breakthrough.",
            number: "03",
        },
    ];

    return (
        <section className="py-16 px-2 sm:px-4">
            <div className="max-w-3xl md:max-w-4xl mx-auto">
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 dark:text-gray-100 mb-2 sm:mb-4  poppins-400">
                        How It Works
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg font-light poppins-200">
                        Unleashes in three simple steps
                    </p>
                </div>
                <ol className="relative ml-6">
                    {steps.map((step, idx) => (
                        <li key={step.number} className="relative flex items-start mb-12 last:mb-0">
                            {/* Connector line */}
                            <span className="absolute left-3 top-10 w-px h-full bg-gray-300 dark:bg-gray-700 z-0"
                                style={{
                                    height: idx === steps.length - 1 ? "2.5rem" : "100%",
                                    display: idx === steps.length - 1 ? "none" : "block",
                                }}
                            />
                            {/* Node */}
                            <span className="relative z-10 flex items-center justify-center w-10 h-10 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 rounded-full shadow-md">
                                <step.icon className="w-6 h-6 text-gray-800 dark:text-white" strokeWidth={1.5} />
                            </span>
                            {/* Content */}
                            <div className="ml-6">
                                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">{step.number}</span>
                                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-1 sm:mb-2 lexend-400 text-gray-900 dark:text-white">
                                    {step.title}
                                </h3>
                                <p className="text-gray-800 dark:text-gray-200 font-light caveat-600 text-sm sm:text-base">
                                    {step.description}
                                </p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
