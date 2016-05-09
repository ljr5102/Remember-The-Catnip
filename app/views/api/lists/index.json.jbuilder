
json.array! @lists do |list|
  json.list_id list.id
  json.name list.name
  json.task_count list.tasks.length
end
