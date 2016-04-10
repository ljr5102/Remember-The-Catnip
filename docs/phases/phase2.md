# Phase 2: Tasks (1 day)

## Rails
### Models
* Task

### Controllers
* TasksController (index, completed, list, location, create, show, update, destroy, remove_image)

### Views
* JSON: index, show

## Flux
### Views (React Components)
* TasksIndex
  - TasksIndexItem
   - TaskDetail
    - TaskEditForm
  - TaskNewForm
  - CompletedTasks

### Stores
* Task
* TaskDetail

### Actions
* TaskActions.receiveAllTasks
* TaskActions.receiveAllCompletedTasks
* TaskActions.receiveSingleTask
* TaskActions.receiveIncompleteTasks
* TaskActions.addTask
* TaskActions.removeTask
* TaskActions.updateTask
* TaskActions.completeTask
* TaskActions.setStore

### ApiUtil
* ApiUtil.fetchAllTasks
* ApiUtil.fetchSingleTask
* ApiUtil.createTask
* ApiUtil.updateTask
* ApiUtil.removeImage
* ApiUtil.completeTask
* ApiUtil.destroyTask

## Gems/Libraries
