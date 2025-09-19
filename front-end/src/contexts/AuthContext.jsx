import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [id, setId] = useState(null);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true); // empieza en true mientras cargamos sesión
  const navigate = useNavigate();

  // Cargar sesión desde localStorage al iniciar
  useEffect(() => {
    const storedId = Number(localStorage.getItem("id"));
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");


    if (storedId && storedToken && storedUsername && storedName && storedEmail) {
      setId(storedId);
      setToken(storedToken);
      setUsername(storedUsername);
      setName(storedName);
      setEmail(storedEmail);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/auth/login", credentials);
      const datos = res.data;
      
      // Guardar en localStorage primero usando los datos recibidos directamente
      localStorage.setItem("id", String(datos.id));
      localStorage.setItem("token", datos.token);
      localStorage.setItem("username", datos.username);
      localStorage.setItem("name", datos.name);
      localStorage.setItem("email", datos.email);
      
      // Luego actualizar el estado
      setId(datos.id);
      setToken(datos.token);
      setUsername(datos.username);
      setName(datos.name);
      setEmail(datos.email);
      
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setId(null);
    setToken(null);
    setUsername(null);
    setName(null);
    setEmail(null);
    
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    navigate("/login")
  };

  return (
    <AuthContext.Provider value={{ id, token, username, name, email ,loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
