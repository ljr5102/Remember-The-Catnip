class Api::LocationsController < ApplicationController

  def index
    @locations = Location.all.where("locations.creator_id = ?", current_user.id)
    render :index
  end

  def show
    @location = Location.find(params[:id])
    render :show
  end

  def create
    @location = Location.new(location_params)
    @location.save!
    render :show
  end

  def update
  end

  def destroy
  end

  private
  def location_params
    params.require(:location).permit(:name, :address)
  end

end
