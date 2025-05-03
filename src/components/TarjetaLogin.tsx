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
                    
                    {/* El css no va, tuve que forzar el estilo */}
                    {error && (
                        <div className="MensajeError" style={{
                            color: '#d32f2f',
                            backgroundColor: '#fde7e7',
                            padding: '12px',
                            borderRadius: '4px',
                            margin: '0 0 16px 0',
                            border: '1px solid #ef9a9a',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            {/* Icono de error */}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 17C11.45 17 11 16.55 11 16C11 15.45 11.45 15 12 15C12.55 15 13 15.45 13 16C13 16.55 12.55 17 12 17ZM13 13H11V7H13V13Z" fill="#d32f2f"/>
                            </svg>
                            <span style={{ color: 'inherit' }}>{error}</span>
                        </div>
                        )}

                    
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