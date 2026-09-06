const journeyItems = [
  {
    year: "01",
    type: "EDUCATION",
    title: "CSE · Artificial Intelligence & Machine Learning",
    organization: "Currently pursuing",
    description:
      "Building a foundation in computer science, artificial intelligence and machine learning while developing practical software projects.",
    status: "CURRENT",
  },
  {
    year: "02",
    type: "BUILDING",
    title: "Full-Stack Development",
    organization: "Projects & Experiments",
    description:
      "Developing web applications across frontend, backend, databases and APIs while learning how complete systems work together.",
    status: "ACTIVE",
  },
  {
    year: "03",
    type: "HACKATHONS",
    title: "Learning Through Challenges",
    organization: "Hackathons & Competitions",
    description:
      "Turning ideas into working prototypes under time constraints and learning through rapid experimentation.",
    status: "ACTIVE",
  },
  {
    year: "04",
    type: "AI EXPLORATION",
    title: "Exploring Intelligent Systems",
    organization: "AI / ML / GenAI",
    description:
      "Exploring how AI can be integrated into useful products, interfaces and full-stack systems.",
    status: "EXPLORING",
  },
];

function Journey() {
  return (
    <section id="journey" className="section journey-section">
      <div className="section-shell">
        <div className="section-heading">
          <span className="section-index">07 / JOURNEY</span>

          <div>
            <p className="section-kicker">EDUCATION // BUILDING // GROWTH</p>
            <h2>The path so far.</h2>
          </div>
        </div>

        <div className="journey-intro glass">
          <div>
            <span className="journey-label">CURRENT_STATE</span>

            <h3>
              Student by identity.
              <br />
              <span>Builder by practice.</span>
            </h3>
          </div>

          <p>
            My journey is currently centered around learning, building and
            experimenting. Each project adds another layer to the systems I
            understand and the problems I can solve.
          </p>
        </div>

        <div className="journey-timeline">
          <div className="journey-line" />

          {journeyItems.map((item, index) => (
            <article className="journey-item" key={item.year}>
              <div className="journey-marker">
                <span>{item.year}</span>
              </div>

              <div className="glass journey-card">
                <div className="journey-card-top">
                  <span className="journey-type">{item.type}</span>

                  <span className="journey-status">
                    <i />
                    {item.status}
                  </span>
                </div>

                <h3>{item.title}</h3>

                <span className="journey-org">{item.organization}</span>

                <p>{item.description}</p>

                <span className="journey-index">
                  0{index + 1} / 0{journeyItems.length}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="journey-footer">
          <div className="glass journey-footer-card">
            <span>NEXT_CHAPTER</span>
            <strong>BUILD → LEARN → ITERATE → REPEAT</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Journey;
