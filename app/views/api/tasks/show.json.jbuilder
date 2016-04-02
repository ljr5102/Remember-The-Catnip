task = @task
all_tasks = true
today = Task.where("tasks.due_date = ? AND tasks.id = ?", Date.today, task.id).length == 1
tomorrow = Task.where("tasks.due_date = ? AND tasks.id = ?", Date.today + 1, task.id).length == 1
week = Task.where("tasks.id = ? AND tasks.due_date BETWEEN ? AND ?", task.id, Date.today, Date.today + 7).length == 1
json.task do
  json.partial! 'api/tasks/task', task: task
  json.all all_tasks
  json.today today
  json.tomorrow tomorrow
  json.week week
end
