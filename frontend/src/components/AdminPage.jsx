import { useEffect, useState } from "react";
import "./AdminPage.css";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

async function readResponseBody(response) {
  const body = await response.text();

  if (!body) return {};

  try {
    return JSON.parse(body);
  } catch {
    return { message: body };
  }
}

function AdminPage() {
  const [session, setSession] = useState(null);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [responses, setResponses] = useState([]);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseFilter, setResponseFilter] = useState(null);

  const handleCredentialChange = (event) => {
    const { name, value } = event.target;
    setCredentials((current) => ({ ...current, [name]: value }));
  };

  const loadResponses = async (accessToken) => {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/rsvp_responses?select=id,nombre,cedula,celular,respuesta,acompanantes,creado_en&order=creado_en.desc`,
      {
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await readResponseBody(response);
      throw new Error(errorData.message || errorData.hint || `No se pudieron cargar las respuestas (${response.status})`);
    }
    const data = await readResponseBody(response);
    setResponses(Array.isArray(data) ? data : []);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setStatus("");
    setIsLoading(true);

    try {
      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error("Faltan las variables de Supabase en Vercel. Configura VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.");
      }

      const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
        method: "POST",
        headers: {
          apikey: supabaseAnonKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await readResponseBody(response);
      if (!response.ok) {
        const errorMessage = data.error_description || data.msg || data.message || "Correo o contraseña incorrectos";
        throw new Error(errorMessage);
      }

      setSession(data);
      await loadResponses(data.access_token);
    } catch (error) {
      setStatus(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setSession(null);
    setResponses([]);
    setCredentials({ email: "", password: "" });
  };

  const handleRefresh = async () => {
    setStatus("");
    setIsLoading(true);

    try {
      await loadResponses(session.access_token);
    } catch {
      setStatus("No se pudieron actualizar las respuestas.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!supabaseUrl || !supabaseAnonKey) {
      setStatus("Faltan las variables de Supabase en el archivo .env");
    }
  }, []);

  if (!session) {
    return (
      <main className="admin-page">
        <section className="admin-login">
          <p className="admin-kicker">Jeick &amp; Fernanda</p>
          <h1>Respuestas RSVP</h1>
          <p className="admin-copy">Ingresa para consultar las confirmaciones.</p>
          <form onSubmit={handleLogin}>
            <label htmlFor="admin-email">Correo</label>
            <input id="admin-email" name="email" type="email" value={credentials.email} onChange={handleCredentialChange} required autoComplete="email" />
            <label htmlFor="admin-password">Contraseña</label>
            <input id="admin-password" name="password" type="password" value={credentials.password} onChange={handleCredentialChange} required autoComplete="current-password" />
            <button type="submit" disabled={isLoading}>{isLoading ? "Ingresando..." : "Ingresar"}</button>
          </form>
          <button type="button" className="admin-back" onClick={() => { window.location.href = "/"; }}>
            Volver a la invitación
          </button>
          {status && <p className="admin-status">{status}</p>}
        </section>
      </main>
    );
  }

  const attending = responses
    .filter((item) => item.respuesta === "asistira")
    .reduce((total, item) => total + 1 + (item.acompanantes?.length || 0), 0);
  const notAttending = responses.filter((item) => item.respuesta === "no_asistira").length;
  const filteredResponses = responseFilter
    ? responses.filter((item) => item.respuesta === responseFilter)
    : responses;

  return (
    <main className="admin-page">
      <section className="admin-dashboard">
        <header className="admin-header">
          <div>
            <p className="admin-kicker">Panel privado</p>
            <h1>Confirmaciones</h1>
          </div>
          <div className="admin-actions">
            <button type="button" className="admin-refresh" onClick={handleRefresh} disabled={isLoading}>
              {isLoading ? "Actualizando..." : "Actualizar"}
            </button>
            <button type="button" className="admin-logout" onClick={handleLogout}>Cerrar sesión</button>
          </div>
        </header>
        <div className="admin-stats">
          <div><strong>{attending}</strong><span>Personas que asistirán</span></div>
          <div><strong>{notAttending}</strong><span>No asistirán</span></div>
          <div><strong>{responses.length}</strong><span>Total respuestas</span></div>
        </div>
        <section className="admin-responses" aria-label="Listado de respuestas">
          <div className="admin-responses-heading">
            <div>
              <p className="admin-kicker">Lista general</p>
              <h2>Respuestas registradas</h2>
            </div>
            <span className="admin-results-count">
              {filteredResponses.length} {filteredResponses.length === 1 ? "respuesta" : "respuestas"}
            </span>
          </div>
          <div className="admin-filters" aria-label="Filtrar respuestas">
            <button
              type="button"
              className={`admin-filter-attending${responseFilter === "asistira" ? " is-active" : ""}`}
              onClick={() => setResponseFilter((current) => current === "asistira" ? null : "asistira")}
              aria-pressed={responseFilter === "asistira"}
            >
              Asistirán
            </button>
            <button
              type="button"
              className={`admin-filter-declined${responseFilter === "no_asistira" ? " is-active" : ""}`}
              onClick={() => setResponseFilter((current) => current === "no_asistira" ? null : "no_asistira")}
              aria-pressed={responseFilter === "no_asistira"}
            >
              No asistirán
            </button>
          </div>
          <div className="admin-table-wrap">
          <table>
            <thead><tr><th>Nombre</th><th>Cédula</th><th>Celular</th><th>Acompañantes</th><th>Respuesta</th><th>Fecha</th></tr></thead>
            <tbody>
              {filteredResponses.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td><td>{item.cedula}</td><td>{item.celular}</td>
                  <td>
                    {item.acompanantes?.length ? (
                      <div className="admin-companions">
                        {item.acompanantes.map((acompanante, index) => (
                          <div className="admin-companion" key={`${acompanante.tipo}-${index}`}>
                            <span className={`admin-companion-type${acompanante.tipo === "pareja" ? " is-partner" : ""}`}>
                              {acompanante.tipo === "pareja" ? "Pareja" : "Hijo/a"}
                            </span>
                            <span className="admin-companion-name">{acompanante.nombre}</span>
                            {acompanante.tipo === "pareja" && (
                              <span className="admin-companion-details">
                                {[acompanante.cedula && `Cédula: ${acompanante.cedula}`, acompanante.celular && `Celular: ${acompanante.celular}`]
                                  .filter(Boolean)
                                  .join(" · ")}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="admin-no-companions">Sin acompañantes</span>
                    )}
                  </td>
                  <td><span className={`admin-response ${item.respuesta}`}>{item.respuesta === "asistira" ? "Asistirá" : "No asistirá"}</span></td>
                  <td>{new Date(item.creado_en).toLocaleDateString("es-CO")}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!filteredResponses.length && (
            <p className="admin-empty">
              {responses.length
                ? "No hay respuestas para este filtro."
                : "Todavía no hay respuestas registradas."}
            </p>
          )}
          </div>
        </section>
        {status && <p className="admin-status">{status}</p>}
      </section>
    </main>
  );
}

export default AdminPage;
