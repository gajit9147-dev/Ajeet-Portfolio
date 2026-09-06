import { useState } from "react";
import "./AIAssistant.css";

const suggestedQuestions = [
  "What has Ajeet built?",
  "What is Ajeet's tech stack?",
  "Tell me about InnerVoice",
  "What is Ajeet learning?",
];

function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi. I'm Ajeet AI — an interface for exploring Ajeet's projects, skills and journey.",
    },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = (text) => {
    const message = text.trim();

    if (!message) return;

    setMessages((current) => [
      ...current,
      {
        role: "user",
        content: message,
      },
      {
        role: "assistant",
        content:
          "AI connection is being prepared. Soon I'll be able to answer this using Ajeet's portfolio data.",
      },
    ]);

    setInput("");
  };

  return (
    <>
      <button
        className={`ai-launcher ${open ? "is-open" : ""}`}
        onClick={() => setOpen((value) => !value)}
        aria-label="Open Ajeet AI"
      >
        <span className="ai-launcher-core">
          <span>AI</span>
        </span>

        <span className="ai-launcher-copy">
          <strong>AJEET AI</strong>
          <small>ASK MY SYSTEM</small>
        </span>

        <span className="ai-launcher-arrow">
          {open ? "×" : "↗"}
        </span>
      </button>

      {open && (
        <div className="ai-chat glass">
          <div className="ai-chat-header">
            <div className="ai-chat-title">
              <span className="ai-chat-orb">AI</span>

              <div>
                <strong>AJEET AI</strong>
                <span>
                  <i />
                  SYSTEM READY
                </span>
              </div>
            </div>

            <button
              className="ai-close"
              onClick={() => setOpen(false)}
              aria-label="Close Ajeet AI"
            >
              ×
            </button>
          </div>

          <div className="ai-chat-body">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`ai-message ${message.role}`}
              >
                <span className="ai-message-label">
                  {message.role === "assistant" ? "AI" : "YOU"}
                </span>

                <p>{message.content}</p>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="ai-suggestions">
                <span>TRY ASKING</span>

                {suggestedQuestions.map((question) => (
                  <button
                    key={question}
                    onClick={() => sendMessage(question)}
                  >
                    {question}
                    <span>↗</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            className="ai-input-area"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(input);
            }}
          >
            <span className="ai-input-prompt">$</span>

            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about Ajeet..."
              aria-label="Ask Ajeet AI"
            />

            <button type="submit">SEND ↗</button>
          </form>
        </div>
      )}
    </>
  );
}

export default AIAssistant;
