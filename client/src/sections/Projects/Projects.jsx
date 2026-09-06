import "./Projects.css";

const projects = [
  {
    number: "01",
    title: "InnerVoice",
    category: "AI · FULL-STACK",
    description:
      "A full-stack digital space for private notes, authentication, profile management, and dashboard analytics with a custom Liquid Glass experience.",
    stack: ["React", "Vite", "Node.js", "Express", "MySQL", "JWT"],
    status: "ACTIVE",
    github: "https://github.com/gajit9147-dev/innerVoice",
    live: null,
    domain: "innervoice.dev",
    image: "/images/projects/innervoice.jpg",
  },
  {
    number: "02",
    title: "PromptWar",
    category: "AI · PROMPT BATTLE",
    description:
      "An AI-powered competitive prompt engineering platform with battle arena, leaderboard, scoring analytics, and Gemini AI evaluation.",
    stack: ["React", "Vite", "Node.js", "Express", "Gemini AI"],
    status: "LIVE",
    github: "https://github.com/gajit9147-dev/PromptWar",
    live: "https://prompt-war-lake.vercel.app",
    domain: "prompt-war-lake.vercel.app",
    image: "/images/projects/promptwar.jpg",
  },
  {
    number: "03",
    title: "Laundry Service",
    category: "WEB · FRONTEND",
    description:
      "A responsive on-demand laundry and dry-cleaning service platform with package selection, booking workflow, and EmailJS integration.",
    stack: ["HTML", "Tailwind CSS", "JavaScript", "EmailJS"],
    status: "LIVE",
    github: "https://github.com/gajit9147-dev/LP",
    live: "https://gajit9147-dev.github.io/LP/",
    domain: "gajit9147-dev.github.io/LP",
    image: "/images/projects/laundry.jpg",
  },
  {
    number: "04",
    title: "Interior Design",
    category: "WEB · 3D ARCHITECTURE",
    description:
      "A luxury interior design studio experience inspired by modern 3D home-design platforms, highlighting editorial layouts and spatial visual presentation.",
    stack: ["HTML", "CSS", "JavaScript"],
    status: "LIVE",
    github: "https://github.com/gajit9147-dev/intreior-design",
    live: "https://gajit9147-dev.github.io/intreior-design/",
    domain: "gajit9147-dev.github.io/intreior-design",
    image: "/images/projects/interior.jpg",
  },
];

function BrowserMockup({ project }) {
  return (
    <div className="browser-mockup">
      <div className="browser-header">
        <div className="browser-dots">
          <span className="dot dot-red" />
          <span className="dot dot-amber" />
          <span className="dot dot-green" />
        </div>

        <div className="browser-address">
          <span className="lock-icon" aria-hidden="true">🔒</span>
          <span className="domain-text">{project.domain}</span>
        </div>

        <span className={`status-badge ${project.status.toLowerCase()}`}>
          <i />
          {project.status}
        </span>
      </div>

      <div className="browser-screen">
        <img
          src={project.image}
          alt={`${project.title} webpage preview`}
          className="browser-screenshot"
          loading="lazy"
        />
        <div className="browser-overlay">
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="overlay-btn primary"
            >
              <span>Visit Webpage</span>
              <span className="btn-arrow">↗</span>
            </a>
          ) : (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="overlay-btn"
            >
              <span>View Source</span>
              <span className="btn-arrow">↗</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="modern-project-card">
      <BrowserMockup project={project} />

      <div className="project-body">
        <div className="project-header">
          <span className="project-num">{project.number}</span>
          <span className="project-tag">{project.category}</span>
        </div>

        <h3 className="project-name">{project.title}</h3>

        <p className="project-desc">{project.description}</p>

        <div className="project-tags">
          {project.stack.map((tech) => (
            <span key={tech} className="tech-pill">
              {tech}
            </span>
          ))}
        </div>

        <div className="project-footer">
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="action-btn deploy-btn"
            >
              <span className="btn-icon">🚀</span>
              <span>Live Demo</span>
              <span className="btn-arrow">↗</span>
            </a>
          ) : (
            <span className="action-btn dev-btn">
              <span className="btn-icon">⚡</span>
              <span>Full-Stack Dev</span>
            </span>
          )}

          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="action-btn github-btn"
          >
            <svg
              className="github-svg"
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub</span>
            <span className="btn-arrow">↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}

function Projects() {
  return (
    <section className="section projects-section" id="projects">
      <div className="section-shell">
        <div className="section-heading">
          <div>
            <span className="section-index">03 / SELECTED WORK</span>
            <h2>Featured Projects</h2>
          </div>

          <p>
            Curated systems, web applications, and AI tools built with modern
            engineering, interactive UI design, and production deployments.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
