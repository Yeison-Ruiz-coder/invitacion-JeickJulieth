import { useState } from "react";
import "./GiftSection.css";

function GiftSection() {
  const clabe = "4152 3145 0874 1322";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = clabe.replace(/\s+/g, "");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      const input = document.createElement("textarea");
      input.value = text;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <section className="gift-section" id="sgifts" aria-label="Mesa de regalos">

      <div className="gift-header">
        <div className="gift-eyebrow">Con cariño</div>
        <h2 className="gift-title">Mesa de Regalos</h2>
      </div>

      <div className="gift-intro-card">
        <div className="gift-box-icon" aria-hidden="true">
          <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="26" width="44" height="26" rx="3" fill="#f4d17f" stroke="#b98a2d" strokeWidth="2.2"/>
            <path d="M32 26V52" stroke="#b98a2d" strokeWidth="2.2" strokeLinecap="round"/>
            <path d="M10 30H54" stroke="#b98a2d" strokeWidth="2.2" strokeLinecap="round"/>
            <path d="M20 22Q26 16 32 20Q38 16 44 22" fill="none" stroke="#b98a2d" strokeWidth="2.2" strokeLinejoin="round"/>
            <path d="M11 27L20 16H28" fill="none" stroke="#b98a2d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M53 27L44 16H36" fill="none" stroke="#b98a2d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="46" cy="18" r="2.5" fill="#f5d88e"/>
            <circle cx="36" cy="16" r="2" fill="#f5d88e"/>
            <circle cx="21" cy="18" r="2" fill="#f5d88e"/>
          </svg>
        </div>

        <div className="gift-intro-copy">
          <div className="gift-intro-title">Mesa de Regalos en el Evento</div>
          <div className="gift-intro-sub">
            También contaremos con mesa de regalos física el día de la celebración
          </div>
        </div>
      </div>

      <div className="gift-transfer-card">
        <div className="gift-transfer-content">
          <div className="gift-bank-wrap" aria-hidden="true">
            <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 10L8 22L32 34L56 22L32 10Z" fill="#1e3b66"/>
              <path d="M14 25V39H22V25H14ZM28 25V39H36V25H28ZM42 25V39H50V25H42Z" fill="#1e3b66"/>
              <path d="M10 42H54V48H10V42Z" fill="#1e3b66"/>
              <path d="M18 25H46V39H18V25Z" fill="#f5f2ee" opacity="0.15"/>
            </svg>
          </div>

          <div className="gift-transfer-copy">
            <div className="gift-transfer-label">Transferencia</div>
            <div className="gift-transfer-name">CLABE · Sergio Humberto Padilla Villegas</div>
            <div className="gift-transfer-number">{clabe}</div>
          </div>
        </div>

        <button className="gift-copy-btn" type="button" onClick={handleCopy}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" fill="currentColor"/>
          </svg>
          {copied ? "CLABE COPIADA" : "Copiar CLABE"}
        </button>
      </div>
    </section>
  );
}

export default GiftSection;
