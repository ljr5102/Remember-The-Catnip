class Api::ListsController < ApplicationController

  def index
    @lists = List.where("lists.creator_id = ?", current_user.id)
    render :index
  end

  def create
  end

  def update
  end

  def destroy
  end

end
