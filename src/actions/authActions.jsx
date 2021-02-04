import { types } from "../types/types";
import Swal from 'sweetalert2';
import { firebase, googleAuthProvider } from '../firebase/firebaseConfig';
import { finishLoading, startLoading } from "./uiActions";

export const startLoginEmailPassword = (email, password, verificar) => {
    return async (dispatch) => {
        dispatch(startLoading())

        try {
            const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
            if (user.emailVerified) {
                dispatch(loginAction(user.uid, user.displayName, user.emailVerified))
            }
            else {
                // dispatch(setError('Email no verificado'))
                Swal.fire('Aviso', 'Debe confirmar el correo de verificacion que le ha sido enviado', 'warning')
                dispatch(
                    finishLoading()
                )
            }
        } catch (e) {
            // console.log(e);  aqui se ven errores al logear
            dispatch(finishLoading())
            e.code === "auth/user-not-found"
                && Swal.fire('Error', 'No hay ningún registro de usuario que corresponda a este identificador. El usuario puede haber sido eliminado', 'error');
            e.code === 'auth/wrong-password'
                && Swal.fire('Error', 'La contraseña no es válida o el usuario no tiene contraseña', 'error')
            e.code === 'auth/invalid-email'
                && Swal.fire('Alerta', 'La dirección de correo electrónico está mal formateada', 'warning')
            e.code === 'auth/too-many-requests'
                && Swal.fire('Advertencia', 'El acceso a esta cuenta se ha desactivado temporalmente debido a muchos intentos fallidos de inicio de sesión. Puede restaurarla inmediatamente restableciendo su contraseña o puede intentarlo de nuevo más tarde', 'error')
        }
    }

}

export const startRegisterEmailPasswordName = (email, password, name, history) => {
    return async (dispatch) => {
        const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password)
        
        // .then(async ({ user }) => {
        try {
            //para obtener el display name ,incluso la fotografia de google
            await user.updateProfile({ displayName: name })
            await user.sendEmailVerification()
            await dispatch(
                loginAction(user.uid, user.displayName, user.emailVerified)
            )
            history.push('/auth/login')
            Swal.fire('Cuenta creada con exito', 'Se te ha enviado un email de autenticación', 'success')
        } catch (error) {
            console.log(error);
        }
        // })
    }
}

export const startGoogleLogin = () => {
    return async (dispatch) => {
    
        const { user } = await firebase.auth().signInWithPopup(googleAuthProvider);
        dispatch(
            loginAction(user.uid, user.displayName, user.emailVerified)
        )
    }
}

export const loginAction = (uid, displayName, verifyEmail) => ({

    type: types.login,
    payload: {
        uid,
        displayName,
        verifyEmail
    }
});

//debe ser asynctrono porque me devleuve una pomesa de firebase
export const logoutAction = () => {
    return async (dispatch) => {
        localStorage.setItem('login','')
        firebase.auth().signOut();
        dispatch(logout());
    }
}

export const logout = () => ({
    type: types.logout
})

