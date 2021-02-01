import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import validator from 'validator';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/authActions';
import { setError } from '../../actions/uiActions';
import { useForm } from '../../hooks/useFom';


export const LoginScreen = () => {

    const dispatch = useDispatch();

    const error = useSelector(state => state.ui.msgError)
    const loading = useSelector(state => state.ui.loading)
    const verificar = useSelector(state => state.auth.verifyEmail)
    const [formValues, handleInputChange] = useForm({
        email: 'profesor.camilo.f@gmail.com',
        password: '123456'
    });
    const [errorEmail, seterrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [countError, setcountError] = useState(0)
    const { email, password } = formValues;
    const validEmail = () => {

        if (email.trim() === '' || !validator.isEmail(email)) {
            dispatch(setError('Debe ingresar Email válido'));
            seterrorEmail('error');
            setErrorPassword('')

            return false;
        }
        seterrorEmail('')
        return true;
    }
    const validPassword = () => {

        if (password.trim() === '' || password.length < 6) {
            dispatch(setError('Password no valido'))
            setErrorPassword('error')
            setcountError(countError + 1)
            return false;
        } else if (error === 'Debe ingresar Email válido') {
            seterrorEmail('')

        }
        setErrorPassword('')
        return true;
    }

    const handleLogin = (e) => {
        e.preventDefault();
        validEmail() && validPassword() &&
            //debe llevar el mismo orden definido
            dispatch(startLoginEmailPassword(email, password, verificar));
    }
    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }
    return (
        <>
            {
                loading &&
                <div className="auth__alert-success">
                    waiting
                    </div>
            }
            <h3 className="auth__title ">Login</h3>
            <form onSubmit={handleLogin}>
                {
                    countError >= 3 && countError < 7 &&
                    <p className="auth__alert-warning">
                        {`${countError}/6 intentos, luego tendrá un bloqueo temporal`}
                    </p>
                }


                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    autoComplete="off"
                    className={'auth__input ' + errorEmail}
                    value={email}
                    onChange={handleInputChange}
                />
                {errorEmail &&
                    <p className="auth__alert-login">
                        {error}
                    </p>
                }
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className={'auth__input ' + errorPassword}
                    value={password}
                    onChange={handleInputChange}
                />
                {errorPassword &&
                    <p className="auth__alert-login">
                        {error}
                    </p>
                }
                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                >
                    login
                </button>
                <div className="auth__social-networks">
                    <p>login with social network</p>
                    <div
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <Link
                    to="/auth/register"
                    className="link"
                >
                    Create new account
                </Link>
            </form>
        </>
    )
}
