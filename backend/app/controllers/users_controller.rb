require 'pry'
class UsersController < ApplicationController
  def signup
    @user = User.create(params.permit(:username, :email,      
    :password_digest))
    session[:user_id] = @user.id
    render json: @user
  end

  def login
    @user = User.find_by(email: params[:email])
    if @user && @user.password_digest == params[:password_digest]
      session[:user_id] = @user.id
      render json: @user
    else
      head 403
    end
  end
end
