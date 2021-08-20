require 'pry'
class ReviewsController < ApplicationController
  def create
    @review = Review.create(params.except(:review).permit(:restaurant, :dislikes, :likes, :rating, :user_id))
    render json: @review
  end

  def delete
    @review = Review.destroy(params.require(:id))
    render json: @review
  end

  def update
    @review = Review.update(params[:id], params.require(:review).permit(:user_id, :id, :restaurant, :dislikes, :likes, :rating))
    render json: @review
  end

  def get
    @review = Review.where(user_id: params["userId"])
    render json: @review
  end
end
