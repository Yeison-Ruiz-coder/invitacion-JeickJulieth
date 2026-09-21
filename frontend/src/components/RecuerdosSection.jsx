import { useEffect, useRef, useState } from "react";
import "./RecuerdosSection.css";

const recuerdoFotos = [
  { src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80", hour: 12, width: "32%" },
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80", hour: 1, width: "33%" },
  { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80", hour: 2, width: "31%" },
  { src: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80", hour: 3, width: "30%" },
  { src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80", hour: 4, width: "34%" },
  { src: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80", hour: 5, width: "30%" },
  { src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=900&q=80", hour: 6, width: "29%" },
  { src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80", hour: 7, width: "31%" },
  { src: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=900&q=80", hour: 8, width: "28%" },
  { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80", hour: 9, width: "30%" },
  { src: "https://res.cloudinary.com/dixyebg5i/image/upload/v1789890825/6163a752-2257-45f3-80fd-72ed02bc9a15_yuchd6.jpg", hour: 10, width: "29%" },
  { src: "https://res.cloudinary.com/dixyebg5i/image/upload/v1789890546/IMG-20250506-WA0019_q7jkap.jpg", hour: 11, width: "32%" },
];

function RecuerdosSection() {
  const sectionRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / (rect.height + windowHeight * 0.6))
      );

      setRotation(progress * 180);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleOpen = (index) => setSelectedIndex(index);
  const handleClose = () => setSelectedIndex(null);

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === null ? 0 : (prev + 1) % recuerdoFotos.length));
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === null ? 0 : (prev - 1 + recuerdoFotos.length) % recuerdoFotos.length));
  };

  const selectedPhoto = selectedIndex === null ? null : recuerdoFotos[selectedIndex];

  return (
    <section ref={sectionRef} className="recuerdos-section" aria-label="Recuerdos">
      <div className="recuerdos-header">
        <div className="recuerdos-eyebrow">Nuestros Momentos</div>
        <h2 className="recuerdos-title">Recuerdos</h2>
        <div className="recuerdos-signature">Jeick &amp; Fernanda</div>
      </div>

      <div className="recuerdos-stage" aria-label="Galería de fotos">
        <div className="recuerdo-rotor" style={{ transform: `rotate(${rotation}deg)` }}>
          {recuerdoFotos.map((foto, index) => {
            const angle = ((foto.hour % 12) / 12) * (Math.PI * 2) - Math.PI / 2;
            const radiusX = 43;
            const radiusY = 37;
            const left = 50 + Math.cos(angle) * radiusX;
            const top = 50 + Math.sin(angle) * radiusY;

            return (
              <button
                key={`${foto.src}-${foto.hour}`}
                type="button"
                className="recuerdo-card"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  width: foto.width,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => handleOpen(index)}
                aria-label={`Abrir foto ${index + 1}`}
              >
                <div className="recuerdo-card-frame" style={{ transform: `rotate(${-rotation}deg)` }}>
                  <img src={foto.src} alt={`Foto ${index + 1}`} loading="lazy" />
                </div>
              </button>
            );
          })}
        </div>

        <div className="recuerdo-center" aria-hidden="true">
          <div className="recuerdo-center-ring" />
        </div>
      </div>

      {selectedPhoto && (
        <div className="recuerdo-lightbox" onClick={handleClose} role="dialog" aria-modal="true">
          <button type="button" className="recuerdo-lightbox-close" onClick={handleClose} aria-label="Cerrar vista ampliada">
            ×
          </button>

          <button type="button" className="recuerdo-lightbox-nav recuerdo-lightbox-prev" onClick={(event) => { event.stopPropagation(); handlePrev(); }} aria-label="Foto anterior">
            ‹
          </button>

          <img src={selectedPhoto.src} alt="Foto ampliada" className="recuerdo-lightbox-image" onClick={(event) => event.stopPropagation()} />

          <button type="button" className="recuerdo-lightbox-nav recuerdo-lightbox-next" onClick={(event) => { event.stopPropagation(); handleNext(); }} aria-label="Siguiente foto">
            ›
          </button>
        </div>
      )}
    </section>
  );
}

export default RecuerdosSection;
