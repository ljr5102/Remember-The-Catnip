tasks = @tasks
json.array! tasks do |task|

  all_tasks = true
  today = task.due_date && task.due_date == Date.today
  tomorrow = task.due_date && task.due_date == Date.today + 1
  # tomorrow = task.due_date && task.due_date.between?(Date.today, Date.today + 1)
  week = task.due_date && task.due_date.between?(Date.today, Date.today + 7)

  json.partial! 'api/tasks/task', task: task
  json.all all_tasks
  json.today today
  json.tomorrow tomorrow
  json.week week
end
