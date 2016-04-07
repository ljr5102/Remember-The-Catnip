
json.array! @locations do |location|
  json.location_id location.id
  json.name location.name
  json.address location.address
  json.task_count location.tasks.count
end
