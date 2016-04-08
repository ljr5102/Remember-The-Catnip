task = @task
all_tasks = true
today = task.due_date && task.due_date == Date.today
# today = Task.where("tasks.due_date = ? AND tasks.id = ?", Date.today, task.id).length == 1
tomorrow = task.due_date && task.due_date.between?(Date.today, Date.today + 1)
# tomorrow = Task.where("tasks.due_date = ? AND tasks.id = ?", Date.today + 1, task.id).length == 1
week = task.due_date && task.due_date.between?(Date.today, Date.today + 7)
# week = Task.where("tasks.id = ? AND tasks.due_date BETWEEN ? AND ?", task.id, Date.today, Date.today + 7).length == 1
json.task do
  json.partial! 'api/tasks/task', task: task
  json.image_url asset_path(task.image.url)
  json.all all_tasks
  json.today today
  json.tomorrow tomorrow
  json.week week
end
