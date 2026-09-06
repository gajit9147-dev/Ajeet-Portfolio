const skillGroups = [
  {
    code: "SYS.01",
    title: "AI / MACHINE LEARNING",
    status: "EXPLORING",
    skills: ["Python", "Machine Learning", "AI Concepts", "Generative AI"],
  },
  {
    code: "SYS.02",
    title: "FRONTEND",
    status: "BUILDING",
    skills: ["React", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    code: "SYS.03",
    title: "BACKEND",
    status: "BUILDING",
    skills: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    code: "SYS.04",
    title: "DATABASE",
    status: "WORKING WITH",
    skills: ["MongoDB", "Database Design"],
  },
  {
    code: "SYS.05",
    title: "DEVOPS / CLOUD",
    status: "LEARNING",
    skills: ["Git", "GitHub", "Docker", "AWS"],
  },
  {
    code: "SYS.06",
    title: "DEVELOPER TOOLS",
    status: "DAILY",
    skills: ["VS Code", "Postman", "Linux", "npm"],
  },
];

function Skills() {
  return (
    <section id="stack" className="section skills-section">
      <div className="section-shell">
        <div className="section-heading">
          <span className="section-index">06 / STACK</span>

          <div>
            <p className="section-kicker">TOOLS // TECHNOLOGIES // SYSTEMS</p>
            <h2>What I build with.</h2>
          </div>
        </div>

        <div className="stack-overview glass">
          <div className="stack-overview-main">
            <span className="stack-label">CURRENT_STACK</span>

            <h3>
              Learning, building
              <br />
              <span>and connecting systems.</span>
            </h3>

            <p>
              My stack evolves with the projects I build. I focus on
              understanding the technology behind a system rather than
              collecting tools.
            </p>
          </div>

          <div className="stack-status">
            <div>
              <span>SYSTEM</span>
              <strong>ACTIVE</strong>
            </div>

            <div>
              <span>FOCUS</span>
              <strong>AI + FULL-STACK</strong>
            </div>

            <div>
              <span>MODE</span>
              <strong>BUILD / LEARN</strong>
            </div>
          </div>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group) => (
            <article className="glass skill-group" key={group.code}>
              <div className="skill-group-top">
                <span>{group.code}</span>

                <span className="skill-status">
                  <i />
                  {group.status}
                </span>
              </div>

              <h3>{group.title}</h3>

              <div className="skill-list">
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="stack-terminal glass">
          <div className="stack-terminal-header">
            <span>STACK_ANALYSIS</span>
            <span>06.2026</span>
          </div>

          <div className="stack-terminal-content">
            <span className="terminal-prompt">$</span>

            <span>
              stack.inspect(<b>current</b>)
            </span>

            <span className="terminal-result">
              → AI / ML + Full-Stack Engineering
            </span>

            <span className="terminal-prompt">$</span>

            <span>
              stack.mode(<b>learning</b>)
            </span>

            <span className="terminal-result">
              → continuously evolving
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
