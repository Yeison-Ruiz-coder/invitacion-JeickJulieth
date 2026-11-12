import { useEffect, useRef } from "react";
import "./ItinerarySection.css";

const itineraryItems = [
  { time: "04:30 a 05:00 p.m.", event: "Recepción y Bienvenida", detail: "Deja tu mensaje y firma el libro de invitados.", image: "/Imagenes/1-icons.png" },
  { time: "05:00 a 06:30 p.m.", event: "Ceremonia religiosa", image: "/Imagenes/2-icons.png" },
  { time: "06:30 a 07:00 p.m.", event: "Fotos de los novios en el salón de eventos", image: "/Imagenes/3-8.png" },
  { time: "07:00 a 07:30 p.m.", event: "Recepción y brindis familiar", image: "/Imagenes/4.png" },
  { time: "07:30 a 08:00 p.m.", event: "Lanzamiento del ramo de la novia", image: "/Imagenes/5.png" },
  { time: "08:00 a 09:00 p.m.", event: "Cena", image: "/Imagenes/6.png" },
  { time: "09:00 a 09:30 p.m.", event: "Partida de pastel", image: "/Imagenes/7.png" },
  { time: "09:30 a 10:00 p.m.", event: "Fotos con invitados", image: "/Imagenes/3-8.png" },
  { time: "10:00 a 10:30 p.m.", event: "Dinámica en pareja y familia", image: "/Imagenes/9.png" },
  { time: "10:30 a 11:00 p.m.", event: "Termina la celebración de la boda", image: "/Imagenes/10.png" },
];

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
        {itineraryItems.map((item, index) => (
          <div
            key={item.time}
            className={`itinerary-item${index === itineraryItems.length - 1 ? " itinerary-item--end" : ""}`}
          >
            <div className="itinerary-marker">
              <div className={`itinerary-gem ${index % 2 === 1 ? "itinerary-gem-navy" : ""}`} />
            </div>
            <div className="itinerary-content">
              <img className="itinerary-icon" src={item.image} alt="" aria-hidden="true" loading="lazy" />
              <div className="itinerary-copy">
                <div className="itinerary-time">{item.time}</div>
                <div className="itinerary-event">{item.event}</div>
                {item.detail && <div className="itinerary-sub">{item.detail}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ItinerarySection;
