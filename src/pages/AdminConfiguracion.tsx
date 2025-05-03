// AdminConfiguracion.tsx
import React from "react";
import styles from "../styles/Admin2.module.css";

const AdminConfiguracion: React.FC = () => {
  return (
    <main className={styles.main}>
      <section className={styles.container}>
        <h2 className={styles.title}>Configuración del sistema</h2>

        <div className={styles.grid}>
          <label>
            Cantidad máxima de postulaciones simultáneas:
            <input type="number" defaultValue={4} />
          </label>
          <label>
            Tiempo para rechazo automático de solicitudes:
            <input type="number" defaultValue={4} />
          </label>
        </div>

        <h3>Configuración de privacidad</h3>
        <div className={styles.grid}>
          <label>
            ¿Quién puede ver los postulantes a un espacio?
            <div className={styles.radios}>
              <label><input type="radio" name="verEspacio" /> Sí</label>
              <label><input type="radio" name="verEspacio" defaultChecked /> No</label>
            </div>
          </label>
          <label>
            ¿Quién puede ver los postulantes a una feria?
            <div className={styles.radios}>
              <label><input type="radio" name="verFeria" /> Sí</label>
              <label><input type="radio" name="verFeria" defaultChecked /> No</label>
            </div>
          </label>
          <label>
            ¿Se permiten mensajes a los administradores?
            <div className={styles.radios}>
              <label><input type="radio" name="mensajes" /> Sí</label>
              <label><input type="radio" name="mensajes" defaultChecked /> No</label>
            </div>
          </label>
        </div>

        <h3>Configuración de seguridad</h3>
        <div className={styles.grid}>
          <label>
            Tiempo mínimo entre cambio de información personal:
            <input type="text" defaultValue="7 días" />
          </label>
          <label>
            Tiempo mínimo entre cambio de correo electrónico:
            <input type="text" defaultValue="7 días" />
          </label>
        </div>

        <h4>Políticas de contraseña</h4>
        <label>
          ¿El usuario puede reiniciar su contraseña?
          <div className={styles.radios}>
            <label><input type="radio" name="reset" defaultChecked /> Sí</label>
            <label><input type="radio" name="reset" /> No</label>
          </div>
        </label>

        <label>
          Restricciones para crear contraseñas:
          <div className={styles.grid}>
            <input type="text" placeholder="3 dígitos" />
            <input type="text" placeholder="3 letras" />
            <input type="text" placeholder="3 símbolos" />
          </div>
        </label>

        <button className={styles.nuevaRestriccion}>Agregar nueva restricción</button>
      </section>
    </main>
  );
};

export default AdminConfiguracion;
