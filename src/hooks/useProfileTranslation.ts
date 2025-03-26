
export type ProfileContent = {
  title: string;
  personalInfo: string;
  accountSettings: string;
  addresses: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  address: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  password: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  saveChanges: string;
  saving: string;
  savedSuccess: string;
  errorRequired: string;
  errorEmail: string;
  errorPhone: string;
  errorPassword: string;
  errorPasswordMatch: string;
};

const useProfileTranslation = (language: string): ProfileContent => {
  switch(language) {
    case 'pt':
      return {
        title: "Perfil do Usuário",
        personalInfo: "Informações Pessoais",
        accountSettings: "Configurações da Conta",
        addresses: "Endereços",
        name: "Nome",
        email: "Email",
        phone: "Telefone",
        bio: "Biografia",
        address: "Endereço",
        street: "Rua",
        city: "Cidade",
        state: "Estado",
        postalCode: "CEP",
        country: "País",
        password: "Senha",
        currentPassword: "Senha Atual",
        newPassword: "Nova Senha",
        confirmPassword: "Confirmar Senha",
        saveChanges: "Salvar Alterações",
        saving: "Salvando...",
        savedSuccess: "Alterações salvas com sucesso!",
        errorRequired: "Este campo é obrigatório",
        errorEmail: "Por favor insira um email válido",
        errorPhone: "Por favor insira um telefone válido",
        errorPassword: "A senha deve ter pelo menos 6 caracteres",
        errorPasswordMatch: "As senhas não coincidem"
      };
    case 'es':
      return {
        title: "Perfil de Usuario",
        personalInfo: "Información Personal",
        accountSettings: "Configuración de la Cuenta",
        addresses: "Direcciones",
        name: "Nombre",
        email: "Correo electrónico",
        phone: "Teléfono",
        bio: "Biografía",
        address: "Dirección",
        street: "Calle",
        city: "Ciudad",
        state: "Estado",
        postalCode: "Código Postal",
        country: "País",
        password: "Contraseña",
        currentPassword: "Contraseña Actual",
        newPassword: "Nueva Contraseña",
        confirmPassword: "Confirmar Contraseña",
        saveChanges: "Guardar Cambios",
        saving: "Guardando...",
        savedSuccess: "¡Cambios guardados con éxito!",
        errorRequired: "Este campo es obligatorio",
        errorEmail: "Por favor ingresa un correo electrónico válido",
        errorPhone: "Por favor ingresa un teléfono válido",
        errorPassword: "La contraseña debe tener al menos 6 caracteres",
        errorPasswordMatch: "Las contraseñas no coinciden"
      };
    default: // 'en'
      return {
        title: "User Profile",
        personalInfo: "Personal Information",
        accountSettings: "Account Settings",
        addresses: "Addresses",
        name: "Name",
        email: "Email",
        phone: "Phone",
        bio: "Bio",
        address: "Address",
        street: "Street",
        city: "City",
        state: "State",
        postalCode: "Postal Code",
        country: "Country",
        password: "Password",
        currentPassword: "Current Password",
        newPassword: "New Password",
        confirmPassword: "Confirm Password",
        saveChanges: "Save Changes",
        saving: "Saving...",
        savedSuccess: "Changes saved successfully!",
        errorRequired: "This field is required",
        errorEmail: "Please enter a valid email",
        errorPhone: "Please enter a valid phone number",
        errorPassword: "Password must be at least 6 characters",
        errorPasswordMatch: "Passwords don't match"
      };
  }
};

export default useProfileTranslation;
