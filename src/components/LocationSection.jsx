import "./LocationSection.css";

function LocationSection() {
  return (
    <section className="location-section-card" aria-label="Ubicaciones">
      <h2 className="location-section-title">Ubicaciones</h2>

      <div className="location-section-grid">
        <article className="location-card location-card-featured">
          <div className="location-card-title">Basílica de San Francisco</div>
          <div className="location-card-subtitle">Ceremonia Religiosa</div>
          <div className="location-card-time">12:00 pm</div>
          <div className="location-map-wrap">
            <iframe
              src="https://www.google.com/maps?q=Bas%C3%ADlica%20Menor%20de%20San%20Francisco%20de%20As%C3%ADs%2C%20Popay%C3%A1n%2C%20Cauca&output=embed"
              width="100%"
              height="220"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen=""
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Basílica de San Francisco de Popayán"
            />
          </div>
          <a
            className="location-card-button"
            href="https://maps.google.com/?q=Bas%C3%ADlica%20Menor%20de%20San%20Francisco%20de%20As%C3%ADs%2C%20Popay%C3%A1n%2C%20Cauca"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cómo Llegar
          </a>
        </article>

        <article className="location-card location-card-secondary">
          <div className="location-card-title location-card-title-small">Parque Caldas</div>
          <div className="location-card-subtitle">Fiesta &amp; Celebración</div>
          <div className="location-card-time">2:30 pm</div>
          <div className="location-map-wrap">
            <iframe
              src="https://maps.google.com/maps?q=Parque%20Caldas%2C%20Popay%C3%A1n%2C%20Cauca&output=embed"
              width="100%"
              height="200"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen=""
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación del evento en Popayán"
            />
          </div>
          <a
            className="location-card-button"
            href="https://maps.google.com/?q=Parque%20Caldas%2C%20Popay%C3%A1n%2C%20Cauca"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cómo Llegar
          </a>
        </article>
      </div>
    </section>
  );
}

export default LocationSection;
