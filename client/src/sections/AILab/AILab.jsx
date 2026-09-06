import "./AILab.css";

const labModules = [
  {
    code: "01",
    title: "AI / ML",
    description:
      "Exploring machine learning concepts, intelligent systems and practical AI applications.",
    status: "LEARNING",
  },
  {
    code: "02",
    title: "GENAI",
    description:
      "Experimenting with generative AI, AI APIs and intelligent user experiences.",
    status: "EXPLORING",
  },
  {
    code: "03",
    title: "LLM",
    description:
      "Learning how large language models can power useful developer and product workflows.",
    status: "EXPLORING",
  },
  {
    code: "04",
    title: "EXPERIMENTS",
    description:
      "Building small experiments to understand, test and iterate on new AI ideas.",
    status: "ACTIVE",
  },
];

function NeuralCore() {
  return (
    <div className="neural-core">
      <div className="neural-grid" />

      <div className="neural-ring neural-ring-one" />
      <div className="neural-ring neural-ring-two" />
      <div className="neural-ring neural-ring-three" />

      <div className="neural-lines">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="neural-node node-one" />
      <div className="neural-node node-two" />
      <div className="neural-node node-three" />
      <div className="neural-node node-four" />
      <div className="neural-node node-five" />

      <div className="neural-center">
        <span>AI</span>
        <small>CORE</small>
      </div>

      <div className="neural-label neural-label-top">
        MODEL.ACTIVE
      </div>

      <div className="neural-label neural-label-bottom">
        INTELLIGENCE.SYSTEM
      </div>
    </div>
  );
}

function AILabTerminal() {
  return (
    <div className="ai-terminal glass">
      <div className="terminal-header">
        <div className="terminal-dots">
          <i />
          <i />
          <i />
        </div>

        <span>AI_LAB / TERMINAL</span>

        <div className="terminal-online">
          <i />
          ONLINE
        </div>
      </div>

      <div className="terminal-body">
        <div className="terminal-line">
          <span className="terminal-prompt">$</span>
          <span>system.init()</span>
        </div>

        <div className="terminal-output">
          AI exploration environment initialized
        </div>

        <div className="terminal-line">
          <span className="terminal-prompt">$</span>
          <span>model.status()</span>
        </div>

        <div className="terminal-output success">
          learning · experimenting · building
        </div>

        <div className="terminal-line">
          <span className="terminal-prompt">$</span>
          <span>pipeline.load()</span>
        </div>

        <div className="terminal-output">
          frontend → backend → intelligence
        </div>

        <div className="terminal-line">
          <span className="terminal-prompt">$</span>
          <span>experiment.run()</span>
        </div>

        <div className="terminal-output">
          testing new ideas...
        </div>

        <div className="terminal-cursor">▊</div>
      </div>
    </div>
  );
}

function AILab() {
  return (
    <section className="section ai-lab-section" id="ai-lab">
      <div className="section-shell">
        <div className="section-heading ai-lab-heading">
          <div>
            <span className="section-index">05 / AI LAB</span>

            <h2>
              Where I
              <br />
              Experiment.
            </h2>
          </div>

          <p>
            A small space for exploring artificial intelligence, generative AI
            and intelligent systems through practical experiments.
          </p>
        </div>

        <div className="ai-lab-layout">
          <div className="ai-visual glass">
            <div className="ai-visual-header">
              <span>INTELLIGENCE_CORE</span>
              <span>SYS.05</span>
            </div>

            <NeuralCore />

            <div className="ai-visual-footer">
              <span>NEURAL NETWORK</span>
              <span>EXPERIMENTAL</span>
            </div>
          </div>

          <AILabTerminal />
        </div>

        <div className="lab-modules">
          {labModules.map((module) => (
            <article className="lab-module glass" key={module.code}>
              <div className="lab-module-top">
                <span>{module.code}</span>

                <span className="lab-status">
                  <i />
                  {module.status}
                </span>
              </div>

              <h3>{module.title}</h3>

              <p>{module.description}</p>

              <span className="module-arrow">↗</span>
            </article>
          ))}
        </div>

        <div className="ajeet-ai glass">
          <div className="ajeet-ai-orb">
            <span>AI</span>
          </div>

          <div className="ajeet-ai-copy">
            <span className="section-index">AI / AJEET</span>

            <h3>Ajeet AI</h3>

            <p>
              An AI-powered interface for exploring my projects, technical
              stack, learning journey and experiments.
            </p>
          </div>

          <div className="ajeet-ai-status">
            <span>
              <i />
              INTERFACE READY
            </span>

            <button type="button">
              GEMINI AI
              <span>ONLINE</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AILab;
