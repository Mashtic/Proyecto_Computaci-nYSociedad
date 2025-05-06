import React, { useEffect, useState } from 'react';
import { getUser } from '../services/dbUserService';
import { UserProfile, Emprendimiento } from '../types/profileTypes';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/UserProfile.css';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [emprendimiento, setEmprendimiento] = useState<Emprendimiento | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apellido, setApellido] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    

    if (!currentUser) {
      navigate('/InicioSesion');
      return;
    }

    const fetchUserData = async () => {
      try {
        const userData = await getUser(currentUser.uid);
        if (userData) {
          setUser(userData.user);
          console.log(userData);
          setApellido(userData.user.apellidos || 'Sin apellidos');
          setEmprendimiento(userData.emprendimiento);
        }
      } catch (err) {
        setError('Error al cargar la información del usuario.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) return <p>Cargando perfil...</p>;
  if (error) return <p>{error}</p>;
  if (!user || !emprendimiento) return <p>No se encontró al usuario o emprendimiento.</p>;

  return (
    <div className="profile-container">
      <h1 className="profile-title">Mi cuenta</h1>

      {/* Sección de usuario */}
      <div className="profile-user-info">
        <div className="profile-photo">
          {user.fotoPerfil ? (
            <img src={user.fotoPerfil} alt="Foto de perfil" className="profile-img" />
          ) : (
            <div className="profile-img-placeholder">Sin foto</div>
          )}
        </div>
        <div className="profile-details">
          <ProfileField label="Nombre" value={user.nombre} />
          <ProfileField label="Apellidos" value={apellido} />
          <ProfileField label="Departamento" value={user.departamento} />
          <ProfileField label="Correo Electrónico" value={user.email} />
          <ProfileField label="Cédula" value={user.cedula} />
          <PasswordField />
          <button className="change-photo-btn">Cambiar foto de perfil</button>
        </div>
      </div>

      <hr className="divider" />

      {/* Sección de emprendimiento */}
      <div>
        <h2 className="emprendimiento-title">Emprendimiento</h2>
        <div className="emprendimiento-details">
          <ProfileField label="Nombre" value={emprendimiento.nombre || 'N/A'} />
          <ProfileField label="Descripción" value={emprendimiento.descripcion || 'N/A'} />
          <ProfileField label="Categoría" value={emprendimiento.categoria || 'N/A'} />
          <ProfileField label="Fecha de creación" value={emprendimiento.fechaCreacion || 'N/A'} />
        </div>
      </div>
    </div>
  );
};

const ProfileField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="profile-field">
    <p className="field-label">{label}</p>
    <p className="field-value">{value}</p>
  </div>
);

const PasswordField: React.FC = () => (
  <div className="profile-field">
    <p className="field-label">Contraseña</p>
    <div className="password-wrapper">
      <span className="field-value">***********</span>
      <button className="change-password-btn">Cambiar</button>
    </div>
  </div>
);

export default ProfilePage;
