import "./Journey.css";

const milestones = [
  {
    id: "01",
    type: "EDUCATION",
    year: "CURRENT",
    title: "CSE · Artificial Intelligence & Machine Learning",
    place: "Computer Science & Engineering",
    description:
      "Building a strong foundation in computer science while focusing on artificial intelligence, machine learning and software development.",
    state: "IN PROGRESS",
  },
  {
    id: "02",
    type: "BUILD",
    year: "ONGOING",
    title: "Full-Stack Development",
    place: "Projects · Experiments · Systems",
    description:
      "Learning by building complete applications across frontend, backend, databases, APIs and deployment.",
    state: "ACTIVE",
  },
  {
    id: "03",
    type: "AI",
    year: "ONGOING",
    title: "AI & Generative AI Exploration",
    place: "AI Lab",
    description:
      "Exploring practical ways to integrate AI into applications and create more intelligent digital experiences.",
    state: "EXPLORING",
  },
  {
    id: "04",
    type: "HACKATHON",
    year: "ACTIVE",
    title: "Hackathons & Rapid Prototyping",
    place: "Build · Test · Iterate",
    description:
      "Using hackathons as an environment to turn ideas into working prototypes under real constraints.",
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
          <span>[01]</span> education → in progress
        </p>

        <p>
          <span>[02]</span> engineering → building
        </p>

        <p>
          <span>[03]</span> ai exploration → active
        </p>

        <p>
          <span>[04]</span> hackathons → experimenting
        </p>

        <div className="journey-command">
          <span className="terminal-prompt">$</span> next --challenge
        </div>

        <div className="journey-terminal-result">
          Keep learning. Keep building.
        </div>

        <span className="journey-cursor">▊</span>
      </div>
    </div>
  );
}

function Milestone({ milestone }) {
  return (
    <article className="journey-milestone glass">
      <div className="milestone-marker">
        <span>{milestone.id}</span>
      </div>

      <div className="milestone-content">
        <div className="milestone-meta">
          <span>{milestone.type}</span>
          <span>{milestone.year}</span>
        </div>

        <h3>{milestone.title}</h3>

        <div className="milestone-place">{milestone.place}</div>

        <p>{milestone.description}</p>

        <div className="milestone-state">
          <i />
          {milestone.state}
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
          <div>
            <span className="section-index">07 / JOURNEY</span>

            <h2>
              Learning.
              <br />
              Building.
              <br />
              Evolving.
            </h2>
          </div>

          <p>
            My journey is less about following a fixed path and more about
            continuously learning, building projects and experimenting with
            new technology.
          </p>
        </div>

        <div className="journey-layout">
          <JourneyTerminal />

          <div className="journey-timeline">
            <div className="journey-line" />

            {milestones.map((milestone) => (
              <Milestone key={milestone.id} milestone={milestone} />
            ))}
          </div>
        </div>

        <div className="journey-principle glass">
          <span className="section-index">CURRENT PRINCIPLE</span>

          <h3>
            Build something.
            <br />
            Learn something.
            <br />
            Build it better.
          </h3>

          <span className="principle-mark">07</span>
        </div>
      </div>
    </section>
  );
}

export default Journey;
