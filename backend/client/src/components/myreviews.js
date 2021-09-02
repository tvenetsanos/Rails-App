import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Link, Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';


class MyReview extends Component {
  constructor(props) {
    super(props)
    console.log("In my reviews")
    this.state = {
        reviews: []
    }
  }

  componentDidMount() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
    fetch(`/reviews`, requestOptions)
    .then((resp) => resp.json())
    .then((data) => {
      this.setState({
        reviews: data
      })
    })
  }


   editReview = (review) => {
     return (
     <Redirect 
        to={{
          pathname: "/writeReview",
          state: {
            userDetailId: this.state.userDetailId,
            restaurant: review.restaurant,
            rating: review.rating,
            likes: review.likes,
            dislikes: review.dislikes,
            edit: true
          }
        }} />)
  }

  deleteReview = (reviewId) => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        id: reviewId
      })
    }
    fetch("/reviews", requestOptions)
    .then(() => {
      this.setState({
        reviews: this.state.reviews.filter((review) => {
          return review.id !== reviewId
        })
      })
    })
  } 

  renderReviews = () => {
    return this.state.reviews.map((review, index) => {
      return (
        <Grid item xs={12} md={4} key={index}>
          <Card className="card-root">
            <CardActionArea>
              <CardContent>
                  Restaurant:
                <Typography variant="body2" color="textSecondary" component="p">
                  {review.restaurant}
                </Typography>
                Rating:
                <Typography variant="body2" color="textSecondary" component="p">
                  {review.rating}
                </Typography>
                Likes:
                <Typography variant="body2" color="textSecondary" component="p">
                  {review.likes}
                </Typography>
                Dislikes:
                <Typography variant="body2" color="textSecondary" component="p">
                  {review.dislikes}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
            </CardActions>
            <Button size="small" color="primary" onClick={() => this.deleteReview(review.id)}>
              <DeleteForeverIcon />
            </Button>
            <Link to={{
              pathname: "/writeReview",
              state: {
                userDetailId: this.state.userDetailId,
                reviewId: review.id,
                restaurant: review.restaurant,
                rating: review.rating,
                likes: review.likes,
                dislikes: review.dislikes,
                edit: true
              }
            }}>
              <Button size="small" color="primary" onClick={() => this.editReview(review)}>
                <EditIcon />
              </Button>
            </Link>
          </Card>
        </Grid>
      )
    })
  }

  render() {
    return (
      <div> 
        {this.state.reviews.length > 0 && 
          <div>
            <h2>My Reviews</h2>
            <Grid container spacing={1}>
              {this.renderReviews()}
            </Grid>
            <Link
              to={{
                pathname: "/writeReview",
                state: {
                  userDetailId: this.state.userDetailId
              }
              }}>
                <Button onClick={this.handleSignUp} color="primary">
                    Add another
                </Button>
              </Link>
              </div>}
          {this.state.reviews.length === 0 && 
            <Link
            to={{
              pathname: "/writeReview",
              state: {
                userDetailId: this.state.userDetailId
            }
            }}>
              Add a review
            </Link>}
      </div>
    )
  }
}
 
export default MyReview;