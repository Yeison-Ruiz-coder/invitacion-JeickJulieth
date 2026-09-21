import { useState } from "react";
import "./RsvpSection.css";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const rsvpDeadline = new Date("2026-12-11T23:59:59-05:00");
const responseLockKey = "jeick-fernanda-rsvp-enviado";

function RsvpSection() {
  const isDeadlinePassed = Date.now() > rsvpDeadline.getTime();
  const [hasSubmitted, setHasSubmitted] = useState(
    () => localStorage.getItem(responseLockKey) === "true"
  );
  const [respuesta, setRespuesta] = useState(null);
  const [form, setForm] = useState({ nombre: "", cedula: "", celular: "" });
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleChoice = (choice) => {
    if (hasSubmitted || isDeadlinePassed) return;

    setRespuesta(choice);
    setStatus("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const sanitizedValue = name === "cedula" || name === "celular"
      ? value.replace(/\D/g, "")
      : value;

    setForm((current) => ({ ...current, [name]: sanitizedValue }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (hasSubmitted || isDeadlinePassed) return;

    setStatus("");

    if (!supabaseUrl || !supabaseAnonKey) {
      setStatus("La confirmación aún no está conectada.");
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/rsvp_responses`, {
        method: "POST",
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          nombre: form.nombre.trim(),
          cedula: form.cedula.trim(),
          celular: form.celular.trim(),
          respuesta,
        }),
      });

      if (!response.ok) {
        throw new Error("No se pudo guardar la respuesta");
      }

      setStatus("Gracias, tu respuesta fue registrada.");
      setForm({ nombre: "", cedula: "", celular: "" });
      localStorage.setItem(responseLockKey, "true");
      setHasSubmitted(true);
    } catch {
      setStatus("No pudimos guardar tu respuesta. Intenta nuevamente.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="rv" id="srsvp">
      <div className="eyebrow">Confirma tu Asistencia</div>
      <h2 className="sec-title">R.S.V.P.</h2>
      <div className="rsvp-card" id="rsvp-card">
        {isDeadlinePassed ? (
          <p className="rsvp-status" role="status">
            El plazo para confirmar asistencia ya terminó.
          </p>
        ) : hasSubmitted ? (
          <p className="rsvp-status" role="status">
            Tu respuesta ya fue registrada desde este dispositivo.
          </p>
        ) : (
          <div className="rsvp-choice-grid">
          <button
            className={`rsvp-confirm-btn${respuesta === "asistira" ? " is-selected" : ""}`}
            type="button"
            onClick={() => handleChoice("asistira")}
            aria-pressed={respuesta === "asistira"}
          >
            Confirmar
          </button>
          <button
            type="button"
            className={`btn-decline${respuesta === "no_asistira" ? " is-selected" : ""}`}
            onClick={() => handleChoice("no_asistira")}
            aria-pressed={respuesta === "no_asistira"}
          >
            No podré asistir
          </button>
          </div>
        )}

        {respuesta && !isDeadlinePassed && !hasSubmitted && (
          <form className="rsvp-form" onSubmit={handleSubmit}>
            <p className="rsvp-form-title">
              {respuesta === "asistira" ? "¡Nos encantará contar contigo!" : "Lamentamos que no puedas acompañarnos."}
            </p>
            <label className="rsvp-label" htmlFor="rsvp-nombre">Nombre completo</label>
            <input
              id="rsvp-nombre"
              name="nombre"
              type="text"
              value={form.nombre}
              onChange={handleChange}
              required
              maxLength={120}
              autoComplete="name"
            />
            <label className="rsvp-label" htmlFor="rsvp-cedula">Cédula</label>
            <input
              id="rsvp-cedula"
              name="cedula"
              type="text"
              value={form.cedula}
              onChange={handleChange}
              required
              maxLength={30}
              inputMode="numeric"
              pattern="[0-9]+"
            />
            <label className="rsvp-label" htmlFor="rsvp-celular">Celular</label>
            <input
              id="rsvp-celular"
              name="celular"
              type="tel"
              value={form.celular}
              onChange={handleChange}
              required
              maxLength={30}
              inputMode="numeric"
              pattern="[0-9]+"
              autoComplete="tel"
            />
            <button className="rsvp-submit-btn" type="submit" disabled={isSending}>
              {isSending ? "Guardando..." : "Enviar respuesta"}
            </button>
          </form>
        )}

        {status && <p className="rsvp-status" role="status">{status}</p>}
        <p className="rsvp-deadline">Fecha límite: 11 de diciembre de 2026</p>
      </div>
    </section>
  );
}

export default RsvpSection;
