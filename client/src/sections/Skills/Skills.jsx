import "./Skills.css";

const skillGroups = [
  {
    id: "01",
    title: "AI / ML",
    description: "Intelligence layer",
    skills: ["Python", "AI / ML", "Generative AI", "Gemini AI", "DeepSeek"],
  },
  {
    id: "02",
    title: "FRONTEND",
    description: "Interface layer",
    skills: ["React", "Vite", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    id: "03",
    title: "BACKEND",
    description: "Application layer",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT"],
  },
  {
    id: "04",
    title: "DATABASE",
    description: "Data layer",
    skills: ["MongoDB", "MySQL"],
  },
  {
    id: "05",
    title: "DEVOPS / CLOUD",
    description: "Infrastructure layer",
    skills: ["Git", "GitHub", "Docker", "AWS", "Vercel"],
  },
  {
    id: "06",
    title: "TOOLS",
    description: "Development environment",
    skills: ["VS Code", "Postman", "Figma", "npm"],
  },
];

function StackTerminal() {
  return (
    <div className="stack-terminal glass">
      <div className="stack-terminal-header">
        <span>STACK // SYSTEM</span>

        <span className="stack-terminal-status">
          <i />
          OPERATIONAL
        </span>
      </div>

      <div className="stack-terminal-body">
        <div className="stack-command">
          <span>$</span> stack.inspect()
        </div>

        <div className="stack-output">
          <span>[OK]</span> frontend layer loaded
        </div>

        <div className="stack-output">
          <span>[OK]</span> backend layer loaded
        </div>

        <div className="stack-output">
          <span>[OK]</span> database layer connected
        </div>

        <div className="stack-output">
          <span>[OK]</span> AI exploration enabled
        </div>

        <div className="stack-output">
          <span>[OK]</span> deployment tools available
        </div>

        <div className="stack-command stack-command-last">
          <span>$</span> build --mode=continuous
        </div>

        <div className="stack-cursor">▊</div>
      </div>
    </div>
  );
}

function SkillGroup({ group }) {
  return (
    <article className="skill-group glass">
      <div className="skill-group-top">
        <span className="skill-group-number">{group.id}</span>

        <span className="skill-group-description">
          {group.description}
        </span>
      </div>

      <h3>{group.title}</h3>

      <div className="skill-list">
        {group.skills.map((skill) => (
          <span key={skill} className="skill-chip">
            <i />
            {skill}
          </span>
        ))}
      </div>

      <span className="skill-arrow">↗</span>
    </article>
  );
}

function Skills() {
  return (
    <section className="section skills-section" id="stack">
      <div className="section-shell">
        <div className="section-heading skills-heading">
          <div>
            <span className="section-index">06 / STACK</span>

            <h2>
              The Tools
              <br />
              I Build With.
            </h2>
          </div>

          <p>
            A practical stack built around full-stack development, AI
            exploration and shipping real projects.
          </p>
        </div>

        <div className="stack-overview">
          <StackTerminal />

          <div className="stack-summary glass">
            <span className="section-index">ENGINEERING MODEL</span>

            <div className="stack-flow">
              <div>
                <strong>01</strong>
                <span>INTERFACE</span>
              </div>

              <b>→</b>

              <div>
                <strong>02</strong>
                <span>LOGIC</span>
              </div>

              <b>→</b>

              <div>
                <strong>03</strong>
                <span>DATA</span>
              </div>

              <b>→</b>

              <div>
                <strong>04</strong>
                <span>AI</span>
              </div>
            </div>

            <p>
              I like understanding how the pieces connect — from the user
              interface and APIs to databases, deployment and intelligent
              features.
            </p>
          </div>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group) => (
            <SkillGroup key={group.id} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
