class Api::ListsController < ApplicationController

  def index
    @lists = List.where("lists.creator_id = ?", current_user.id)
    render :index
  end

  def create
    @list = List.new(list_params)
    @list.creator_id = current_user.id
    @list.save!
    render :show
  end

  def update
  end

  def destroy
  end

  private
  def list_params
    params.require(:list).permit(:name)
  end

end
