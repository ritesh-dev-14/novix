import React, { useState, useEffect } from "react";
import "./FloatingContactWidget.css";
import { Phone, Mail, ChevronDown, X, Send } from "lucide-react";
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
                <WhatsAppIcon />
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
            <WhatsAppIcon />
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

// Custom WhatsApp SVG Icon
function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="whatsapp-icon"
    >
      <path
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.768.966-.941 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a6.963 6.963 0 00-6.961 6.961 6.968 6.968 0 006.961 6.961 6.968 6.968 0 006.961-6.961 6.968 6.968 0 00-6.957-6.961m0-1.38C19.026 5.62 22 8.594 22 12.422c0 3.827-2.974 6.801-6.802 6.801-3.828 0-6.802-2.974-6.802-6.801 0-3.828 2.974-6.802 6.802-6.802"
        fill="currentColor"
      />
    </svg>
  );
}