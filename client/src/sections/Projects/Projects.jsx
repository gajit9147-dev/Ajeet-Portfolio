const projects = [
  {
    number: "01",
    title: "InnerVoice",
    category: "AI · FULL-STACK",
    description:
      "An intelligent full-stack platform designed around AI-powered interaction and user experience.",
    stack: ["React", "Node.js", "Express", "MongoDB", "AI"],
    status: "ACTIVE",
    featured: true,
  },
  {
    number: "02",
    title: "AI PROJECT",
    category: "AI / ML",
    description:
      "An AI/ML project focused on turning data and intelligent models into a practical user-facing experience.",
    stack: ["Python", "Machine Learning", "API"],
    status: "BUILDING",
    featured: false,
  },
  {
    number: "03",
    title: "FULL-STACK SYSTEM",
    category: "WEB · ENGINEERING",
    description:
      "A complete web application exploring frontend architecture, backend APIs and persistent data.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    status: "COMPLETED",
    featured: false,
  },
];

function ProjectVisual({ project }) {
  return (
    <div className="project-visual">
      <div className="project-grid-bg" />

      <div className="project-system">
        <span className="system-chip">PROJECT // {project.number}</span>

        <div className="architecture-preview">
          <div className="arch-node">USER</div>
          <div className="arch-line" />
          <div className="arch-node">APP</div>
          <div className="arch-line" />
          <div className="arch-node ai-node">AI</div>
        </div>

        <span className="visual-code">
          {project.title.toLowerCase().replaceAll(" ", "_")}
          <br />
          <span>system.initialized()</span>
        </span>
      </div>

      <div className="project-index">{project.number}</div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="projects-section section-shell">
      <div className="section-heading projects-heading">
        <div>
          <span className="section-number">03 / SELECTED WORK</span>

          <h2>
            Things I&apos;ve <span>Built.</span>
          </h2>
        </div>

        <p>
          A collection of systems, experiments and applications built while
          exploring AI/ML and full-stack engineering.
        </p>
      </div>

      <div className="projects-list">
        {projects.map((project) => (
          <article
            className={`glass project-card ${
              project.featured ? "project-featured" : ""
            }`}
            key={project.number}
          >
            <ProjectVisual project={project} />

            <div className="project-content">
              <div className="project-topline">
                <span>{project.category}</span>

                <span className="project-status">
                  <i />
                  {project.status}
                </span>
              </div>

              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <div className="project-stack">
                {project.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>

              <div className="project-actions">
                <a href="#contact">
                  VIEW CASE STUDY
                  <span>↗</span>
                </a>

                <a href="#contact">
                  GITHUB
                  <span>↗</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="projects-footer">
        <span>MORE SYSTEMS IN DEVELOPMENT</span>

        <span className="project-counter">
          03 <i /> ∞
        </span>
      </div>
    </section>
  );
}
