import { useEffect, useRef } from "react";
import "./Hero.css";

export default function Hero() {
  const heroRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const glow = glowRef.current;

    if (!hero || !glow) return;

    const handleMove = (event) => {
      const rect = hero.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
    };

    hero.addEventListener("pointermove", handleMove);

    return () => {
      hero.removeEventListener("pointermove", handleMove);
    };
  }, []);

  return (
    <section id="home" className="hero-section" ref={heroRef}>
      <div ref={glowRef} className="cursor-glow" />

      <div className="hero-grid">
        <div className="hero-content">
          <div className="eyebrow">
            <span className="status-dot" />
            CSE · ARTIFICIAL INTELLIGENCE & MACHINE LEARNING
          </div>

          <p className="hero-index">01 / INTRODUCTION</p>

          <h1>
            Building
            <span> Intelligent</span>
            <br />
            Systems &amp;
            <br />
            Experiences.
          </h1>

          <p className="hero-description">
            I&apos;m <strong>Ajeet Gupta</strong> — a CSE student exploring
            AI/ML, generative AI and full-stack engineering through real
            projects, experiments and hackathons.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="liquid-button primary">
              <span>EXPLORE PROJECTS</span>
              <b>↗</b>
            </a>

            <a href="#ai-lab" className="liquid-button secondary">
              <span>ENTER AI LAB</span>
              <b>→</b>
            </a>
          </div>

          <div className="hero-meta">
            <div>
              <span>FOCUS</span>
              <strong>AI / ML · GENAI</strong>
            </div>

            <div>
              <span>BUILDING</span>
              <strong>FULL-STACK SYSTEMS</strong>
            </div>

            <div>
              <span>STATUS</span>
              <strong className="online">● OPEN TO OPPORTUNITIES</strong>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-label label-top">
            <span>AI CORE</span>
            <span>SYS.01</span>
          </div>

          <div className="ai-core">
            <div className="core-ring ring-one" />
            <div className="core-ring ring-two" />
            <div className="core-ring ring-three" />

            <div className="core-orb">
              <div className="core-inner">
                <span>AI</span>
              </div>
            </div>

            <div className="node node-one" />
            <div className="node node-two" />
            <div className="node node-three" />
            <div className="node node-four" />
          </div>

          <div className="visual-label label-bottom">
            <span>NEURAL SYSTEM</span>
            <span>ONLINE</span>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <span>SCROLL TO EXPLORE</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
