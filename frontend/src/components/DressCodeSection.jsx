import "./DressCodeSection.css";

const dressCodeStars = [
  { left: "10%", delay: "0s", drift: "-8px", duration: "7s", size: "7px" },
  { left: "20%", delay: "0.9s", drift: "10px", duration: "6.8s", size: "8px" },
  { left: "30%", delay: "1.6s", drift: "-12px", duration: "6.2s", size: "7px" },
  { left: "40%", delay: "0.4s", drift: "12px", duration: "7.6s", size: "8px" },
  { left: "52%", delay: "1.1s", drift: "-14px", duration: "7.1s", size: "9px" },
  { left: "64%", delay: "2s", drift: "16px", duration: "6.7s", size: "7px" },
  { left: "76%", delay: "0.7s", drift: "-10px", duration: "7.4s", size: "8px" },
  { left: "88%", delay: "1.3s", drift: "14px", duration: "6.9s", size: "7px" },
  { left: "18%", delay: "2.3s", drift: "-16px", duration: "7.2s", size: "8px" },
  { left: "72%", delay: "2.8s", drift: "18px", duration: "7.3s", size: "8px" },
];

function DressCodeSection() {
  return (
    <section className="dress-code-section" id="sdc" aria-label="Código de vestimenta">
      <div className="dress-code-header">
        <div className="dress-code-eyebrow">Etiqueta</div>
        <h2 className="dress-code-title">Código de vestimenta</h2>
      </div>

      <div className="dress-code-note">Formal &amp; elegante</div>
      <div className="dress-code-warn">
        ✦ &nbsp; Blanco y azul marino reservados para los novios. Invitados, por favor abstenerse de usar estos colores. &nbsp; ✦
      </div>

      <div className="dress-code-figures" id="dcFigs">
        <div className="dress-code-figure dress-code-figure--male">
          <svg
            className="dress-code-svg dress-code-svg--male"
            viewBox="0 0 100 200"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M35 44 Q34 14 50 11 Q66 14 65 44 Z" fill="#F8F7F5" />
            <path d="M10 48 Q28 40 50 44 Q72 40 90 48 Q84 54 50 51 Q16 54 10 48 Z" fill="#0F2347" />
            <rect x="35" y="40" width="30" height="4.5" rx="1.5" fill="#D6C5A4" />
            <circle cx="50" cy="64" r="14" fill="#F9F9F7" />
            <rect x="45" y="77" width="10" height="8" rx="2" fill="#D6C5A4" />
            <path d="M18 85 Q25 80 40 82 L42 122 L58 122 L60 82 Q75 80 82 85 L83 136 L17 136 Z" fill="#0D2246" />
            <path d="M40 82 L36 106 L50 100 L64 106 L60 82 L50 86 Z" fill="#D9C4A2" opacity=".8" />
            <polygon points="48,84 45,105 50,101 55,105 52,84" fill="#D9C4A2" opacity=".85" />
            <rect x="19" y="134" width="62" height="5" rx="2" fill="#F3F1EE" />
            <rect x="42" y="131" width="16" height="11" rx="2" fill="#D9C4A2" />
            <path d="M19 138 L26 194 L47 191 L50 170 L53 191 L74 194 L81 138 Z" fill="#0F2347" />
            <path d="M26 192 L18 200 L46 200 L47 192 Z" fill="#0B1B31" />
            <path d="M74 192 L53 192 L54 200 L82 200 Z" fill="#0B1B31" />
          </svg>
          <div className="dress-code-figure-name">Caballero</div>
          <div className="dress-code-figure-hint">
            Evitar blanco y azul marino
            <br />
            estilo formal
          </div>
        </div>

        <div className="dress-code-divider" aria-hidden="true" />

        <div className="dress-code-figure dress-code-figure--female">
          <svg
            className="dress-code-svg dress-code-svg--female"
            viewBox="0 0 100 200"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <ellipse cx="50" cy="11" rx="13" ry="9" fill="#F5F4F2" />
            <circle cx="50" cy="30" r="14" fill="#FFFDFB" />
            <rect x="46" y="43" width="8" height="8" rx="2" fill="#D9C4A2" />
            <path d="M32 52 Q20 63 18 80" stroke="#0F2347" strokeWidth="10" strokeLinecap="round" fill="none" />
            <path d="M68 52 Q80 63 82 80" stroke="#0F2347" strokeWidth="10" strokeLinecap="round" fill="none" />
            <path d="M32 48 Q37 44 46 47 L47 80 L53 80 L54 47 Q63 44 68 48 L70 84 L30 84 Z" fill="#F9F9F7" />
            <rect x="30" y="82" width="40" height="7" rx="3" fill="#D9C4A2" opacity=".7" />
            <path d="M30 88 Q16 118 4 200 L96 200 Q84 118 70 88 Z" fill="#FFFDFB" />
            <path d="M38 89 Q26 130 16 200" stroke="#0F2347" strokeWidth="1.5" fill="none" opacity=".35" />
            <path d="M50 89 L50 200" stroke="#0F2347" strokeWidth="1.5" fill="none" opacity=".25" />
            <path d="M62 89 Q74 130 84 200" stroke="#0F2347" strokeWidth="1.5" fill="none" opacity=".35" />
          </svg>
          <div className="dress-code-figure-name">Dama</div>
          <div className="dress-code-figure-hint">
            Evitar blanco y azul marino
            <br />
            estilo formal
          </div>
        </div>
      </div>

      <div className="dress-code-stars" aria-hidden="true">
        {dressCodeStars.map((star, index) => (
          <span
            key={index}
            className="dress-code-star dress-code-star--glyph"
            style={{
              left: star.left,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
              animationDuration: star.duration,
              "--drift-x": star.drift,
            }}
          >
            {index % 3 === 0 ? "✦" : index % 3 === 1 ? "✧" : "✹"}
          </span>
        ))}
      </div>
    </section>
  );
}

export default DressCodeSection;
