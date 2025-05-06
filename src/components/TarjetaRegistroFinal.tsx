import React, { useState } from "react";
import "./CSS/TarjetaLogin.modulo.css";
import { signUp } from "../services/authService";
import { Form, useLocation, useNavigate } from "react-router-dom";

const TarjetaLogin: React.FC = () => {
    const location = useLocation();
    const enlace = useNavigate();

    const datosRegistro = location.state;
    const [correo, setCorreo] = useState("");
    const [contraseña, setContraseña] = useState("");


    const BotonAtras = () => {
        enlace("/RegistroInicial")
    };
    
    const BotonAceptar = async () => {
        try {
            // Extraemos los datos del registro desde el estado
            const { nombre, apellidos, cedula, rol, nombreNegocio, fechaCreacion, descripcion, sector } = datosRegistro;
    
            // Preparamos los datos del usuario junto con los del negocio
            const userData = {
                email: correo,
                password: contraseña,
                nombre,
                apellidos,
                cedula,
                rol,
                nombreNegocio,
                fechaCreacion,
                descripcion,
                sector
            };

            console.log("Data: ", userData);
    
            // Llamamos a la función signUp para crear al usuario y almacenar sus datos
            const user = await signUp(userData);
    
            if (user) {
                // Si la creación es exitosa, mostramos un mensaje y redirigimos al inicio
                alert("Usuario Creado!");
                enlace("/"); // Redirige a la página de inicio
            }
        } catch (error) {
            // En caso de error, mostramos el mensaje de error
            alert("Error al crear el usuario: ");
        }
    };
    

    return (
        <div className="Contenedor">
            <div className="TarjetaLogin">
                
                <div className="SeccionImagen">
                    <img src="src/assets/campus.png" alt="Campus TEC" className="Imagen"/>
                </div>

                <div className="SeccionFormulario">
                    <h2 text-aling>Información de Inicio de Sesión</h2>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <label color="black">
                            Correo Electrónico:
                            <div className="GrupoInputs">
                                <div className="IconoFondo">
                                    <img src="src/assets/email_icono.png" className="Icono"/>
                                </div>
                                <input 
                                type = "email" 
                                value={correo} 
                                onChange={(e) => setCorreo(e.target.value)}
                                content="ejemplo123@dominio.com" />
                            </div>
                        </label>

                        <label>
                            Constraseña:
                            <div className="GrupoInputs">
                                <div className="IconoFondo">
                                    <img src="src/assets/contraseña_icono.png" className="Icono"/>
                                </div>
                                
                                <input 
                                type = "password" 
                                value={contraseña} // Vincula el estado
                                onChange={(e) => setContraseña(e.target.value)} // Actualiza el estado
                                placeholder="********"
                                />
                            </div>
                        </label>

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