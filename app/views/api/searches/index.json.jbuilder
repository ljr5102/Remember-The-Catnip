json.meta do
  json.total_pages @search_results.total_pages
  json.query params[:query]
  json.page @search_results.current_page
end

json.search_results do
  json.array! @search_results.map(&:searchable) do |search_result|
    case search_result
    when Task
      next if search_result.owner_id != current_user.id
      json.partial! "api/tasks/task", task: search_result
    end
    json._type search_result.class.to_s
  end
end
