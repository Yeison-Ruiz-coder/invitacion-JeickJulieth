import "./LocationSection.css";

function LocationSection() {
  return (
    <section className="location-section-card" aria-label="Ubicaciones">
      <div className="location-verse">
        <p className="location-verse-text">
          Con la bendición de Dios, dos corazones se unen para caminar juntos de su mano y bajo su amor.
        </p>
        <p className="location-verse-quote">
          “Mejores son dos que uno...<br />
          Y cordón de tres dobleces no se rompe pronto.”
        </p>
        <p className="location-verse-reference">Eclesiastés 4:9-12</p>
        <p className="location-verse-final">
          Con mucha alegría queremos invitarte a ser parte del comienzo de nuestra historia.
        </p>
      </div>

      <div className="orn rv">
        <svg
          viewBox="0 0 170 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M6 19 Q44 7 85 19 T164 19"
            stroke="#C4973A"
            strokeWidth=".85"
            opacity=".5"
          />
          <path
            d="M6 21 Q44 33 85 21 T164 21"
            stroke="#C4973A"
            strokeWidth=".5"
            opacity=".22"
          />
          <polygon
            points="85,4 88.1,13.8 98.5,13.8 90.2,19.6 93.3,29.4 85,23.6 76.7,29.4 79.8,19.6 71.5,13.8 81.9,13.8"
            fill="#C4973A"
            opacity=".75"
          />
          <polygon
            points="32,10 33.2,14 37.5,14 34,16.8 35.2,20.8 32,18 28.8,20.8 30,16.8 26.5,14 30.8,14"
            fill="#C4973A"
            opacity=".38"
          />
          <polygon
            points="138,10 139.2,14 143.5,14 140,16.8 141.2,20.8 138,18 134.8,20.8 136,16.8 132.5,14 136.8,14"
            fill="#C4973A"
            opacity=".38"
          />
        </svg>
      </div>

      <h2 className="location-section-title">Ubicación</h2>

      <div className="location-section-grid">
        <article className="location-card location-card-featured">
          <div className="location-card-title">Club Campestre Mar y Cielo</div>
          <div className="location-card-subtitle">Ceremonia &amp; Celebración</div>
          <div className="location-card-time">Santander de Quilichao</div>
          <div className="location-map-wrap">
            <iframe
              src="https://maps.google.com/maps?q=Club%20Campestre%20Mar%20y%20Cielo%2C%20Santander%20de%20Quilichao%2C%20Colombia&output=embed"
              width="100%"
              height="220"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen=""
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Club Campestre Mar y Cielo"
            />
          </div>
          <a
            className="location-card-button"
            href="https://maps.google.com/?q=Club%20Campestre%20Mar%20y%20Cielo%2C%20Santander%20de%20Quilichao%2C%20Colombia"
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
