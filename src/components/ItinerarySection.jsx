import { useEffect, useRef } from "react";
import "./ItinerarySection.css";

function ItinerarySection() {
  const itineraryTrackRef = useRef(null);

  useEffect(() => {
    const updateGlowPosition = () => {
      const track = itineraryTrackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const travelRange = Math.max(rect.height - 120, 1);
      const progress = Math.min(
        Math.max((window.innerHeight - rect.top) / (rect.height + window.innerHeight), 0),
        1
      );

      const glowTop = 18 + progress * travelRange;
      track.style.setProperty("--itinerary-glow-top", `${glowTop}px`);
    };

    updateGlowPosition();
    window.addEventListener("scroll", updateGlowPosition, { passive: true });
    window.addEventListener("resize", updateGlowPosition);

    return () => {
      window.removeEventListener("scroll", updateGlowPosition);
      window.removeEventListener("resize", updateGlowPosition);
    };
  }, []);

  return (
    <section className="itinerary-section-card" aria-label="Itinerario del evento">
      <div className="itinerary-header">
        <div className="itinerary-section-eyebrow">El Gran Día</div>
        <h2 className="itinerary-section-heading">Itinerario</h2>
      </div>
      <div ref={itineraryTrackRef} className="itinerary-track">
        <div className="itinerary-glow" />

        <div className="itinerary-item">
          <div className="itinerary-marker"><div className="itinerary-gem" /></div>
          <div className="itinerary-copy">
            <div className="itinerary-time">12:00</div>
            <div className="itinerary-event">Ceremonia Religiosa</div>
          </div>
        </div>

        <div className="itinerary-item">
          <div className="itinerary-marker"><div className="itinerary-gem itinerary-gem-mid" /></div>
          <div className="itinerary-copy">
            <div className="itinerary-time">1:15</div>
            <div className="itinerary-event">Sesión de Fotos</div>
          </div>
        </div>

        <div className="itinerary-item">
          <div className="itinerary-marker"><div className="itinerary-gem itinerary-gem-navy" /></div>
          <div className="itinerary-copy">
            <div className="itinerary-time">2:00</div>
            <div className="itinerary-event">Traslado al Rancho</div>
          </div>
        </div>

        <div className="itinerary-item">
          <div className="itinerary-marker"><div className="itinerary-gem" /></div>
          <div className="itinerary-copy">
            <div className="itinerary-time">2:30</div>
            <div className="itinerary-event">Recepción &amp; Bebidas</div>
          </div>
        </div>

        <div className="itinerary-item">
          <div className="itinerary-marker"><div className="itinerary-gem itinerary-gem-mid" /></div>
          <div className="itinerary-copy">
            <div className="itinerary-time">3:30</div>
            <div className="itinerary-event">Comida Fuerte</div>
          </div>
        </div>

        <div className="itinerary-item">
          <div className="itinerary-marker"><div className="itinerary-gem itinerary-gem-navy" /></div>
          <div className="itinerary-copy">
            <div className="itinerary-time">5:00</div>
            <div className="itinerary-event">Entretenimiento</div>
          </div>
        </div>

        <div className="itinerary-item">
          <div className="itinerary-marker"><div className="itinerary-gem" /></div>
          <div className="itinerary-copy">
            <div className="itinerary-time">—</div>
            <div className="itinerary-event">Vals · Víbora · Ramo</div>
            <div className="itinerary-sub">Pastel &amp; Brindis</div>
          </div>
        </div>

        <div className="itinerary-item itinerary-item--end">
          <div className="itinerary-marker"><div className="itinerary-gem" /></div>
          <div className="itinerary-copy">
            <div className="itinerary-time">8:30</div>
            <div className="itinerary-event">Fiesta</div>
            <div className="itinerary-sub">Hasta la 1:30 a.m.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ItinerarySection;
