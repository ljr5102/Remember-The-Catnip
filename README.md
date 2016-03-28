# Remember The Milk

[Heroku link][heroku]

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

Remember The Milk is a web application inspired by the app of the same title.  
This app was built using Ruby on Rails and React.js.
Remember The Milk allows users to:


- [ ] Sign up for an account
- [ ] Log in and log out of their accounts
- [ ] Create, read, update, and delete tasks
- [ ] Create, read, update, and delete lists
- [ ] Store tasks in a list
- [ ] Create, read, update, and delete tags
- [ ] Add multiple tags to tasks
- [ ] Create, read, update, and delete notes
- [ ] Add multiple notes to tasks

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Stores][stores]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[stores]: ./docs/stores.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User authentication (0.5 days)

**Objective:** Users can sign up and login

- [ ] create `User` model
- [ ] set up users and sessions controllers
- [ ] create user and session views
- [ ] authentication
- [ ] users directed to blank root page upon signing in

### Phase 2: Task creation and editing (1 day)

**Objective:** Tasks can be created and edited

- [ ] Create Task model and controller
- [ ] Create Task API for index, create, show, destroy, update
- [ ] Create Flux Task Store
- [ ] Create Store actions for receiveAllTasks and receiveSingleTask
- [ ] Create the associated functions within the Task Store to handle the created actions
- [ ] Create React components TasksIndex, TasksIndexItem, TaskDetail
- [ ] Set up Task seed data

### Phase 3: Overall navigational setup (0.5 days)

**Objective:** Side navigational bar and header appear on screen
- [ ] Create React components Header, AllIndex
- [ ] Very light CSS styling to make Header and AllIndex navigational bars

### Phase 4: Inbox and Tasks Stats (1 day)

**Objective:** Users can access tasks through their inbox.  TasksStats component displays when a task is not selected.

- [ ] Create React components Inbox, AllTasks, Today, Tomorrow, ThisWeek, Trash
- [ ] Add Task Store Listeners to AllTasks, Today, Tomorrow, ThisWeek, and Trash
- [ ] Ensure the above components do not require additional ajax requests.  All should utilize the existing receiveAllTasks action and do additional logic directly in the component
- [ ] Test the functionality of the Listeners
- [ ] Create React component TaskStats
- [ ] Update components so TaskStats displays when TaskDetail is NOT displayed


### Phase 5: Lists (1 day)

**Objective:** Lists can be created, edited, and destroyed.  Users can add tasks to a list.

- [ ] Create List model and controller
- [ ] Create List API for create, update, destroy, index
- [ ] Create Flux List Store
- [ ] Create List Store actions for receiveAllLists
- [ ] Create Task Store action for receiveAllTasksforList
- [ ] Create React components ListsIndex, ListsIndexItem, ListNewForm, ListEditForm
- [ ] Add Task Store Listeners to ListsIndexItem
- [ ] Add List Store Listeners to ListIndex
- [ ] Add additional seed data for Lists


### Phase 6: Tags (1.5 days)

**Objective:** Tags can be added to tasks.  Tasks show all their tags and Tags show all associated tasks.

- [ ] Create Tag model and controller
- [ ] Create Tagging model (join table of tags and tasks)
- [ ] Create Tag API for create, update, destroy, index,
- [ ] Create Tag API for index for given task
- [ ] Create Task API for index for given tags
- [ ] Create Flux Tag Store
- [ ] Create Tag Store actions for receiveAllTags and recieveAllTagsforTask
- [ ] Create Task Store actions for receiveAllTasksforTag
- [ ] Create React components TagsIndex, TagsIndexItem, TagNewForm, TagEditForm
- [ ] Add Task Store Listeners to TagsIndexItem
- [ ] Add Tag Store Listeners to TagsIndex
- [ ] Add additional seed data for tags


### Phase 7: Notes (1 day)

**Objective:** Notes can be created, updated, destroyed.  Notes can be added to tasks.  

- [ ] Create Note model and controller
- [ ] Create Note API for index, create, update, destroy
- [ ] Create Flux Note Store
- [ ] Create Note Store action for receiveAllNotesforTask
- [ ] Create React components NotesIndex, NotesIndexItem, NoteNewForm, NoteEditForm
- [ ] Add Note Store Listeners to NotesIndex
- [ ] Add additional seed data for notes

### Phase 8: Locations (1 day)

**Objective:** Locations can be created, updated, destroyed.  Tasks can be given a location.

- [ ] Create Location model and controller
- [ ] Create Location API for index, create, update, destroy
- [ ] Create Flux Location Store
- [ ] Create Task Store action for receiveAllTasksforLocation
- [ ] Create Location Store action for receiveAllLocations
- [ ] Create React components for LocationsIndex, LocationsIndexItem, LocationNewForm, LocationEditForm
- [ ] Add Location Store Listeners to LocationsIndex
- [ ] Add Task Store Listeners to LocationsIndexItem
- [ ] Add additional seed data for Locations

### Phase 9: Final Touches and Testing (0.5 days)

**Objective:** Application has a clean professional look and operates smoothly.

- [ ] Add CSS styling to clean up visually
- [ ] Perform end-to-end testing to ensure usability
- [ ] Obtain feedback from other users

### Bonus Features (TBD)
- [ ] Add notifications
- [ ] Allow for adding of contacts and creating tasks for contacts
- [ ] Set up reminders to be sent to users email address
- [ ] Add smart lists
- [ ] Subtasks

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
[phase-seven]: ./docs/phases/phase7.md
[phase-eight]: ./docs/phases/phase8.md
[phase-nine]: ./docs/phases/phase9.md
