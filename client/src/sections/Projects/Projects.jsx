import "./Projects.css";

const projects = [
  {
    title: "ScamShield",
    context: "PayPal AI Hackathon",
    text: "Paste a message, link or invoice. It scores the risk with Gemini plus some rules, and opens PayPal checkout only if the request looks safe.",
    image: "/images/projects/scamshield.jpg",
    alt: "ScamShield home page with a text box to paste a payment request",
    caption: "ScamShield start page, captured 16 Oct 2026",
    live: "https://scam-shield-paypal.onrender.com/",
    code: "https://github.com/gajit9147-dev/scam-shield-paypal",
    limit:
      "Sandbox only, no real money. The site shows 40 labelled test requests. That is a small test, not proof it works on real scams.",
  },
  {
    title: "QuietWindow",
    context: "Amazon Developer Hackathon",
    text: "A simulated Alexa+ page that plans chores around quiet time and gives a reason for each one. Nothing saves until you apply.",
    image: "/images/projects/quietwindow.jpg",
    alt: "QuietWindow plan review screen with a household request box and a tool call trace",
    caption: "QuietWindow plan view, captured 16 Oct 2026",
    live: "https://quietwindow.onrender.com/",
    code: "https://github.com/gajit9147-dev/quietwindow",
    limit:
      "A web simulation with a fictional household, not a real Alexa skill. Free hosting, so it can take a minute to wake up.",
  },
  {
    title: "PromptWar",
    context: "prompt engineering and project scoring",
    text: "Scores hackathon project ideas and gives mentor-style feedback using Gemini, with a simple fallback rule when the model is not available. The live site is branded VentureMind.",
    image: "/images/projects/promptwar.jpg",
    alt: "VentureMind landing page that turns skills and interests into a scored project blueprint",
    caption: "PromptWar live site (VentureMind), captured 16 Oct 2026",
    live: "https://prompt-war-lake.vercel.app",
    code: "https://github.com/gajit9147-dev/PromptWar",
    limit:
      "The scores are an AI opinion or a fallback rule, so treat them as hints, not a verdict.",
  },
];

export default function Projects() {
  return (
    <section id="projects">
      <div className="cell">
        <div className="cell-in">In [2]:</div>
        <div className="cell-body">
          <pre>
            <span className="com"># projects.py</span>
            {"\n"}projects = [
            {projects.map((p) => (
              <span key={p.title}>
                {"\n  "}
                <span className="str">&quot;{p.title}&quot;</span>,{" "}
                <span className="com"># {p.context}</span>
              </span>
            ))}
            {"\n"}]
          </pre>
        </div>
      </div>

      {projects.map((p, i) => (
        <article className="cell" key={p.title}>
          <div className="cell-in">Out [{i + 1}]:</div>
          <div className="cell-body">
            <h2 className="project-title">{p.title}</h2>
            <p className="project-text">{p.text}</p>

            {p.image && (
              <figure>
                <img src={p.image} alt={p.alt} loading="lazy" className="shot" />
                <figcaption className="fig">
                  <b>Fig. {i + 1}</b> {p.caption}
                </figcaption>
              </figure>
            )}

            <div className="sub">
              {p.live && (
                <>
                  <a href={p.live} target="_blank" rel="noreferrer">
                    try it
                  </a>{" "}
                  &middot;{" "}
                </>
              )}
              <a href={p.code} target="_blank" rel="noreferrer">
                code
              </a>
            </div>

            <p className="project-text warn">{p.limit}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
