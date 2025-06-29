import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const HeroPage = () => {
  const textRefs = useRef<(HTMLHeadingElement | HTMLParagraphElement)[]>([]);

  useEffect(() => {
    if (textRefs.current) {
      gsap.from(textRefs.current, {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      });
    }
  }, []);

  return (
    <>
      <div className="relative">
        <div className="max-w-5xl mx-auto text-center space-y-4 sm:space-y-6 lg:space-y-8">
          <div className="min-h-screen flex flex-col justify-center items-center">
            <h1
              ref={el => {
                textRefs.current[0] = el!;
              }}
              className="text-5xl sm:text-6xl md:text-8xl lg:text-7xl font-extrabold mb-6 sm:mb-8 lexend-400 tracking-normal leading-tight "
            >
              Write what u desire, not what u forced to.
            </h1>
            <p
              ref={el => {
              textRefs.current[1] = el!;
              }}
              className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 text-gray-600 dark:text-gray-300 font-medium max-w-3xl mx-auto lexend-300 leading-relaxed"
            >
              In any realm, at any hour, in any place u desire!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 px-4 sm:px-0"></div>
        </div>
      </div>
    </>
  );
};

export default HeroPage;
