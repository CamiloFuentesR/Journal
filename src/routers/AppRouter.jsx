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

export const AppRouter = () => {

    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setisLoggedIn] = useState(false);

    useEffect(() => {
        //es un observable que esta pendiente de los cambios esto viende de firestore
        firebase.auth().onAuthStateChanged(user => {
            //si existe un user id, es porque estoy logeado (debe tener el email verificado)
            if (user?.uid && user.emailVerified) {
                // dispatch(loginAction(user.uid, user.displayName, user.emailVerified));
                // al estar logeado estoy dejando una marca true de quee stoy logeado
                setisLoggedIn(true);
                 dispatch(startLoadingNotes(user.uid))
            } else {
                setisLoggedIn(false);
            }
            setChecking(false);
        });

    }, [dispatch, setChecking, setisLoggedIn])

    if(checking){
         return <Loading />
    }
return (
    <Router>
        <>
            <Switch>
                <PublicRouter
                    path="/auth"
                    component={AuthRouter}
                    isLogged={isLoggedIn}
                />
                <PrivateRouter
                    exact
                    path="/"
                    component={JournalScreen}
                    isLogged={isLoggedIn}
                />
                <Redirect to="/" />
            </Switch>
        </>
    </Router>
)
}
