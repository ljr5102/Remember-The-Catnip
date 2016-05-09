
json.array! @locations do |location|
  json.location_id location.id
  json.name location.name
  json.address location.address
  json.lng location.lng
  json.lat location.lat
  json.task_count location.tasks.length
end
