import "./CalendarSection.css";

function CalendarSection() {
  return (
    <section className="calendar-section-card" aria-label="Guardar en calendario">
      <div className="calendar-section-eyebrow">No lo Olvides</div>
      <h2 className="calendar-section-title">Guárdalo</h2>
      <p className="calendar-section-copy">Agrega el evento a tu calendario</p>
      <a
        className="calendar-button"
        href="https://calendar.google.com/calendar/render?action=TEMPLATE&amp;text=Boda%20de%20Jeick%20%26%20Julieth&amp;dates=20261219T180000Z/20261220T073000Z&amp;details=Ceremonia%20Religiosa%3A%2012%3A00%20pm%20%7C%20Recepci%C3%B3n%20en%20Parque%20Caldas%2C%20Popay%C3%A1n%20%E2%80%94%20Cauca%2C%20Colombia&amp;location=Popay%C3%A1n%2C%20Cauca%2C%20Colombia"
        target="_blank"
        rel="noopener noreferrer"
      >
        Añadir a Google Calendar
      </a>
    </section>
  );
}

export default CalendarSection;
