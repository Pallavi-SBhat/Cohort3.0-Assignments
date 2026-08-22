import { useEffect, useRef } from "react";
import { Link } from "react-router";
import gsap from "gsap";
import { Button, Card, Input } from "@/components";
import { ArrowRight, Zap, Code, Shield, Layers } from "lucide-react";
import ComponentShowcase from "@/components/Personal/ComponentShowcase";

const HomePage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animations
      gsap.from(".hero-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.from(".hero-button", {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        stagger: 0.2,
        ease: "back.out(1.5)",
      });

      // Features Animations
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        delay: 1, // Remove this if you add scrollTrigger plugin
      });
      
      // Demo Animations
      gsap.from(".demo-item", {
        x: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        delay: 1.5,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen text-[var(--text-color)] overflow-hidden relative" ref={heroRef}>
      {/* Premium Background Grid & Gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,var(--mask-color)_70%,transparent_100%)]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full hero-gradient"></div>
      </div>
      
      {/* Navbar will sit on top (assumed from global layout) */}
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Background glow effects */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-[var(--accent-color)]/30 dark:bg-[var(--accent-color)]/15 blur-[120px] rounded-full -z-10" />
        <div className="absolute top-40 left-1/4 w-[300px] h-[300px] bg-purple-500/30 dark:bg-purple-500/15 blur-[100px] rounded-full -z-10" />

        <div className="hero-text inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--card-bg)] dark:bg-indigo-900/30 text-[var(--text-color)] dark:text-indigo-400 text-sm font-medium mb-8 border-[var(--border-color)] dark:border-indigo-800/50">
          <Zap size={14} className="text-amber-500" />
          <span>v1.0 is now live!</span>
        </div>

        <h1 className="hero-text text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl">
          Build Beautiful UIs with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Ease</span>
        </h1>
        
        <p className="hero-text text-lg md:text-xl text-[var(--text-color)] dark:text-slate-400 max-w-2xl mb-10">
          A premium, animated, and fully customizable React component library. Designed for developers who care about aesthetics and developer experience.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/components" className="hero-button">
            <Button size="xl" variant="primary" className="shadow-lg shadow-indigo-500/25 group">
              Get Started
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform inline" size={18} />
            </Button>
          </Link>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hero-button">
            <Button size="xl" variant="outline" className="bg-[var(--card-bg)]/70 dark:bg-slate-900/70 backdrop-blur-sm border-[var(--border-color)] dark:border-slate-800">
              <Code className="mr-2 inline" size={18} />
              View GitHub
            </Button>
          </a>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-4" ref={demoRef}>
        <div className="max-w-5xl mx-auto bg-[var(--card-bg)]/40 dark:bg-slate-900/40 backdrop-blur-xl border border-[var(--border-color)] dark:border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full -z-10" />
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Copy, paste, animate.</h2>
              <p className="text-[var(--text-color)] dark:text-slate-400">
                Stop wrestling with complex animation libraries and disjointed components. Ease UI provides pre-animated, carefully crafted blocks that just work.
              </p>
              
              <div className="demo-item">
                <Input label="Email address" placeholder="hello@easeui.com" tone="default" size="md" />
              </div>
              <div className="demo-item flex gap-3">
                <Button variant="primary" hoverAnimation="shadowPulse">Subscribe</Button>
                <Button variant="ghost" hoverAnimation="jiggle">Cancel</Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="demo-item">
                <Card 
                  title="Interactive Card" 
                  description="Hover over me to see the 3D float effect powered by GSAP."
                  variant="light"
                  hoverAnimation="float3D"
                  className="shadow-2xl shadow-slate-200/50 dark:shadow-none"
                  footer={
                    <Button variant="outline" size="sm" className="w-full">Action</Button>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Component Showcase with Full Source Code */}
      <ComponentShowcase />

      {/* Features Grid */}
      <section className="py-24 px-4 bg-[var(--bg-color)] dark:bg-slate-900/50" ref={featuresRef}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why choose Ease UI?</h2>
            <p className="text-[var(--text-color)] dark:text-slate-400 max-w-2xl mx-auto">
              Everything you need to build modern applications, with zero compromise on quality or performance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Layers size={24} className="text-[var(--icon-primary)]" />,
                title: "Composable",
                description: "Built with a modular architecture. Combine components to create complex interfaces effortlessly."
              },
              {
                icon: <Zap size={24} className="text-[var(--icon-primary)]" />,
                title: "GSAP Animated",
                description: "Premium animations out of the box. No more clunky CSS transitions, just smooth, physics-based motion."
              },
              {
                icon: <Shield size={24} className="text-[var(--icon-primary)]" />,
                title: "Accessible",
                description: "Carefully designed with accessibility in mind, ensuring your application works for everyone."
              }
            ].map((feature, i) => (
              <div key={i} className="feature-card p-6 bg-[var(--card-bg)] dark:bg-slate-900 rounded-2xl border border-[var(--border-color)] dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow z-10 relative">
                <div className="w-12 h-12 bg-[var(--card-bg)] dark:bg-slate-800 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-[var(--text-color)] dark:text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-[var(--border-color)] dark:border-slate-800 text-center">
        <p className="text-[var(--text-color)] dark:text-slate-400">
          © {new Date().getFullYear()} Ease UI. Built with React and Tailwind V4.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
