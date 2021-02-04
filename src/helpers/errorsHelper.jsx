import Swal from "sweetalert2";


export const errorsHelper = (e) => {

    e.code === "auth/user-not-found"
        && Swal.fire('Error', 'No hay ningún registro de usuario que corresponda a este identificador. El usuario puede haber sido eliminado', 'error');
    e.code === 'auth/wrong-password'
        && Swal.fire('Error', 'La contraseña no es válida o el usuario no tiene contraseña', 'error')
    e.code === 'auth/invalid-email'
        && Swal.fire('Alerta', 'La dirección de correo electrónico está mal formateada', 'warning')
    e.code === 'auth/too-many-requests'
        && Swal.fire('Advertencia', 'El acceso a esta cuenta se ha desactivado temporalmente debido a muchos intentos fallidos de inicio de sesión. Puede restaurarla inmediatamente restableciendo su contraseña o puede intentarlo de nuevo más tarde', 'error')


}