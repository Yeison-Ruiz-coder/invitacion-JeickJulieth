import { useState } from "react";
import "./RsvpSection.css";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const rsvpDeadline = new Date("2026-12-11T23:59:59-05:00");

function RsvpSection() {
  const isDeadlinePassed = Date.now() > rsvpDeadline.getTime();
  const [respuesta, setRespuesta] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    cedula: "",
    celular: "",
    modalidad: "solo",
    pareja: "",
    hijos: [],
  });
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

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

  const handleChildChange = (index, value) => {
    setForm((current) => ({
      ...current,
      hijos: current.hijos.map((child, childIndex) => childIndex === index ? value : child),
    }));
  };

  const addChild = () => {
    setForm((current) => ({ ...current, hijos: [...current.hijos, ""] }));
  };

  const removeChild = (index) => {
    setForm((current) => ({
      ...current,
      hijos: current.hijos.filter((_, childIndex) => childIndex !== index),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (hasSubmitted || isDeadlinePassed) return;

    setStatus("");

    if (!supabaseUrl || !supabaseAnonKey) {
      setStatus("La confirmación aún no está conectada.");
      return;
    }

    const acompanantes = respuesta === "asistira" && form.modalidad === "familia"
      ? [
          ...(form.pareja.trim() ? [{ tipo: "pareja", nombre: form.pareja.trim() }] : []),
          ...form.hijos
            .map((nombre) => nombre.trim())
            .filter(Boolean)
            .map((nombre) => ({ tipo: "hijo", nombre })),
        ]
      : [];

    if (respuesta === "asistira" && form.modalidad === "familia" && !acompanantes.length) {
      setStatus("Agrega el nombre de tu pareja o de al menos un hijo/a.");
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
          acompanantes,
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        if (error.code === "23505") {
          setStatus("Ya existe una respuesta registrada con esa cédula. Si necesitas corregirla, comunícate con los novios.");
          return;
        }
        throw new Error(error.message || "No se pudo guardar la respuesta");
      }

      setStatus("Gracias, tu respuesta fue registrada.");
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
            Tu respuesta ya fue registrada.
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
            {respuesta === "asistira" && (
              <>
                <fieldset className="rsvp-attendance-group">
                  <legend className="rsvp-label">¿Cómo asistirás?</legend>
                  <label className="rsvp-option">
                    <input
                      type="radio"
                      name="modalidad"
                      value="solo"
                      checked={form.modalidad === "solo"}
                      onChange={handleChange}
                    />
                    Asistiré solo/a
                  </label>
                  <label className="rsvp-option">
                    <input
                      type="radio"
                      name="modalidad"
                      value="familia"
                      checked={form.modalidad === "familia"}
                      onChange={handleChange}
                    />
                    Asistiré con mi familia
                  </label>
                </fieldset>
                {form.modalidad === "familia" && (
                  <div className="rsvp-family-fields">
                    <label className="rsvp-label" htmlFor="rsvp-pareja">
                      Nombre de tu pareja (opcional)
                    </label>
                    <input
                      id="rsvp-pareja"
                      name="pareja"
                      type="text"
                      value={form.pareja}
                      onChange={handleChange}
                      maxLength={120}
                      autoComplete="off"
                    />
                    <div className="rsvp-children-heading">
                      <span className="rsvp-label">Nombres de tus hijos (opcional)</span>
                      <button className="rsvp-add-child" type="button" onClick={addChild}>
                        Agregar hijo/a
                      </button>
                    </div>
                    {form.hijos.map((nombre, index) => (
                      <div className="rsvp-child-row" key={`hijo-${index}`}>
                        <input
                          aria-label={`Nombre del hijo o hija ${index + 1}`}
                          type="text"
                          value={nombre}
                          onChange={(event) => handleChildChange(index, event.target.value)}
                          maxLength={120}
                          autoComplete="off"
                        />
                        <button
                          className="rsvp-remove-child"
                          type="button"
                          onClick={() => removeChild(index)}
                          aria-label={`Quitar hijo o hija ${index + 1}`}
                        >
                          Quitar
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
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
