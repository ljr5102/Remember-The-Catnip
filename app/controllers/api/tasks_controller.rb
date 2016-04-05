class Api::TasksController < ApplicationController

  def index
    @tasks = Task.includes(:user)
      .where("tasks.completed = ?", false)
      .where("tasks.owner_id = ?", current_user.id)
    render :index
  end

  def today
    @tasks = Task.includes(:user)
      .where("tasks.due_date = ?", Date.today)
      .where("tasks.completed =?", false)
      .where("tasks.owner_id = ?", current_user.id)
    render :index
  end

  def tomorrow
    @tasks = Task.includes(:user)
      .where("tasks.due_date = ?", Date.today + 1)
      .where("tasks.completed =?", false)
      .where("tasks.owner_id = ?", current_user.id)
    render :index
  end

  def week
    @tasks = Task.includes(:user)
      .where("tasks.due_date BETWEEN ? AND ?", Date.today, Date.today + 7)
      .where("tasks.completed =?", false)
      .where("tasks.owner_id = ?", current_user.id)
    render :index
  end

  def completed
    @tasks = Task.includes(:user)
      .where("tasks.completed = ?", true)
      .where("tasks.owner_id = ?", current_user.id)
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
    params.require(:task).permit(:name, :start_date, :due_date, :priority, :estimate, :completed, :image)
  end
end
