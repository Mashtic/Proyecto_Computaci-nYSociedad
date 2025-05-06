import React from "react";
import "./CSS/TarjetaRegistroInicial.modulo.css";
import { useState } from "react";
import {useNavigate } from "react-router-dom";

const TarjetaRegistroInicial: React.FC = () => {
    const [sectorSeleccionado, setSectorSeleccionado] = useState("");
    const enlace = useNavigate();
    
    const BotonSiguiente = () => {
        enlace("/RegistroFinal")
    };

    return (
        <div className="contenedor">
        <div className="imagen">
            <img src="src/assets/campus2.png" alt="Campus TEC" />
        </div>

        <div className="formulario">
            <h3>Información Personal</h3>
                <div className="filaDoble">
                    <div className="campo">
                        <label>Nombre:</label>
                        <input type="text" />
                    </div>
                    <div className="campo">
                        <label>Apellidos:</label>
                        <input type="text" />
                    </div>
                </div>

            <div className="campo">
                <label>Cédula:</label>
                <input type="text" />
            </div>

            <div className="radiogrupo">
                <label>
                    <input type="radio" name="tipo" value="funcionario" /> Estudiante / Funcionario
                </label>
                <label>
                    <input type="radio" name="tipo" value="externo" /> Persona Externa
                </label>
            </div>

            <h3>Información de Negocio</h3>
            <div className="filaDoble">
                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" />
                </div>
                <div className="campo">
                    <label>Fecha de Creación:</label>
                    <input type="date" />
                </div>
            </div>

            <div className="campo">
                <label>Descripción:</label>
                <textarea rows={3}/>
            </div>

            <div className="campo">
                <label>Sector / Categoría</label>
                    <div className="radiogrupo">
                        <label>
                        <input
                            type="radio"
                            name="sector"
                            value="alimentacion"
                            onChange={(e) => setSectorSeleccionado(e.target.value)}
                        />
                        Alimentición
                        </label>
                        <label>
                        <input
                            type="radio"
                            name="sector"
                            value="moda"
                            onChange={(e) => setSectorSeleccionado(e.target.value)}
                        />
                        Moda
                        </label>
                        <label>
                        <input
                            type="radio"
                            name="sector"
                            value="sostenibilidad"
                            onChange={(e) => setSectorSeleccionado(e.target.value)}
                        />
                        Sostenibilidad
                        </label>
                        <label>
                        <input
                            type="radio"
                            name="sector"
                            value="otro"
                            onChange={(e) => setSectorSeleccionado(e.target.value)}
                        />
                        Otro:
                </label>
            </div>
        </div>

        {sectorSeleccionado === "otro" && (
            <div className="campo">
                <label>Otro:</label>
                <input type="text" />
            </div>
            )}

        <div className="botonDerecha">
            <button className="botonSiguiente" onClick={BotonSiguiente}>Siguiente</button>
            </div>
        </div>
    </div>
  );
};

export default TarjetaRegistroInicial;