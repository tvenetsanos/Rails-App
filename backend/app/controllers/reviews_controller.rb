require 'pry'
class ReviewsController < ApplicationController
  def create
    if isLoggedIn?
      params[:user_id] = session[:user_id]
      @review = Review.create(params.except(:review).permit(:restaurant, :dislikes, :likes, :rating, :user_id))
      render json: @review
    else
      head 403
    end
  end

  def delete
    if isLoggedIn?
      @review = Review.destroy(params.require(:id))
      render json: @review
    else
      head 403
    end
  end  

  def update
    if isLoggedIn?
      @review = Review.update(params[:id], params.require(:review).permit(:user_id, :id, :restaurant, :dislikes, :likes, :rating))
      render json: @review
    else 
      head 403
    end
  end

  def get
    if isLoggedIn?
      @review = Review.where(user_id: session[:user_id])
      render json: @review
    else
      head 403
    end
  end
end
