class SessionsController < ApplicationController
  def new
    @users = User.all
  end

  def create
    authenticate_user(params[:user_id])
    redirect_to examples_url
  end
end
