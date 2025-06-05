import React, { useEffect, useRef } from "react";
import gsap from 'gsap';

const AnimatedTitle = ({ children, containerClass }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
        },
      });

      titleAnimation.to(".animated-word", {
        opacity: 1,
        transform: "translate3d(0,0,0) rotateY(0deg) rotateX(0deg)",
        ease: "power2.inOut",
        stagger: 0.02,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`animated-title ${containerClass}`}>
      <div className="flex-center flex-wrap gap-2 px-10 md:gap-3">
        {React.Children.map(children, (char, i) => {
          if (typeof char === "string" && char === "\n") {
            return <br key={i} />;
          }

          return (
            <span
              key={i}
              className="animated-word inline-block opacity-0 transform translate-y-5"
            >
              {char}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default AnimatedTitle;
