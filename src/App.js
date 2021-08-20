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
//import Main from "./main.js"
import Footer from "./components/footer.js"
import Header from "./components/header.js"

class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Switch>
                            <Route 
                                render={(routeProps) => {
                                    return (
                                    <div>
                                      <Header />
                                      <MyReviews {...routeProps}/>
                                      <Footer />
                                    </div>)
                                }}
                                path="/myreviews">
                            </Route>
                            <Route 
                                render={(routeProps) => {
                                    return (
                                    <div>
                                      <Header />
                                      <WriteReview {...routeProps}/>
                                      <Footer />
                                    </div>)
                                }}
                                path="/writereview">
                            </Route>
                            <Route path="/signup">
                                <SignUp />
                            </Route>
                            <Route path="/">
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