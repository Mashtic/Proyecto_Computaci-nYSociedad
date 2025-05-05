export interface UserProfile {
    nombre: string;
    apellidos: string;
    departamento: string;
    email: string;
    cedula: string;
    fotoPerfil?: string;
  }
  
  export interface Emprendimiento {
    nombre: string;
    descripcion: string;
    categoria: string;
    fechaCreacion: string;
  }
  
  export interface ProfilePageProps {
    user: UserProfile;
    emprendimiento: Emprendimiento;
  }