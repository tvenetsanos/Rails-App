import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Redirect } from "react-router-dom";

class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            redirect: false
        }
    }

      handleSignIn = () => {
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              email: this.state.email,
              password_digest: this.state.password
            })
          };
          fetch("/login", requestOptions)
          .then((res) => res.json())
          .then((data) => {
            this.setState({
              redirect: true
            })
        })
      }

      handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }
      handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }

  componentDidMount() {
  }

  render() {
    return (
     <div className="sign-up-button">
      <Dialog open={true} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To login to this website, please enter your email address and password.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            onBlur={this.handleEmailChange}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            onBlur={this.handlePasswordChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <a href="/signup">Don't have an account?</a>
          <Button onClick={this.handleSignIn} color="primary">
                Log in
          </Button>
        </DialogActions>
      </Dialog>
      {this.state.redirect && 
      <Redirect
            to={{
            pathname: "/myreviews"
          }}
        />}
    </div>
    );
  }
}
 
export default SignIn;