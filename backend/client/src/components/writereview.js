import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class WriteReview extends Component {
    constructor(props) {
        super(props)
        console.log(props.location.state.reviewId)
        this.state = {
            open: false,
            reviewId: props.location.state.reviewId ? props.location.state.reviewId : 0,
            rating: props.location.state.rating ? props.location.state.rating : 0,
            likes: props.location.state.likes ? props.location.state.likes : "",
            dislikes: props.location.state.dislikes ? props.location.state.dislikes : "",
            restaurant: props.location.state.restaurant ? props.location.state.restaurant : "",
            edit: props.location.state.edit ? props.location.state.edit : false
        }
    }

    handleRestaurantUpdate = (event) => {
        this.setState({
            restaurant: event.target.value
        })
    }

    handleLikesUpdate = (event) => {
        this.setState({
            likes: event.target.value
        })
    }

    handleDislikesUpdate = (event) => {
        this.setState({
            dislikes: event.target.value
        })
    }

    handleRatingUpdate = (event) => {
        this.setState({
            rating: event.target.value
        })
    }

    handleCreateReview = () => {
        console.log("hey")
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ 
              restaurant: this.state.restaurant,
              likes: this.state.likes,
              dislikes: this.state.dislikes,
              rating: this.state.rating,
            })
          };
          fetch("/reviews", requestOptions)
          .then(
              this.setState({
                  redirect: true
              })
          )
    }

    handleUpdateReview = () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              id: this.state.reviewId,
              restaurant: this.state.restaurant,
              likes: this.state.likes,
              dislikes: this.state.dislikes,
              rating: this.state.rating,
              user_id: this.state.userDetailId
            })
          };
          fetch("/reviews", requestOptions)
          .then(
              this.setState({
                  redirect: true
              })
          )
    }

    handleFinish = () => {
        if (this.state.edit) {
            this.handleUpdateReview()
        }
        else {
            this.handleCreateReview()
        }
    }
    

  render() {
    return (
        <div className="write-review">
            <TextField id="standard-basic" label="Restaurant" value={this.state.restaurant} onChange={this.handleRestaurantUpdate} />
            <br></br>
            <TextField id="standard-basic" label="Likes" value={this.state.likes} onChange={this.handleLikesUpdate} />
            <br></br>
            <TextField id="standard-basic" label="Dislikes" value={this.state.dislikes} onChange={this.handleDislikesUpdate} />
            <br></br>
            <TextField id="standard-basic" label="Rating" value={this.state.rating} onChange={this.handleRatingUpdate} />
            <br></br>
            <Button className="button" onClick={this.handleFinish} variant="contained" style={{backgroundColor: "Red"}}>
                Finish!
            </Button>
                
            {this.state.redirect && 
            <Redirect
                    to={{
                    pathname: "/myreviews",
                    state: {
                        userDetailId: this.state.userDetailId
                    }
                }}
                />}
        </div>
    );
  }
}
 
export default WriteReview;