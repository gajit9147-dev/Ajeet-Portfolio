import "./Hero.css";

export default function Hero() {
  return (
    <section id="home" className="cell hero">
      <div className="cell-in" />
      <div className="cell-md">
        <div className="hero-grid">
          <div>
            <h1>
              Hi, I&apos;m Ajeet. I&apos;m learning ML by <code>building</code>{" "}
              small things and writing down what went wrong.
            </h1>
            <p className="hero-text">
              First year B.Tech CSE (AI/ML). Looking for internships and small
              projects. This page is a notebook because that&apos;s how I&apos;m
              learning.
            </p>
            <span className="note">photo coming soon, the box is a placeholder</span>
          </div>

          <div className="photo" role="img" aria-label="Placeholder for Ajeet's photo">
            photo of me
            <br />
            goes here
            <span className="glass-chip">open to internships</span>
          </div>
        </div>
      </div>
    </section>
  );
}
