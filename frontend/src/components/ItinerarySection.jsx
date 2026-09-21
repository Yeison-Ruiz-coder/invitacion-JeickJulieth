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
            <div className="itinerary-time">4:00 pm</div>
            <div className="itinerary-event">Llegada de invitados</div>
          </div>
        </div>

        <div className="itinerary-item">
          <div className="itinerary-marker"><div className="itinerary-gem itinerary-gem-mid" /></div>
          <div className="itinerary-copy">
            <div className="itinerary-time">5:00 pm</div>
            <div className="itinerary-event">Ceremonia Cristiana</div>
          </div>
        </div>

        <div className="itinerary-item">
          <div className="itinerary-marker"><div className="itinerary-gem itinerary-gem-navy" /></div>
          <div className="itinerary-copy">
            <div className="itinerary-event">Sesión de fotos</div>
          </div>
        </div>

        <div className="itinerary-item">
          <div className="itinerary-marker"><div className="itinerary-gem" /></div>
          <div className="itinerary-copy">
            <div className="itinerary-event">Cena</div>
          </div>
        </div>

        <div className="itinerary-item itinerary-item--end">
          <div className="itinerary-marker"><div className="itinerary-gem itinerary-gem-mid" /></div>
          <div className="itinerary-copy">
            <div className="itinerary-event">Entretenimiento</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ItinerarySection;
