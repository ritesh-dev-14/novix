import React, { useState, useEffect } from "react";
import "./FloatingContactWidget.css";
import { Phone, Mail, ChevronDown, X, Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { CONTACT_CONFIG, WIDGET_CONFIG } from "./config";

export default function FloatingContactWidget() {
  const [isVisible, setIsVisible] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");

  // Fade in after mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), WIDGET_CONFIG.appearDelay);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = () => {
    const phoneNumber = CONTACT_CONFIG.whatsapp.replace("https://wa.me/", "");
    const text = encodeURIComponent(
      message.trim() || "Hello, I would like to get in touch with you.",
    );
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank");
    setMessage("");
    setShowChat(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`floating-widget ${isVisible ? "visible" : ""}`}>
      {showChat ? (
        <>
          {/* WhatsApp Chat Panel */}
          <div className="whatsapp-panel">
            <button
              className="panel-header"
              onClick={() => setShowChat(false)}
              aria-label="Minimize chat"
            >
              <div className="panel-header-left">
                <FaWhatsapp className="whatsapp-icon" size={24} />
                <span>Let's chat on WhatsApp</span>
              </div>
              <ChevronDown size={20} />
            </button>

            <div className="panel-body">
              <div className="chat-bubble">
                <p>How can I help you? :)</p>
                <span className="chat-time">{getCurrentTime()}</span>
              </div>
            </div>

            <div className="panel-footer">
              <input
                type="text"
                className="panel-input"
                placeholder="Write your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              <button
                className="panel-send-btn"
                onClick={handleSend}
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
          </div>

          {/* Close Button */}
          <button
            className="close-btn"
            onClick={() => setShowChat(false)}
            aria-label="Close"
          >
            <X size={22} />
          </button>
        </>
      ) : (
        /* Stacked Contact Icons */
        <div className="contact-stack">
          <a
            href={CONTACT_CONFIG.phone}
            className="contact-circle call"
            aria-label="Call us"
          >
            <Phone size={22} />
          </a>

          <button
            className="contact-circle whatsapp"
            onClick={() => setShowChat(true)}
            aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp className="whatsapp-icon" size={26} />
          </button>

          <a
            href={CONTACT_CONFIG.email}
            className="contact-circle email"
            aria-label="Email us"
          >
            <Mail size={22} />
          </a>
        </div>
      )}
    </div>
  );
}

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}