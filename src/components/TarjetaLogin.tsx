import React from "react";
import "./CSS/TarjetaLogin.modulo.css";
import { Form, useNavigate } from "react-router-dom";

const TarjetaLogin: React.FC = () => {
    const enlace = useNavigate();

    const BotonAtras = () => {
        enlace("/")
    };
    
    const BotonAceptar = () => {
        alert("Iniciando sesión...")
    };

    return (
        <div className="Contenedor">
            <div className="TarjetaLogin">
                
                <div className="SeccionImagen">
                    <img src="src/assets/campus.png" alt="Campus TEC" className="Imagen"/>
                </div>

                <div className="SeccionFormulario">
                    <h2>Inicio de Sesión</h2>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <label color="black">
                            Correo Electrónico:
                            <div className="GrupoInputs">
                                <div className="IconoFondo">
                                    <img src="src/assets/email_icono.png" className="Icono"/>
                                </div>
                                <input type = "email" content="ejemplo123@dominio.com" />
                            </div>
                        </label>

                        <label>
                            Constraseña:
                            <div className="GrupoInputs">
                                <div className="IconoFondo">
                                    <img src="src/assets/contraseña_icono.png" className="Icono"/>
                                </div>
                                
                                <input type = "password" content="********" />
                            </div>
                        </label>


                        <div className="Registro">
                            <p>¿No estas registrado? <a href="/RegistroInicial" >Registrate aquí</a></p>
                        </div>



                        <div className="Botones">
                            <button type="button" className="Atras" onClick={BotonAtras}>
                                Atrás
                            </button>
                            <button type="button" className="Aceptar" onClick={BotonAceptar}>
                                Aceptar
                            </button>
                        </div>


                    </form>
                </div>

            </div>
        </div>
    )
};

export default TarjetaLogin;