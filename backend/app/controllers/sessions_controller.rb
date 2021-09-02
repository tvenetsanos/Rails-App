require 'pry'
class SessionsController < ApplicationController
  def get_session
    if session[:user_id]
      head 200
    else
      head 404
    end
  end 

  def signup
    @user = User.create(params.permit(:username, :email,      
    :password_digest))
    session[:user_id] = @user.id
    render json: @user
  end

  def login
    @user = User.find_by(email: params[:email])
    if @user && @user.password_digest == params[:password_digest]
      cookies[:user_id] = @user.id
      session[:user_id] = @user.id
      render json: { session: session, user: @user }
    else
      head 403
    end
  end

  def logout
    session[:user_id] = nil
    head 200
  end
end
