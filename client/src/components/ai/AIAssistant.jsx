import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./AIAssistant.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const suggestedQuestions = [
  "What has Ajeet built?",
  "What is Ajeet's tech stack?",
  "Tell me about ScamShield",
  "What is Ajeet learning?",
];

const initialMessage = {
  role: "assistant",
  content:
    "Hi, I'm Ajeet AI. I answer questions about Ajeet's projects and skills using facts from this site. If I don't know, I'll say so.",
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
        aria-label={open ? "Close Ajeet AI chat" : "Open Ajeet AI chat"}
        aria-expanded={open}
      >
        {open ? "close" : "\u25B8 ask_ajeet()"}
      </button>

      {open && (
        <div className="ai-chat" role="dialog" aria-label="Ajeet AI chat">
          <div className="ai-chat-header">
            <div className="ai-chat-title">
              <div>
                <strong>Ajeet AI</strong>
                <span>{loading ? "thinking..." : "ready"}</span>
              </div>
            </div>

            <div className="ai-header-actions">
              <button
                className="ai-clear"
                onClick={clearChat}
                disabled={loading}
                title="Clear conversation"
              >
                clear
              </button>

              <button
                className="ai-close"
                onClick={() => setOpen(false)}
                aria-label="Close Ajeet AI"
              >
                &times;
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
                  {message.role === "assistant" ? "ai" : "you"}
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
                <span>try asking</span>

                {suggestedQuestions.map((question) => (
                  <button
                    key={question}
                    onClick={() => sendMessage(question)}
                  >
                    {question}
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
            <span className="ai-input-prompt" aria-hidden="true">&gt;</span>

            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={
                loading ? "thinking..." : "ask about my projects..."
              }
              disabled={loading}
              aria-label="Ask Ajeet AI"
            />

            <button
              type="submit"
              disabled={loading || !input.trim()}
            >
              {loading ? "..." : "run \u25B6"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default AIAssistant;
