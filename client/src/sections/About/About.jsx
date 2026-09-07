const systemData = [
  {
    label: "IDENTITY",
    value: "AJEET GUPTA",
  },
  {
    label: "ROLE",
    value: "CSE · AI/ML STUDENT",
  },
  {
    label: "SPECIALIZATION",
    value: "AI / ML · GENAI",
  },
  {
    label: "ENGINEERING",
    value: "FULL-STACK DEVELOPMENT",
  },
  {
    label: "CURRENT MODE",
    value: "BUILDING & LEARNING",
  },
  {
    label: "INTEREST",
    value: "INTELLIGENT SYSTEMS",
  },
];

export default function About() {
  return (
    <section id="about" className="about-section section-shell">
      <div className="section-heading">
        <span className="section-number">IDENTITY</span>
        <h2>
          Who is <span>Ajeet?</span>
        </h2>
        <p>
          A developer in progress, building at the intersection of
          artificial intelligence and full-stack engineering.
        </p>
      </div>

      <div className="about-grid">
        <div className="glass about-intro">
          <div className="panel-top">
            <span>ABOUT_SYSTEM</span>
            <span>SYS.02</span>
          </div>

          <div className="about-copy">
            <p className="large-copy">
              I&apos;m <strong>Ajeet Gupta</strong>, a CSE student focused on
              Artificial Intelligence and Machine Learning.
            </p>

            <p>
              I enjoy turning ideas into working systems — from full-stack
              web applications to AI/ML experiments and generative AI
              experiences.
            </p>

            <p>
              My current journey is about learning by building, participating
              in hackathons, exploring new technologies and understanding how
              intelligent systems work behind the interface.
            </p>
          </div>

          <div className="about-footer">
            <span>BUILD. LEARN. EXPERIMENT.</span>
            <span>/// 2026</span>
          </div>
        </div>

        <div className="glass system-panel">
          <div className="panel-top">
            <span>SYSTEM_IDENTITY</span>
            <span className="live-indicator">
              <i />
              ONLINE
            </span>
          </div>

          <div className="system-data">
            {systemData.map((item, index) => (
              <div className="system-row" key={item.label}>
                <span className="system-index">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="system-label">{item.label}</span>

                <span className="system-value">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="system-terminal">
            <span className="terminal-prompt">$</span>
            <span>whoami</span>
            <span className="terminal-result">ajeet@ai-lab:~$</span>
            <span className="terminal-cursor" />
          </div>
        </div>
      </div>

      <div className="about-stats">
        <div className="glass mini-panel">
          <span>01</span>
          <strong>AI / ML</strong>
          <p>Exploring intelligent systems</p>
        </div>

        <div className="glass mini-panel">
          <span>02</span>
          <strong>FULL-STACK</strong>
          <p>Building complete web experiences</p>
        </div>

        <div className="glass mini-panel">
          <span>03</span>
          <strong>GENAI</strong>
          <p>Experimenting with AI-powered products</p>
        </div>

        <div className="glass mini-panel">
          <span>04</span>
          <strong>HACKATHONS</strong>
          <p>Build fast. Learn faster.</p>
        </div>
      </div>
    </section>
  );
}
