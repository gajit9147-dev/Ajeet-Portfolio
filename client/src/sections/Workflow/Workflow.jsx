const workflow = [
  {
    number: "01",
    title: "DISCOVER",
    description:
      "Understand the problem, users and requirements before writing the first line of code.",
    command: "analyze(problem)",
  },
  {
    number: "02",
    title: "DESIGN",
    description:
      "Plan the experience, system architecture, data flow and technical approach.",
    command: "design(system)",
  },
  {
    number: "03",
    title: "BUILD",
    description:
      "Turn the idea into a working product using modern frontend and backend technologies.",
    command: "build(product)",
  },
  {
    number: "04",
    title: "INTELLIGENCE",
    description:
      "Integrate AI/ML, APIs or intelligent logic where it creates real value.",
    command: "add(intelligence)",
  },
  {
    number: "05",
    title: "TEST",
    description:
      "Validate the system, find problems and improve reliability and user experience.",
    command: "test(system)",
  },
  {
    number: "06",
    title: "DEPLOY",
    description:
      "Ship the system, monitor it and continue improving it from real feedback.",
    command: "deploy(system)",
  },
];

export default function Workflow() {
  return (
    <section id="workflow" className="workflow-section section-shell">
      <div className="section-heading">
        <span className="section-number">ENGINEERING PROCESS</span>
        <h2>
          How I <span>Build.</span>
        </h2>
        <p>
          From understanding a problem to deploying a working system, I
          approach projects as an iterative engineering process.
        </p>
      </div>

      <div className="workflow-layout">
        <div className="workflow-intro glass">
          <div className="panel-top">
            <span>BUILD_PIPELINE</span>
            <span>PROCESS.01</span>
          </div>

          <div className="pipeline-terminal">
            <div className="terminal-header">
              <span>
                <i />
                SYSTEM_PROCESS
              </span>

              <span>~/ajeet/build</span>
            </div>

            <div className="terminal-body">
              <p>
                <span className="terminal-green">$</span> initialize project
              </p>

              <p className="terminal-muted">
                loading engineering pipeline...
              </p>

              <p>
                <span className="terminal-green">✓</span> problem identified
              </p>

              <p>
                <span className="terminal-green">✓</span> architecture planned
              </p>

              <p>
                <span className="terminal-green">✓</span> system implemented
              </p>

              <p>
                <span className="terminal-green">✓</span> intelligence layer
                integrated
              </p>

              <p>
                <span className="terminal-green">✓</span> system tested
              </p>

              <p className="terminal-current">
                <span>→</span> ready for deployment
                <b />
              </p>
            </div>
          </div>

          <div className="workflow-principle">
            <span>ENGINEERING PRINCIPLE</span>

            <strong>
              Build small.
              <br />
              Learn fast.
              <br />
              Iterate continuously.
            </strong>
          </div>
        </div>

        <div className="workflow-steps">
          {workflow.map((step, index) => (
            <div className="workflow-step" key={step.number}>
              <div className="workflow-marker">
                <span>{step.number}</span>
                {index !== workflow.length - 1 && <i />}
              </div>

              <div className="glass workflow-card">
                <div className="workflow-card-top">
                  <span>{step.command}</span>
                  <span>0{index + 1}</span>
                </div>

                <h3>{step.title}</h3>

                <p>{step.description}</p>

                <div className="workflow-progress">
                  <span />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
