import { useEffect, useRef, useState } from "react";
import "./RecuerdosSection.css";

const recuerdoFotos = [
  { src: "https://res.cloudinary.com/dixyebg5i/image/upload/v1794332982/WhatsApp_Image_2026-11-10_at_12.46.41_PM_1_ltm6zd.jpg", hour: 12, width: "32%" },
  { src: "https://res.cloudinary.com/dixyebg5i/image/upload/v1794332982/WhatsApp_Image_2026-11-10_at_12.46.41_PM_jvq05u.jpg", hour: 12, width: "32%" },
  { src: "https://res.cloudinary.com/dixyebg5i/image/upload/v1794332982/WhatsApp_Image_2026-11-10_at_12.46.42_PM_1_u8i8wl.jpg", hour: 1, width: "33%" },
  { src: "https://res.cloudinary.com/dixyebg5i/image/upload/v1794332982/WhatsApp_Image_2026-11-10_at_12.46.41_PM_2_rdbatz.jpg ", hour: 2, width: "31%" },
  { src: "https://res.cloudinary.com/dixyebg5i/image/upload/v1794332982/WhatsApp_Image_2026-11-10_at_12.46.42_PM_2_syfvpb.jpg", hour: 3, width: "30%" },
  { src: "https://res.cloudinary.com/dixyebg5i/image/upload/v1794332983/WhatsApp_Image_2026-11-10_at_12.46.42_PM_ekqpux.jpg", hour: 4, width: "34%" },
  { src: "https://res.cloudinary.com/dixyebg5i/image/upload/v1794332983/WhatsApp_Image_2026-11-10_at_12.46.42_PM_6_cvwjgp.jpg", hour: 5, width: "30%" },
  { src: "https://res.cloudinary.com/dixyebg5i/image/upload/v1794332982/WhatsApp_Image_2026-11-10_at_12.46.42_PM_3_nmoybe.jpg", hour: 6, width: "29%" },
  { src: "https://res.cloudinary.com/dixyebg5i/image/upload/v1794332983/WhatsApp_Image_2026-11-10_at_12.46.42_PM_5_dmhu75.jpg", hour: 7, width: "31%" },
  { src: "https://res.cloudinary.com/dixyebg5i/image/upload/v1794332983/WhatsApp_Image_2026-11-10_at_12.46.43_PM_1_gcwozj.jpg", hour: 8, width: "28%" },
  { src: "https://res.cloudinary.com/dixyebg5i/image/upload/v1794332984/WhatsApp_Image_2026-11-10_at_12.46.43_PM_2_ichhvr.jpg", hour: 9, width: "30%" },
  { src: "https://res.cloudinary.com/dixyebg5i/image/upload/v1794332985/WhatsApp_Image_2026-11-10_at_12.46.43_PM_swhpvb.jpg", hour: 10, width: "29%" },
  { src: "https://res.cloudinary.com/dixyebg5i/image/upload/v1794332982/WhatsApp_Image_2026-11-10_at_12.46.42_PM_4_jm2dvu.jpg", hour: 11, width: "32%" },
];

function RecuerdosSection() {
  const sectionRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frameId = null;
    let lastRotation = null;

    const updateRotation = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / (rect.height + windowHeight * 0.6))
      );

      const nextRotation = progress * 180;

      if (lastRotation === null || Math.abs(nextRotation - lastRotation) > 0.15) {
        lastRotation = nextRotation;
        setRotation(nextRotation);
      }
    };

    const handleScroll = () => {
      if (frameId !== null) return;

      frameId = requestAnimationFrame(() => {
        frameId = null;
        updateRotation();
      });
    };

    updateRotation();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
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
