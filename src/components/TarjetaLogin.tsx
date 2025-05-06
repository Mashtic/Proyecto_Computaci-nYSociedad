import React, { useState } from "react";
import "./CSS/TarjetaLogin.modulo.css";
import { useNavigate } from "react-router-dom";
import { signIn } from "../services/authService";

const TarjetaLogin: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        
        // Validación básica
        if (!email || !password) {
            setError("Por favor completa todos los campos");
            return;
        }

        setLoading(true);

        try {
            await signIn(email, password);
            navigate("/"); // Redirige al home después de login exitoso
        } catch (error) {
            console.error("Error en login:", error);
            setError("Credenciales incorrectas. Por favor intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="Contenedor">
            <div className="TarjetaLogin">
                <div className="SeccionImagen">
                    <img src="src/assets/campus.png" alt="Campus TEC" className="Imagen"/>
                </div>

                <div className="SeccionFormulario">
                    <h2>Inicio de Sesión</h2>
                    
                    {error && <div className="MensajeError">{error}</div>}
                    
                    <form onSubmit={handleLogin}>
                        <label>
                            Correo Electrónico:
                            <div className="GrupoInputs">
                                <div className="IconoFondo">
                                    <img src="src/assets/email_icono.png" className="Icono"/>
                                </div>
                                <input 
                                    type="email" 
                                    placeholder="ejemplo123@dominio.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </label>

                        <label>
                            Contraseña:
                            <div className="GrupoInputs">
                                <div className="IconoFondo">
                                    <img src="src/assets/contraseña_icono.png" className="Icono"/>
                                </div>
                                <input 
                                    type="password" 
                                    placeholder="********"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                            </div>
                        </label>

                        <div className="Registro">
                            <p>¿No estás registrado? <a href="/RegistroInicial">Regístrate aquí</a></p>
                        </div>

                        <div className="Botones">
                            <button 
                                type="button" 
                                className="Atras" 
                                onClick={() => navigate("/")}
                                disabled={loading}
                            >
                                Atrás
                            </button>
                            <button 
                                type="submit" 
                                className="Aceptar"
                                disabled={loading}
                            >
                                {loading ? "Cargando..." : "Aceptar"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TarjetaLogin;