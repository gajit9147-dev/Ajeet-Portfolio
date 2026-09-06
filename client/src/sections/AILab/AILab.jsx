const labAreas = [
  {
    code: "LAB.01",
    title: "AI / ML",
    text: "Exploring machine learning concepts, models and practical AI applications.",
  },
  {
    code: "LAB.02",
    title: "GENERATIVE AI",
    text: "Experimenting with LLM-powered experiences and intelligent interfaces.",
  },
  {
    code: "LAB.03",
    title: "AI SYSTEMS",
    text: "Connecting AI capabilities with real-world full-stack applications.",
  },
  {
    code: "LAB.04",
    title: "EXPERIMENTS",
    text: "Learning by building, testing ideas and iterating quickly.",
  },
];

const nodes = [
  { id: 1, x: "50%", y: "18%" },
  { id: 2, x: "25%", y: "38%" },
  { id: 3, x: "75%", y: "38%" },
  { id: 4, x: "18%", y: "68%" },
  { id: 5, x: "50%", y: "58%" },
  { id: 6, x: "82%", y: "68%" },
  { id: 7, x: "50%", y: "86%" },
];

function AILab() {
  return (
    <section id="ai-lab" className="section ai-lab-section">
      <div className="section-shell">
        <div className="section-heading">
          <span className="section-index">05 / AI LAB</span>

          <div>
            <p className="section-kicker">EXPERIMENTATION // INTELLIGENCE</p>
            <h2>Inside the AI Lab.</h2>
          </div>
        </div>

        <div className="ai-lab-grid">
          {/* AI VISUAL */}
          <div className="glass ai-network-panel">
            <div className="panel-topline">
              <span>NEURAL_SYSTEM</span>
              <span className="panel-live">
                <i />
                ONLINE
              </span>
            </div>

            <div className="neural-stage">
              <div className="neural-glow" />

              <div className="neural-core">
                <span>AI</span>
              </div>

              <div className="neural-ring ring-a" />
              <div className="neural-ring ring-b" />

              {nodes.map((node) => (
                <span
                  key={node.id}
                  className="neural-node"
                  style={{
                    left: node.x,
                    top: node.y,
                  }}
                />
              ))}

              <div className="connection connection-one" />
              <div className="connection connection-two" />
              <div className="connection connection-three" />
              <div className="connection connection-four" />
              <div className="connection connection-five" />
              <div className="connection connection-six" />
            </div>

            <div className="ai-network-footer">
              <span>MODEL_LAYER</span>
              <strong>EXPLORING</strong>
            </div>
          </div>

          {/* TERMINAL */}
          <div className="glass ai-terminal-panel">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span />
                <span />
                <span />
              </div>

              <span>ajeet@ai-lab:~</span>
            </div>

            <div className="ai-terminal-body">
              <p>
                <span className="terminal-prompt">$</span> system.init()
              </p>

              <p className="terminal-success">
                ✓ intelligence layer ready
              </p>

              <p>
                <span className="terminal-prompt">$</span> lab.status()
              </p>

              <div className="terminal-output">
                <span>AI / ML</span>
                <strong>EXPLORING</strong>

                <span>GENAI</span>
                <strong>EXPERIMENTING</strong>

                <span>FULL-STACK</span>
                <strong>INTEGRATING</strong>

                <span>MODE</span>
                <strong>BUILD + LEARN</strong>
              </div>

              <p>
                <span className="terminal-prompt">$</span>{" "}
                experiment.run(<span className="terminal-string">"next"</span>)
              </p>

              <p className="terminal-muted">
                → learning through real projects...
              </p>

              <span className="terminal-cursor">▋</span>
            </div>
          </div>
        </div>

        {/* LAB AREAS */}
        <div className="ai-lab-areas">
          {labAreas.map((area) => (
            <article className="glass ai-area-card" key={area.code}>
              <span className="ai-area-code">{area.code}</span>

              <h3>{area.title}</h3>

              <p>{area.text}</p>

              <span className="ai-area-arrow">↗</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AILab;
