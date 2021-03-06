import React, {useState, useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import Footer from "./footer.js"
import Header from "./header.js"

const PrivateRoute = ({component: Component, ...rest}) => {
    const [loggedIn, setLoggedIn] = useState(false) 
    const [isFinished, setIsFinished] = useState(false)

    useEffect(() => {
        isLoggedIn()
    })

    const isLoggedIn = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
          await fetch("/check_session", requestOptions)
          .then((resp) => {
              if (resp.ok) {
                setLoggedIn(true)
              }
              else {
                  setLoggedIn(false)
              }
              setIsFinished(true)
          })
    }


    if (loggedIn) {
        return (

            // Show the component only when the user is logged in
            // Otherwise, redirect the user to /signin page
            <Route {...rest} render={props => (
                <div>
                    <Header />
                    <Component {...props} />
                    <Footer />
                </div>
            )} />
        );
    }
    else {
        if (isFinished) {
            return (
                <Redirect to="/login" />
            )
        }
        else {
            return null
        }
    }
};

export default PrivateRoute;