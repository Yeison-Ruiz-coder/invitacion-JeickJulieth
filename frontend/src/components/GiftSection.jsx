import "./GiftSection.css";

function GiftSection() {
  return (
    <section className="gift-section" id="sgifts" aria-label="Mesa de regalos">
      <div className="gift-header">
        <div className="gift-eyebrow">Con cariño</div>
        <h2 className="gift-title">Mesa de Regalos</h2>
      </div>

      <div className="gift-intro-card">
        <div className="gift-intro-copy">
          <div className="gift-message-title">Tu presencia es nuestro mayor regalo</div>
          <div className="gift-message-text">
            El mejor regalo que podemos recibir es compartir este día que Dios ha preparado para nosotros junto a las personas que amamos. Tu presencia hará aún más especial nuestra celebración.
          </div>
        </div>
      </div>
    </section>
  );
}

export default GiftSection;
