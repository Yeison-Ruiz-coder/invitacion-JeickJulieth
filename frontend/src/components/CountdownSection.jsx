import "./CountdownSection.css";

function CountdownSection({ timeLeft }) {
  return (
    <section className="countdown-section-card" aria-label="Cuenta regresiva">
      <div className="countdown-section-eyebrow">¡Ya Falta Poco!</div>
      <h2 className="countdown-section-title">Cuenta Regresiva</h2>
      <div className="countdown-section-grid">
        <div className="countdown-section-box">
          <div className="countdown-section-number">
            {String(timeLeft.days).padStart(3, "0")}
          </div>
          <div className="countdown-section-label">Días</div>
        </div>
        <div className="countdown-section-box">
          <div className="countdown-section-number">
            {String(timeLeft.hours).padStart(2, "0")}
          </div>
          <div className="countdown-section-label">Horas</div>
        </div>
        <div className="countdown-section-box">
          <div className="countdown-section-number">
            {String(timeLeft.minutes).padStart(2, "0")}
          </div>
          <div className="countdown-section-label">Mins</div>
        </div>
        <div className="countdown-section-box">
          <div className="countdown-section-number">
            {String(timeLeft.seconds).padStart(2, "0")}
          </div>
          <div className="countdown-section-label">Segs</div>
        </div>
      </div>
    </section>
  );
}

export default CountdownSection;
