import { useState } from 'react';
import axios from "axios";
import "../styles/Login.css"
import Person from "../icons/Person";
import Luck from "../icons/Luck";
import Visibility from "../icons/Visibility";

// Estados para almacenar el nombre de usuario, la contraseña, mensajes de error y éxito
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

// Función que maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

// Enviar la solicitud POST al backend con las credenciales ingresadas
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password
      });

      if (response.data.success) {

        setSuccess("Inicio de sesión exitoso");
      }
  // Captura los errores y muestra un mensaje en caso de credenciales incorrectas o error en el servidor
    } catch (err) {
      console.error("Error en la petición:", err);
      setError("Credenciales incorrectas o error en el servidor");
    }

  };

  return (
    <>
      <div className="container">
        <div className="title">
          <h2>Bienvenidos(a)</h2>
        </div>
        <div className='set-error'>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </div>
        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <label htmlFor="username">Usuario:</label>
            <div className="input-wrapper">
              <Person />
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña:</label>
            <div className="input-wrapper">
              <Luck />
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Visibility />
            </div>
          </div>
          <div className="input-check">
            <div className="check">
              <input type="checkbox" id="remember" name="remember" />
              <p>Recordar</p>
            </div>
            <a href="#">
              <h4>¿Olvido la Contraseña?</h4>
            </a>
          </div>
          <div className="input-btn">
            <button type="submit" className="btn">Ingresar</button>
          </div>
          <div className="social">
            <p className="author">Image by <a href="https://pixabay.com/users/vimbroisi-16343850/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5541099">Vinicius Imbroisi</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5541099">Pixabay</a></p>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
