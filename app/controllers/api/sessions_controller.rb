class Api::SessionsController < ApplicationController

  def show
    if signed_in?
      @user = current_user
      render :show
    else
      render json: { message: "Not logged in"}, status: 401
    end
  end

  def create
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
    if @user
      login!(@user)
      render :show
    else
      render json: { message: "Invalid credentials" }, status: 401
    end
  end

  def destroy
    logout! if signed_in?
    render json: {}
  end

end
