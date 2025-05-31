import React from 'react'

const HeroPage = () => {
  return (
           <div className="max-w-5xl mx-auto text-center space-y-4 sm:space-y-6 lg:space-y-8">
             <div className="min-h-screen flex flex-col justify-center items-center">
               <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold mb-6 sm:mb-8 caveat-600 tracking-normal leading-tight">
                 Write what u desire, not what u forced to.
               </h1>
               <p className="text-xl sm:text-2xl md:text-3xl mb-8 sm:mb-10 text-gray-600 dark:text-gray-300 font-medium max-w-3xl mx-auto caveat-400 leading-relaxed">
                 In any realm, at any hour, in any place thou desires!
               </p>
             </div>
             <div className="flex flex-col sm:flex-row justify-center gap-4 px-4 sm:px-0"></div>
           </div>
   
  )
}

export default HeroPage