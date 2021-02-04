import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Redirect,
    Switch
} from 'react-router-dom'
import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { firebase } from '../firebase/firebaseConfig';
import { useDispatch } from 'react-redux';
// import { loginAction } from '../actions/authActions';
import { Loading } from '../components/loading/Loading';
import { PublicRouter } from './PublicRouter';
import { PrivateRouter } from './PrivateRouter';
import { startLoadingNotes } from '../actions/notesActions';

export const AppRouter = (store) => {

    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setisLoggedIn] = useState(false);

    useEffect(() => {
        //es un observable que esta pendiente de los cambios esto viende de firestore
        firebase.auth().onAuthStateChanged(user => {
            //si existe un user id, es porque estoy logeado (debe tener el email verificado)
            if (user?.uid && user.emailVerified) {

                localStorage.setItem('login', user.uid)
                // dispatch(loginAction(user.uid, user.displayName, user.emailVerified));
                // al estar logeado estoy dejando una marca true de quee stoy logeado
                setisLoggedIn(true);
                dispatch(startLoadingNotes(user.uid))
                setChecking(false);
            } else {
                setisLoggedIn(false);
                setChecking(false);

            }
        });

    }, [dispatch, setChecking, setisLoggedIn])
    //si no se usa, redirecciona al login mientras carga
    if (checking) {
        return <Loading />
    }
    return (
        <Router>
            <>
                <Switch>
                    <PublicRouter
                        path="/auth/login"
                        component={AuthRouter}
                        isAuthenticated={isLoggedIn}
                    />
                    <PrivateRouter
                        exact
                        path="/journal"
                        component={JournalScreen}
                        isAuthenticated={isLoggedIn}
                    />
                    <Redirect to="/journal" />
                </Switch>
            </>
        </Router>
    )
}
