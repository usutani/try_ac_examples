class SessionsController < ApplicationController
  skip_before_action :ensure_authenticated_user, only: %i[new create]

  def new
    @users = User.all
  end

  def create
    authenticate_user(params[:user_id])
    redirect_to examples_url
  end
end
