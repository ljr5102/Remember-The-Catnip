# Remember The Catnip

[Live Application Here][heroku]

[heroku]: remember-the-catnip.herokuapp.com

## Minimum Viable Product

Remember The Catnip is a web application inspired by Remember The Milk.  
This app was built using Ruby on Rails and React.js.
Remember The Catnip allows users to:


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

### [Phase 1][phase-one]: User authentication (0.5 days)

**Objective:** Users can sign up and login

- [ x ] Create `User` model
- [ x ] Set up users and sessions controllers
- [ x ] Create user and session views
- [ x ] Set up authentication
- [ x ] Direct users to blank root page upon signing in
- [ x ] Light CSS styling of login/sign up page

### [Phase 2][phase-two]: Task creation and editing (1 day)

**Objective:** Tasks can be created and edited

- [ ] Create Task model and controller
- [ ] Create Task API for index, create, show, destroy, update
- [ ] Create Flux Task Store
- [ ] Create all Task Store actions
- [ ] Create the associated functions within the Task Store to handle the created actions
- [ ] Create React components TasksIndex, TasksIndexItem, TaskDetail
- [ ] Set up Task seed data

### [Phase 3][phase-three]: Overall navigational setup (0.5 days)

**Objective:** Side navigational bar and header appear on screen
- [ ] Create React components Header, AllIndex
- [ ] Very light CSS styling to make Header and AllIndex navigational bars

### [Phase 4][phase-four]: Inbox and Tasks Stats (1 day)

**Objective:** Users can access tasks through their inbox.  TasksStats component displays when a task is not selected.

- [ ] Create React components Inbox, AllTasks, Today, Tomorrow, ThisWeek, Trash
- [ ] Add Task Store Listeners to AllTasks, Today, Tomorrow, ThisWeek, and Trash
- [ ] Test the functionality of the Listeners
- [ ] Create React component TaskStats
- [ ] Update components so TaskStats displays when TaskDetail is NOT displayed
- [ ] Touch up CSS where needed to give page nice flow


### [Phase 5][phase-five]: Lists (1 day)

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
- [ ] Touch up CSS to accommodate Lists


### [Phase 6][phase-six]: Tags (1.5 days)

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
- [ ] Touch up CSS to accommodate Tags


### [Phase 7][phase-seven]: Notes (1 day)

**Objective:** Notes can be created, updated, destroyed.  Notes can be added to tasks.  

- [ ] Create Note model and controller
- [ ] Create Note API for index, create, update, destroy
- [ ] Create Flux Note Store
- [ ] Create Note Store action for receiveAllNotesforTask
- [ ] Create React components NotesIndex, NotesIndexItem, NoteNewForm, NoteEditForm
- [ ] Add Note Store Listeners to NotesIndex
- [ ] Add additional seed data for notes
- [ ] Touch up CSS to accommodate Notes

### [Phase 8][phase-eight]: Locations (1 day)

**Objective:** Locations can be created, updated, destroyed.  Tasks can be given a location.

- [ ] Create Location model and controller
- [ ] Create Location API for index, create, update, destroy
- [ ] Incorporate Google Maps API to allow for address validation
- [ ] Create Flux Location Store
- [ ] Create Task Store action for receiveAllTasksforLocation
- [ ] Create Location Store action for receiveAllLocations
- [ ] Create React components for LocationsIndex, LocationsIndexItem, LocationNewForm, LocationEditForm
- [ ] Add Location Store Listeners to LocationsIndex
- [ ] Add Task Store Listeners to LocationsIndexItem
- [ ] Add additional seed data for Locations
- [ ] Touch up CSS to accommodate Locations

### [Phase 9][phase-nine]: Final Touches and Testing (0.5 days)

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
- [ ] Recurring Tasks

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
[phase-seven]: ./docs/phases/phase7.md
[phase-eight]: ./docs/phases/phase8.md
[phase-nine]: ./docs/phases/phase9.md
