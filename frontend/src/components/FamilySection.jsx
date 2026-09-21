import "./FamilySection.css";

function FamilySection() {
  return (
    <section className="family-section" aria-label="Nuestra familia">
      <h2 className="family-title">Con la bendición de Dios y nuestros padres</h2>

      <div className="family-separator" aria-hidden="true">
        <span>✦</span>
        <span>✦</span>
        <span>✦</span>
      </div>

      <div className="family-group">
        <div className="family-role">Novio</div>
        <div className="family-name">Gerardo Moreno</div>
        <div className="family-name">Fabiola Mora</div>
      </div>

      <div className="family-separator" aria-hidden="true">
        <span>✦</span>
        <span>✦</span>
        <span>✦</span>
      </div>

      <div className="family-group">
        <div className="family-role">Novia</div>
        <div className="family-name">Rocío Martínez</div>
      </div>
    </section>
  );
}

export default FamilySection;
