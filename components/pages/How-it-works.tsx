import {Rocket, Feather, CheckCircle } from "lucide-react";

export default function HowItWorks() {
    const steps = [
        {
            icon: Rocket,
            title: "Launch Vector Mind",
            description: "Start your journey—capture every thought effortlessly.",
            border: "border-indigo-500",
            number: "01",
          },
          {
            icon: Feather,
            title: "Unleash Your Creativity",
            description: "Let your ideas flow freely and watch your mind expand!",
            border: "border-teal-500",
            number: "02",
          },
          {
            icon: CheckCircle,
            title: "Celebrate Progress",
            description: "Finish strong and get ready for your next breakthrough.",
            border: "border-amber-500",
            number: "03",
          },
    ];

    return (
        <section className="py-24 px-4 ">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-gray-100 mb-4 caveat-600">How It Works</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-lg font-light caveat-400">Unleashes in three simple steps</p>
                </div>

                <div className="grid grid-cols-12 grid-rows-3 gap-4 h-[600px]">
                    {/* Step 1 */}
                    <StepTile step={steps[0]} />
                    <div className="hidden md:block col-span-4 row-span-1 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-3xl shadow-lg"></div>
                    <div className="hidden md:block col-span-4 row-span-1 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-3xl shadow-lg"></div>
                    {/* Step 2 */}
                    <StepTile step={steps[1]} />
                    {/* Step 3 */}
                    <StepTile step={steps[2]} />
                    <div className="hidden md:block col-span-4 row-span-1 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-3xl shadow-lg"></div>
                </div>
            </div>
        </section>
    );
}

function StepTile({ step }: { step: any }) {
    const Icon = step.icon;

    return (
        <div
            className={`col-span-12 md:col-span-8 row-span-1 rounded-3xl p-8 flex flex-col border-2 ${step.border}  justify-between dark:text-white shadow-xl transform hover:scale-[1.02] transition-all duration-300`}
        >
            <div className="flex items-start justify-between">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                    <Icon className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <span className="dark:text-white/60  text-sm font-medium">{step.number}</span>
            </div>
            <div>
                <h3 className="text-2xl font-semibold mb-2 lexend-400">{step.title}</h3>
                <p className="dark:text-white/90 font-light caveat-600">{step.description}</p>
            </div>
        </div>
    );
}
