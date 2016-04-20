class Api::SearchesController < ApplicationController

  def index
    @search_results = PgSearch
      .multisearch(params[:query])
      .page(params[:page])
      .per(2)

    render :index
  end

end
