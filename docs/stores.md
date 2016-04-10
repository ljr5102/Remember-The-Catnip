# Flux Stores

### TaskStore

Holds all persisted task data.

##### Actions:
- `receiveAllTasks`
- `receiveAllCompletedTasks`
- `receiveSingleTask`
- `receiveIncompleteTasks`
- `addTask`
- `updateTask`
- `completeTask`
- `removeTask`
- `setStore`

##### Listeners:
- `TasksIndex`
- `CompletedTasks`
- `AllTasks`
- `Today`
- `Tomorrow`
- `Week`


### TaskDetailStore

Holds persisted details for an individual task

##### Actions:
- `receiveSingleTask`
- `updateTask`
- `completeTask`
- `removeTask`

##### Listeners:
- `TaskDetail`


### ListStore

Holds all persisted list data.

##### Actions:
- `receiveAllLists`
- `receiveNewList`
- `receiveUpdatedList`
- `removeList`


##### Listeners:
- `ListsIndex`


### LocationStore

Holds all persisted location data.

##### Actions:
- `receiveAllLocations`
- `receiveNewLocation`

##### Listeners:
- `LocationsIndex`


### InboxStore

Holds the currently clicked inbox, list, or location

##### Actions:
- `receiveClickedInbox`
- `receiveClickedList`
- `receiveClickedLocation`

##### Listeners:


### SearchResultsStore

Holds all persisted search result data

##### Actions:
- `receiveResults`

#####Listeners:
- `Search`
- `TasksIndex`


### SessionStore

Holds all persisted session data

##### Actions:
- `currentUserReceived`
- `currentUserFetched`
- `logout`

##### Listeners:
- `App`
