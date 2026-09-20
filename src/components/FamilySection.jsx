import "./FamilySection.css";

function FamilySection() {
  return (
    <section className="family-section" aria-label="Nuestra familia">

      <div className="family-eyebrow">Con la Bendición de</div>
      <h2 className="family-title">Nuestra Familia</h2>

      <div className="family-group">
        <div className="family-role">Madre de la Novia</div>
        <div className="family-name">Rocío Martínez</div>
      </div>

      <div className="family-separator" aria-hidden="true">
        <span>✦</span>
        <span>✦</span>
        <span>✦</span>
      </div>

      <div className="family-group">
        <div className="family-role">Padres del Novio</div>
        <div className="family-name">Gerardo Moreno</div>
        <div className="family-and">&amp;</div>
        <div className="family-name">Fabiola Mora</div>
      </div>

    </section>
  );
}

export default FamilySection;
