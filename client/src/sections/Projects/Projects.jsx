import "./Projects.css";

const projects = [
  {
    number: "01",
    title: "InnerVoice",
    category: "AI · FULL-STACK · PRODUCT",
    description:
      "A full-stack digital space for private notes, authentication, profile management and dashboard analytics, built with a custom Liquid Glass experience.",
    stack: [
      "React",
      "Vite",
      "Node.js",
      "Express",
      "MySQL",
      "Cloudinary",
      "JWT",
    ],
    status: "ACTIVE",
    featured: true,
    github: "https://github.com/gajit9147-dev/innerVoice",
    live: null,
    visual: "INNERVOICE",
  },
  {
    number: "02",
    title: "PromptWar",
    category: "AI · PROMPT ENGINEERING",
    description:
      "An AI-powered competitive prompt engineering platform with project scoring, leaderboard, analytics and domain-specialized mentor guidance.",
    stack: [
      "React",
      "Vite",
      "Node.js",
      "Express",
      "Gemini AI",
      "Analytics",
    ],
    status: "LIVE",
    featured: true,
    github: "https://github.com/gajit9147-dev/PromptWar",
    live: "https://prompt-war-lake.vercel.app",
    visual: "PROMPTWAR",
  },
  {
    number: "03",
    title: "Laundry Service",
    category: "WEB · FRONTEND",
    description:
      "A responsive laundry service website with service presentation and booking flow powered by EmailJS.",
    stack: ["HTML", "Tailwind CSS", "JavaScript", "EmailJS"],
    status: "LIVE",
    featured: false,
    github: "https://github.com/gajit9147-dev/LP",
    live: "https://gajit9147-dev.github.io/LP/",
    visual: "LAUNDRY",
  },
  {
    number: "04",
    title: "Interior Design",
    category: "WEB · UI",
    description:
      "A responsive interior-design experience inspired by modern 3D home-design platforms, focused on visual presentation and interaction.",
    stack: ["HTML", "CSS", "JavaScript"],
    status: "LIVE",
    featured: false,
    github: "https://github.com/gajit9147-dev/intreior-design",
    live: "https://gajit9147-dev.github.io/intreior-design/",
    visual: "INTERIOR",
  },
];

function ArchitecturePreview({ label }) {
  return (
    <div className="project-visual">
      <div className="visual-grid" />

      <div className="architecture-preview">
        <div className="arch-node arch-user">USER</div>

        <div className="arch-line arch-line-one" />

        <div className="arch-node arch-app">APP</div>

        <div className="arch-line arch-line-two" />

        <div className="arch-node arch-ai">
          {label === "PROMPTWAR" ? "AI" : "SYSTEM"}
        </div>
      </div>

      <div className="visual-label">
        <span>SYS.{label}</span>
        <i />
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <article
      className={`project-card ${project.featured ? "project-featured" : ""}`}
    >
      <ArchitecturePreview label={project.visual} />

      <div className="project-content">
        <div className="project-topline">
          <span>{project.number}</span>
          <span className="project-category">{project.category}</span>
        </div>

        <div>
          <div className="project-title-row">
            <h3>{project.title}</h3>
            <span className="project-status">
              <i />
              {project.status}
            </span>
          </div>

          <p className="project-description">{project.description}</p>
        </div>

        <div className="project-stack">
          {project.stack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>

        <div className="project-actions">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="project-link primary"
            >
              LIVE DEMO <span>↗</span>
            </a>
          )}

          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="project-link"
          >
            GITHUB <span>↗</span>
          </a>

          <a href="#contact" className="project-link">
            CASE STUDY <span>→</span>
          </a>
        </div>
      </div>
    </article>
  );
}

function Projects() {
  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  return (
    <section className="section projects-section" id="projects">
      <div className="section-shell">
        <div className="section-heading">
          <div>
            <span className="section-index">03 / SELECTED WORK</span>
            <h2>Things I’ve Built.</h2>
          </div>

          <p>
            A selection of systems, experiments and digital products built
            while exploring AI, full-stack engineering and modern interfaces.
          </p>
        </div>

        <div className="projects-list">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        <div className="projects-secondary">
          {otherProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
