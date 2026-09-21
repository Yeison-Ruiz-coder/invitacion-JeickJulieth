import "./CalendarSection.css";

function CalendarSection() {
  return (
    <section className="calendar-section-card" aria-label="Guardar en calendario">
      <div className="calendar-section-eyebrow">No lo Olvides</div>
      <h2 className="calendar-section-title">Guárdalo</h2>
      <p className="calendar-section-copy">Agrega el evento a tu calendario</p>
      <a
        className="calendar-button"
        href="https://calendar.google.com/calendar/render?action=TEMPLATE&amp;text=Boda%20de%20Jeick%20%26%20Fernanda&amp;dates=20261226T180000Z/20261227T073000Z&amp;details=Ceremonia%20y%20Celebraci%C3%B3n%20en%20Club%20Campestre%20Mar%20y%20Cielo%2C%20Santander%20de%20Quilichao%2C%20Cauca%2C%20Colombia&amp;location=Club%20Campestre%20Mar%20y%20Cielo%2C%20Santander%20de%20Quilichao%2C%20Cauca%2C%20Colombia"
        target="_blank"
        rel="noopener noreferrer"
      >
        Añadir a Google Calendar
      </a>
    </section>
  );
}

export default CalendarSection;
