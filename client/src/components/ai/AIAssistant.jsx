import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./AIAssistant.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const suggestedQuestions = [
  "What has Ajeet built?",
  "What is Ajeet's tech stack?",
  "Tell me about InnerVoice",
  "What is Ajeet learning?",
];

const initialMessage = {
  role: "assistant",
  content:
    "Hi. I'm Ajeet AI — an interface for exploring Ajeet's projects, skills and journey.",
};

function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([initialMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (open) {
      scrollToBottom();
    }
  }, [messages, loading, open]);

  const sendMessage = async (text) => {
    const message = text.trim();

    if (!message || loading) return;

    const userMessage = {
      role: "user",
      content: message,
    };

    const conversation = [...messages, userMessage];

    setMessages(conversation);
    setInput("");
    setLoading(true);

    const outgoingHistory = conversation
      .filter((m) => !m.error && m.content && !m.content.includes("couldn't connect"))
      .map(({ role, content }) => ({ role, content }));

    try {
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          messages: outgoingHistory,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "AI request failed");
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.message,
        },
      ]);
    } catch (error) {
      console.error("Ajeet AI error:", error);

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "I couldn't connect to the AI system right now. Please try again shortly.",
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    if (loading) return;

    setMessages([initialMessage]);
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
                  {loading ? "PROCESSING" : "SYSTEM READY"}
                </span>
              </div>
            </div>

            <div className="ai-header-actions">
              <button
                className="ai-clear"
                onClick={clearChat}
                disabled={loading}
                title="Clear conversation"
              >
                CLEAR
              </button>

              <button
                className="ai-close"
                onClick={() => setOpen(false)}
                aria-label="Close Ajeet AI"
              >
                ×
              </button>
            </div>
          </div>

          <div className="ai-chat-body">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`ai-message ${message.role} ${
                  message.error ? "has-error" : ""
                }`}
              >
                <span className="ai-message-label">
                  {message.role === "assistant" ? "AI" : "YOU"}
                </span>

                <div className="ai-message-content">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      a: ({ href, children, ...props }) => (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ai-link"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          {...props}
                        >
                          {children}
                          <span className="ai-link-icon" aria-hidden="true"> ↗</span>
                        </a>
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}

            {loading && (
              <div className="ai-message assistant">
                <span className="ai-message-label">AI</span>

                <div className="ai-typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            {messages.length === 1 && !loading && (
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

            <div ref={messagesEndRef} />
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
              placeholder={
                loading ? "AI is thinking..." : "Ask about Ajeet..."
              }
              disabled={loading}
              aria-label="Ask Ajeet AI"
            />

            <button
              type="submit"
              disabled={loading || !input.trim()}
            >
              {loading ? "..." : "SEND ↗"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default AIAssistant;
