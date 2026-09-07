import "./Journey.css";

const milestones = [
  {
    type: "EDUCATION",
    year: "CURRENT",
    title: "CSE · AI & Machine Learning",
    place: "Parul University · Computer Science",
    description:
      "Building a strong foundation in core computer science, machine learning models, algorithms, and intelligent software engineering.",
    state: "IN PROGRESS",
  },
  {
    type: "ENGINEERING",
    year: "ONGOING",
    title: "Full-Stack Development",
    place: "Web Applications · REST APIs · Systems",
    description:
      "Architecting end-to-end full-stack applications with React, Node.js, Express, databases, and secure authentication pipelines.",
    state: "ACTIVE",
  },
  {
    type: "INNOVATION",
    year: "ONGOING",
    title: "Generative AI Systems",
    place: "AI Lab · LLMs · Intelligent Interfaces",
    description:
      "Exploring practical integrations of generative models, prompt engineering, and intelligent AI assistants across web platforms.",
    state: "EXPLORING",
  },
  {
    type: "HACKATHONS",
    year: "ACTIVE",
    title: "Rapid Prototyping & Builds",
    place: "Hackathons · Sprints · Production MVPs",
    description:
      "Building fast, resilient prototypes under competitive constraints, solving real-world challenges through iterative teamwork.",
    state: "BUILDING",
  },
];

function JourneyTerminal() {
  return (
    <div className="journey-terminal glass">
      <div className="journey-terminal-header">
        <span>JOURNEY // SYSTEM LOG</span>

        <span className="journey-status">
          <i />
          RUNNING
        </span>
      </div>

      <div className="journey-terminal-body">
        <div>
          <span className="terminal-prompt">$</span> journey.status()
        </div>

        <p>
          <span>[•]</span> education → in progress
        </p>

        <p>
          <span>[•]</span> engineering → building
        </p>

        <p>
          <span>[•]</span> ai exploration → active
        </p>

        <p>
          <span>[•]</span> hackathons → experimenting
        </p>

        <div className="journey-command">
          <span className="terminal-prompt">$</span> next --challenge
        </div>

        <div className="journey-terminal-result">
          Keep learning. Keep building.
        </div>
      </div>
    </div>
  );
}

function Milestone({ milestone }) {
  return (
    <article className="journey-milestone glass">
      <div className="milestone-header">
        <div className="milestone-marker">
          <span className="milestone-indicator" />
        </div>

        <div className="milestone-meta">
          <span className="milestone-type">{milestone.type}</span>
          <span className="milestone-year">{milestone.year}</span>
        </div>
      </div>

      <div className="milestone-body">
        <h3>{milestone.title}</h3>
        <div className="milestone-place">{milestone.place}</div>
        <p>{milestone.description}</p>
      </div>

      <div className="milestone-footer">
        <div className="milestone-state">
          <i />
          <span>{milestone.state}</span>
        </div>
      </div>
    </article>
  );
}

function Journey() {
  return (
    <section className="section journey-section" id="journey">
      <div className="section-shell">
        <div className="section-heading journey-heading">
          <span className="section-index">JOURNEY</span>

          <h2>
            Learning. Building. Evolving.
          </h2>

          <p>
            My journey is less about following a fixed path and more about
            continuously learning, building projects and experimenting with
            new technology.
          </p>
        </div>

        <div className="journey-overview">
          <JourneyTerminal />

          <div className="journey-principle glass">
            <div className="principle-top">
              <span className="principle-tag">ENGINEERING PHILOSOPHY</span>
              <span className="principle-status-dot">
                <i />
                ACTIVE
              </span>
            </div>

            <h3>
              Build something. Learn something. Build it better.
            </h3>

            <p>
              Every project, experiment, and line of code is an iterative step
              toward mastering full-stack engineering and intelligent AI systems.
            </p>

            <div className="principle-footer">
              <span>CONTINUOUS EVOLUTION</span>
              <span className="principle-arrow">↗</span>
            </div>
          </div>
        </div>

        <div className="journey-cards-grid">
          {milestones.map((milestone) => (
            <Milestone key={milestone.title} milestone={milestone} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Journey;
