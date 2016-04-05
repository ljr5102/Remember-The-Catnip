
json.array! @lists do |list|
  json.list_id list.id
  json.name list.name
end
