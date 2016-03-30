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
    # Date.parse!!!!
    debugger
    newTask = Task.new(task_params)
    # newTask.owner_id = current_user.id
    # newTask.save!
    # render :index
  end

  private
  def task_params
    params.require(:task).permit(:name, :start_date, :due_date, :priority, :estimate)
  end
end
