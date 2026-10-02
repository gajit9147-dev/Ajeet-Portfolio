import "./Workflow.css";

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

      <div className="build-board glass">
        <div className="build-board-header">
          <div className="build-board-label">
            <i aria-hidden="true" />
            <span>BUILD_PIPELINE</span>
            <small>~/ajeet/build</small>
          </div>
          <span className="build-cycle">06 STEPS / CONTINUOUS ITERATION</span>
        </div>

        <div className="build-stage-grid">
          {workflow.map((step) => (
            <article className="build-stage" key={step.number}>
              <div className="build-stage-top">
                <span className="build-stage-number">{step.number}</span>
                <code>{step.command}</code>
                <span className="build-stage-arrow" aria-hidden="true">↗</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>

        <div className="build-board-footer">
          <span className="build-principle-label">ENGINEERING PRINCIPLE</span>
          <p>Build small. <span>Learn fast.</span> Iterate continuously.</p>
          <span className="build-loop" aria-hidden="true">↻</span>
        </div>
      </div>
    </section>
  );
}
