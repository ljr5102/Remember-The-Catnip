class Api::SearchesController < ApplicationController

  def index
    @search_results = PgSearch
      .multisearch(params[:query])
      .page(params[:page])
      .per(10)
      .joins("JOIN tasks ON tasks.id = pg_search_documents.searchable_id")
      .where("tasks.owner_id = ?", current_user.id)
      .where("tasks.completed = ?", false)

    render :index
  end

end
