import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export const PublicRouter = ({
    isLogged,
    component: Component,
    ...rest
}) => {
    return (
        <Route {...rest}
            component={(props) => (

                (!isLogged)
                    ? (<Component {...props} />)
                    : (<Redirect to="/" />)
            )}
        />
    )
}
