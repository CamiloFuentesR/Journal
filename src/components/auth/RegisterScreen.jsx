import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from '../../hooks/useFom'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import { setError,unsetError } from '../../actions/uiActions'
import { startRegisterEmailPasswordName } from '../../actions/authActions'

export const RegisterScreen = () => {
    const history = useHistory(); 
    const dispatch = useDispatch();

    const error = useSelector(state => state.ui.msgError)

    const [registerFormValue,handleInputChange] = useForm({
        name:'',
        email: '',
        password: '',
        password2: '',
    });

    const {name,email,password,password2} =registerFormValue;

    const handleRegister = (e) => {
        e.preventDefault();
        if(isFormValid()){
                                                    //debe llevar el mismo orden definido
            dispatch(startRegisterEmailPasswordName(email,password,name,history))
      
        }

    }

    const isFormValid    = () => {
        if(name.trim().length <= 0 || email.trim() === '' || password.trim() ==='' || password2.trim() ===''){
            dispatch(setError('No deben haber campos vacios'))

            return false;
        }else if (!validator.isEmail(email)){
            dispatch(setError('email no valido'))
            return false;
        }
        else if(password !== password2 || password.length <5){
            dispatch(setError('Los password deben ser identicos y contener al meno 5 caractéres'))

            return false;
        }

        dispatch(unsetError())
        return true;
    } 

    return (
        <>
            <h3 className="auth__title">Register</h3>
            <form onSubmit={handleRegister}>
                {error &&
                <div className="auth__alert-error">
                    {error}
                </div>
                }
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    autoComplete="off"
                    autoFocus
                    className="auth__input"
                    value={name}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    autoComplete="off"
                    className="auth__input"
                    value={email}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange}
                />
                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

                <Link
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>
            </form>
        </>
    )
}
