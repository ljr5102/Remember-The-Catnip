class Api::TasksController < ApplicationController

  def index
    @tasks = current_user.tasks
    render :index
  end

  def today
    @tasks = current_user.tasks.where("tasks.due_date = ?", Date.today)
    render :index
  end

  def tomorrow
    @tasks = current_user.tasks.where("tasks.due_date = ?", Date.today + 1)
    render :index
  end

  def week
    @tasks = current_user.tasks
      .where("tasks.due_date BETWEEN ? AND ?", Date.today, Date.today + 7)
    render :index
  end

  def show
    @task = Task.find(params[:id])
    render :show
  end

  def create
    @task = Task.new(task_params)
    @task.owner_id = current_user.id
    @task.save!
    render :show
  end

  def update
    @task = Task.find(params[:id])
    @task.update_attributes(task_params)
    render :show
  end

  def destroy
    Task.find(params[:id]).destroy
    render :index
  end

  private
  def task_params
    params.require(:task).permit(:name, :start_date, :due_date, :priority, :estimate, :image)
  end
end
