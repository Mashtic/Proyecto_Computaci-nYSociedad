import React from 'react';
import { UserProfile, Emprendimiento } from '../types/profileTypes';

interface ProfilePageProps {
  user: UserProfile;
  emprendimiento: Emprendimiento;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, emprendimiento }) => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Mi cuenta</h1>

      {/* Sección de usuario */}
      <div className="flex flex-col lg:flex-row gap-10 mb-12">
        {/* Foto de perfil */}
        <div className="flex flex-col items-center lg:items-start">
          {user.fotoPerfil ? (
            <img
              src={user.fotoPerfil}
              alt="Foto de perfil"
              className="w-40 h-40 rounded-full object-cover mb-4"
            />
          ) : (
            <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center mb-4">
              <span className="text-gray-500">Sin foto</span>
            </div>
          )}
          <button className="text-blue-600 hover:underline">Cambiar foto de perfil</button>
        </div>

        {/* Datos personales */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
          <ProfileField label="Nombre" value={user.nombre} />
          <ProfileField label="Apellidos" value={user.apellidos} />
          <ProfileField label="Departamento" value={user.departamento} />
          <ProfileField label="Correo Electrónico" value={user.email} />
          <ProfileField label="Cédula" value={user.cedula} />
          <PasswordField />
        </div>
      </div>

      <hr className="my-8 border-gray-300" />

      {/* Sección de emprendimiento */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Emprendimiento</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
          <ProfileField label="Nombre" value={emprendimiento.nombre} />
          <ProfileField label="Descripción" value={emprendimiento.descripcion} />
          <ProfileField label="Categoría" value={emprendimiento.categoria} />
          <ProfileField label="Fecha de creación" value={emprendimiento.fechaCreacion} />
        </div>
      </div>
    </div>
  );
};

// Campo reutilizable
const ProfileField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <p className="text-sm font-medium text-gray-600">{label}</p>
    <p className="text-gray-900">{value}</p>
  </div>
);

// Campo de contraseña
const PasswordField: React.FC = () => (
  <div>
    <p className="text-sm font-medium text-gray-600">Contraseña</p>
    <div className="flex items-center">
      <span className="text-gray-900">***********</span>
      <button className="ml-3 text-blue-600 hover:underline text-sm">Cambiar</button>
    </div>
  </div>
);

export default ProfilePage;
