import gsap from "gsap";

export const hoverAnimations = {
  jiggle: (el: HTMLElement) => {
    gsap.killTweensOf(el);
    gsap.to(el, {
      keyframes: [
        { scale: 1.1, rotation: 2, duration: 0.15, ease: "power1.out" },
        { scale: 0.95, rotation: -2, duration: 0.15, ease: "power1.inOut" },
        { scale: 1.05, rotation: 1, duration: 0.15, ease: "power1.out" },
        { scale: 1, rotation: 0, duration: 0.2, ease: "back.out(2)" },
      ],
    });
  },

  scale: (el: HTMLElement) => {
    gsap.to(el, { scale: 1.05, duration: 0.2, ease: "power1.out" });
  },

  bounce: (el: HTMLElement) => {
    gsap.to(el, {
      y: -5,
      duration: 0.3,
      ease: "bounce.out",
      yoyo: true,
      repeat: 1,
    });
  },

  shadowPulse: (el: HTMLElement) => {
    gsap.fromTo(
      el,
      { boxShadow: "0px 0px 0px rgba(0,0,0,0)" },
      {
        boxShadow: "0px 10px 25px rgba(0,0,0,0.2)",
        duration: 0.4,
        ease: "power2.inOut",
      }
    );
  },

  float3D: (el: HTMLElement) => {
    const img = el.querySelector("img");
    const title = el.querySelector("h3");
    const desc = el.querySelector("p");
    const footer = el.querySelector("div:last-child");

    // Base card lift + tilt
    gsap.to(el, {
      scale: 1.03,
      rotateX: 5,
      rotateY: 2,
      transformPerspective: 700,
      duration: 0.1,
      ease: "power3.out",
    });

    // Floating inner elements
    if (img) gsap.to(img, { y: -10, scale: 1.05, duration: 0.5, ease: "power3.out" });
    if (title) gsap.to(title, { y: -8, duration: 0.4, ease: "power3.out" });
    if (desc) gsap.to(desc, { y: -6, duration: 0.4, ease: "power3.out" });
    if (footer && footer !== el) gsap.to(footer, { y: -5, opacity: 1, duration: 0.4, ease: "power3.out" });
  },

  reset: (el: HTMLElement) => {
    const img = el.querySelector("img");
    const title = el.querySelector("h3");
    const desc = el.querySelector("p");
    const footer = el.querySelector("div:last-child");

    gsap.to(el, {
      y: 0,
      rotateX: 0,
      rotateY: 0,
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      rotation: 0,
      boxShadow: "0px 0px 0px rgba(0,0,0,0)",
      duration: 0.3,
      ease: "power3.inOut",
    });

    const elementsToReset = [img, title, desc, footer].filter(Boolean);
    if (elementsToReset.length > 0) {
      gsap.to(elementsToReset, {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "power3.inOut",
      });
    }
  },

  wobbleFollow: (el: HTMLElement) => {
    if ((el as any)._hasWobble) return;
    (el as any)._hasWobble = true;
    
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * 10;

      gsap.to(el, {
        rotationX: -rotateX,
        rotationY: rotateY,
        transformPerspective: 800,
        transformOrigin: "center",
        ease: "power2.out",
        duration: 0.1,
      });
    };

    const handleLeave = () => {
      gsap.to(el, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
      (el as any)._hasWobble = false;
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
  },

  none: () => {},
};
