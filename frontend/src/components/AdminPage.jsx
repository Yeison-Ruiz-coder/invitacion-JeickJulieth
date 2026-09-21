import { useEffect, useState } from "react";
import "./AdminPage.css";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

function AdminPage() {
  const [session, setSession] = useState(null);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [responses, setResponses] = useState([]);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCredentialChange = (event) => {
    const { name, value } = event.target;
    setCredentials((current) => ({ ...current, [name]: value }));
  };

  const loadResponses = async (accessToken) => {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/rsvp_responses?select=id,nombre,cedula,celular,respuesta,creado_en&order=creado_en.desc`,
      {
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || errorData.hint || `No se pudieron cargar las respuestas (${response.status})`);
    }
    setResponses(await response.json());
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setStatus("");
    setIsLoading(true);

    try {
      const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
        method: "POST",
        headers: {
          apikey: supabaseAnonKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
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

  const attending = responses.filter((item) => item.respuesta === "asistira").length;
  const notAttending = responses.filter((item) => item.respuesta === "no_asistira").length;

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
          <div><strong>{attending}</strong><span>Asistirán</span></div>
          <div><strong>{notAttending}</strong><span>No asistirán</span></div>
          <div><strong>{responses.length}</strong><span>Total respuestas</span></div>
        </div>
        <div className="admin-table-wrap">
          <table>
            <thead><tr><th>Nombre</th><th>Cédula</th><th>Celular</th><th>Respuesta</th><th>Fecha</th></tr></thead>
            <tbody>
              {responses.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td><td>{item.cedula}</td><td>{item.celular}</td>
                  <td><span className={`admin-response ${item.respuesta}`}>{item.respuesta === "asistira" ? "Asistirá" : "No asistirá"}</span></td>
                  <td>{new Date(item.creado_en).toLocaleDateString("es-CO")}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!responses.length && <p className="admin-empty">Todavía no hay respuestas registradas.</p>}
        </div>
        {status && <p className="admin-status">{status}</p>}
      </section>
    </main>
  );
}

export default AdminPage;
