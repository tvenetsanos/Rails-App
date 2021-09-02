import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import SignUp from "./components/signup.js"
import SignIn from "./components/signin.js"
import MyReviews from "./components/myreviews.js"
import WriteReview from "./components/writereview.js"
import PrivateRoute from "./components/privateroute.js"
//import Main from "./main.js"


class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Switch>
                            <PrivateRoute component={MyReviews}
                                path="/myreviews">
                            </PrivateRoute>
                            <PrivateRoute 
                                component={WriteReview}
                                path="/writereview">
                            </PrivateRoute>
                            <Route path="/signup" exact>
                                <SignUp />
                            </Route>
                            <Route path="/login" exact>
                                <SignIn />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;