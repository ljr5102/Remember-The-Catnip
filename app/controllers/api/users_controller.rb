class Api::UsersController < ApplicationController

  def create
    @user = User.new
    @user = User.new(user_params)
    @user.save!
    login!(@user)
    render :show
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  private
  def user_params
    params.require(:user).permit(:username, :email_address, :password)
  end

end
