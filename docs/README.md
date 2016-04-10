# Remember The Catnip

[Live Application Here][heroku]

[heroku]: http://www.rememberthecatnip.com

## Minimum Viable Product

Remember The Catnip is a web application inspired by Remember The Milk.  
This app was built using Ruby on Rails and React.js.
Remember The Catnip allows users to:


- [x] Sign up for an account
- [x] Log in and log out of their accounts
- [x] Create, read, update, and delete tasks
- [x] Create, read, update, and delete lists
- [x] Store tasks in a list
- [x] Have tasks organized in an inbox
- [x] Create, read, update, and delete locations
- [x] Add a location to tasks

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Stores][stores]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./views.md
[components]: ./components.md
[stores]: ./stores.md
[api-endpoints]: ./api-endpoints.md
[schema]: ./schema.md

## Implementation Timeline

### [Phase 1][phase-one]: User authentication (0.5 days)

**Objective:** Users can sign up and login

- [x] Create `User` model
- [x] Set up users and sessions controllers
- [x] Create user and session jbuilder views
- [x] Set up authentication
- [x] Direct users to blank root page upon signing in
- [x] Light CSS styling of login/sign up page

### [Phase 2][phase-two]: Task creation and editing (2.5 days)

**Objective:** Tasks can be created and edited

- [x] Create Task model and controller
- [x] Create Task API for index, create, show, destroy, update
- [x] Create Flux Task Store
- [x] Create all Task Store actions
- [x] Create the associated functions within the Task Store to handle the created actions
- [x] Create React components TasksIndex, TasksIndexItem, TaskDetail, TaskNewForm, TaskEditForm
- [x] Set up Task seed data

### [Phase 3][phase-three]: Overall navigational setup (0.5 days)

**Objective:** Side navigational bar and header appear on screen
- [x] Create React component App
- [x] Very light CSS styling to make header and side navigational bars

### [Phase 4][phase-four]: Inbox and Tasks Stats (2.5 days)

**Objective:** Users can access tasks through their inbox.  Task stats display when a task is not selected.

- [x] Create React components AllTasks, Today, Tomorrow, Week
- [x] Add Task Store Listeners to AllTasks, Today, Tomorrow, ThisWeek, and Trash
- [x] Test the functionality of the Listeners
- [x] Set up task stats to display within the created components
- [x] Update components so task stats display when TaskDetail is NOT displayed
- [x] Touch up CSS where needed to give page nice flow

### [Phase 5][phase-five]: Lists (1 day)

**Objective:** Lists can be created, edited, and destroyed.  Users can add tasks to a list.

- [x] Create List model and controller
- [x] Create List API for create, update, destroy, index
- [x] Create Flux List Store
- [x] Create all necessary List Store actions
- [x] Create APIUtil for fetchTasksForList
- [x] Create React components ListsIndex, ListsIndexItem
- [x] Add List Store Listeners to ListsIndex
- [x] Add additional seed data for Lists
- [x] Touch up CSS to accommodate Lists

### [Phase 6][phase-six]: Locations (1 day)

**Objective:** Locations can be created, updated, destroyed.  Tasks can be given a location.

- [x] Create Location model and controller
- [x] Create Location API for index, create, update, destroy
- [x] Incorporate Google Maps API to allow for address validation
- [x] Create Flux Location Store
- [x] Create ApiUtil for fetchTasksForLocation
- [x] Create Location Store action for receiveAllLocations
- [x] Create React components for LocationsIndex, LocationsIndexItem
- [x] Add Location Store Listeners to LocationsIndex
- [x] Add additional seed data for Locations
- [x] Touch up CSS to accommodate Locations

### [Phase 7][phase-seven]: Final Touches and Testing (0.5 days)

**Objective:** Application has a clean professional look and operates smoothly.

- [x] Add CSS styling to clean up visually
- [x] Perform end-to-end testing to ensure usability
- [x] Obtain feedback from other users

### Bonus Features (TBD)
- [ ] Create tags for tasks
- [ ] Create notes for tasks
- [ ] Add notifications
- [ ] Allow for adding of contacts and creating tasks for contacts
- [ ] Set up reminders to be sent to users email address
- [ ] Add smart lists
- [ ] Subtasks
- [ ] Recurring Tasks

[phase-one]: ./phases/phase1.md
[phase-two]: ./phases/phase2.md
[phase-three]: ./phases/phase3.md
[phase-four]: ./phases/phase4.md
[phase-five]: ./phases/phase5.md
[phase-six]: ./phases/phase6.md
[phase-seven]: ./phases/phase7.md
