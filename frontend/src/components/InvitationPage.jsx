import { useEffect, useState } from "react";
import "./InvitationPage.css";
import CountdownSection from "./CountdownSection";
import LocationSection from "./LocationSection";
import CalendarSection from "./CalendarSection";
import ItinerarySection from "./ItinerarySection";
import DressCodeSection from "./DressCodeSection";
import FamilySection from "./FamilySection";
import GiftSection from "./GiftSection";
import RecuerdosSection from "./RecuerdosSection";
import RsvpSection from "./RsvpSection";

const WEDDING_DATE = new Date("2026-12-26T12:00:00");

function SectionDivider() {
  return (
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
  );
}

function getTimeLeft() {
  const diff = WEDDING_DATE.getTime() - Date.now();

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

function FinalSignoff() {
  return (
    <footer className="final-signoff">
      <div className="fn">Jeick &amp; Fernanda</div>
      <div className="fd">26 · Diciembre · 2026 · Santander de Quilichao · Colombia</div>
      <div className="fc">
        Invitación creada por{" "}
        <a
          href="mailto:yeisonruiz119@hotmail.com"
          rel="noopener noreferrer"
        >
          yeisonruiz119@hotmail.com
        </a>
      </div>
    </footer>
  );
}

function InvitationPage() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="invitation-page">
      <div className="wrap">
        <section className="hero" aria-label="Encabezado principal">
          <div className="hero-bg" />
          <div className="hero-veil" />
          <div className="hero-bottom">
            <div className="hero-eyebrow" id="hEb">
              Sábado · 26 de Diciembre · 2026
            </div>
            <h1 className="hero-names" id="hNm">
              <span className="hero-name-line">Jeick</span>
              <span className="hero-amp">&amp;</span>
              <span className="hero-name-line">Fernanda</span>
            </h1>
            <div className="hero-badge" id="hBd">
              <span>Santander de Quilichao · Colombia</span>
            </div>
          </div>
        </section>

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

        <div className="fecha-sec rv">
          <div className="fecha-line">
          </div>
        </div>

        <CountdownSection timeLeft={timeLeft} />

        <SectionDivider />

        <LocationSection />

        <SectionDivider />

        <FamilySection />

        <SectionDivider />

        <CalendarSection />

        <SectionDivider />

        <ItinerarySection />

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

        <DressCodeSection />

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

        <GiftSection />

        <SectionDivider />

        <RecuerdosSection />

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

        <section className="rv" id="salbum">
          <div className="eyebrow">Comparte tus Momentos</div>
          <h2 className="sec-title">Álbum de Fotos</h2>
          <p className="album-sub">
            Escanea el código y sube tus fotos favoritas
            <br />
            de esta celebración especial
          </p>
          <div className="album-qr-wrap">
            <div className="album-qr-frame">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&amp;color=1E3A6E&amp;bgcolor=F0EDE6&amp;data=https://www.instagram.com/explore/tags/jeickyfernanda"
                alt="QR Álbum de fotos #jeickyfernanda"
                width="180"
                height="180"
                loading="lazy"
              />
            </div>
          </div>
          <div className="album-hashtag">#jeickyfernanda</div>
        </section>

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

        <RsvpSection />

        <FinalSignoff />
      </div>
    </main>
  );
}

export default InvitationPage;
