class Api::TasksController < ApplicationController

  def index
    @tasks = Task.all
    render :index
  end

  def show
    @task = Task.find(params[:id])
    render :show
  end

  def create
    task_start_date = task_params[:start_date] ? Date.parse(task_params[:start_date]) : nil
    task_due_date = task_params[:due_date] ? Date.parse(task_params[:due_date]) : nil
    task_priority = task_params[:priority] ? task_params[:priority].to_i : nil
    @task = Task.new(task_params)
    @task.start_date = task_start_date
    @task.priority = task_priority
    @task.owner_id = current_user.id
    @task.save!
    render :show
  end

  private
  def task_params
    params.require(:task).permit(:name, :start_date, :due_date, :priority, :estimate)
  end
end
