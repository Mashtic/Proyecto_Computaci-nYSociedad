import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/TarjetaRegistroInicial.modulo.css";

const TarjetaRegistroInicial: React.FC = () => {
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [cedula, setCedula] = useState("");
    const [tipo, setTipo] = useState("");
    const [nombreNegocio, setNombreNegocio] = useState("");
    const [fechaCreacion, setFechaCreacion] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [sectorSeleccionado, setSectorSeleccionado] = useState("");
    const [otroSector, setOtroSector] = useState("");

    const navigate = useNavigate();

    // Función que maneja el botón "Siguiente"
    const BotonSiguiente = () => {
        const datos = {
            nombre,
            apellidos,
            cedula,
            tipo,
            nombreNegocio,
            fechaCreacion,
            descripcion,
            sector: sectorSeleccionado === "otro" ? otroSector : sectorSeleccionado,
        };
        console.log("Datos a enviar:", datos);
        // Navegar a la siguiente página y pasar los datos
        navigate("/RegistroFinal", { state: datos });
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
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div className="campo">
                        <label>Apellidos:</label>
                        <input
                            type="text"
                            value={apellidos}
                            onChange={(e) => setApellidos(e.target.value)}
                        />
                    </div>
                </div>

                <div className="campo">
                    <label>Cédula:</label>
                    <input
                        type="text"
                        value={cedula}
                        onChange={(e) => setCedula(e.target.value)}
                    />
                </div>

                <div className="radiogrupo">
                    <label>
                        <input
                            type="radio"
                            name="tipo"
                            value="funcionario"
                            checked={tipo === "funcionario"}
                            onChange={(e) => setTipo(e.target.value)}
                        />
                        Estudiante / Funcionario
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="tipo"
                            value="externo"
                            checked={tipo === "externo"}
                            onChange={(e) => setTipo(e.target.value)}
                        />
                        Persona Externa
                    </label>
                </div>

                <h3>Información de Negocio</h3>
                <div className="filaDoble">
                    <div className="campo">
                        <label>Nombre:</label>
                        <input
                            type="text"
                            value={nombreNegocio}
                            onChange={(e) => setNombreNegocio(e.target.value)}
                        />
                    </div>
                    <div className="campo">
                        <label>Fecha de Creación:</label>
                        <input
                            type="date"
                            value={fechaCreacion}
                            onChange={(e) => setFechaCreacion(e.target.value)}
                        />
                    </div>
                </div>

                <div className="campo">
                    <label>Descripción:</label>
                    <textarea
                        rows={3}
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <label>Sector / Categoría</label>
                    <div className="radiogrupo">
                        <label>
                            <input
                                type="radio"
                                name="sector"
                                value="alimentacion"
                                checked={sectorSeleccionado === "alimentacion"}
                                onChange={(e) => setSectorSeleccionado(e.target.value)}
                            />
                            Alimentación
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="sector"
                                value="moda"
                                checked={sectorSeleccionado === "moda"}
                                onChange={(e) => setSectorSeleccionado(e.target.value)}
                            />
                            Moda
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="sector"
                                value="sostenibilidad"
                                checked={sectorSeleccionado === "sostenibilidad"}
                                onChange={(e) => setSectorSeleccionado(e.target.value)}
                            />
                            Sostenibilidad
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="sector"
                                value="otro"
                                checked={sectorSeleccionado === "otro"}
                                onChange={(e) => setSectorSeleccionado(e.target.value)}
                            />
                            Otro:
                        </label>
                    </div>
                </div>

                {sectorSeleccionado === "otro" && (
                    <div className="campo">
                        <label>Otro:</label>
                        <input
                            type="text"
                            value={otroSector}
                            onChange={(e) => setOtroSector(e.target.value)}
                        />
                    </div>
                )}

                <div className="botonDerecha">
                    <button className="botonSiguiente" onClick={BotonSiguiente}>
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TarjetaRegistroInicial;
