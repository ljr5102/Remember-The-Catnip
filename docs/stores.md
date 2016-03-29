# Flux Stores

### TaskStore

Holds all persisted task data.

##### Actions:
- `receiveAllTasks`
- `receiveSingleTask`
- `addTask`
- `updateTask`
- `removeTask`
- `receiveAllTasksforList`
- `receiveAllTasksforTag`
- `receiveAllTasksforLocation`

##### Listeners:
- `TasksIndex`

### ListStore

Holds all persisted list data.

##### Actions:
- `receiveAllLists`

##### Listeners:
- `ListsIndex`


### TagStore

Holds all persisted tag data.

##### Actions:
- `receiveAllTags`
- `receiveAllTagsforTask`

##### Listeners:
- `TagsIndex`


### Note Store

Holds all persisted note data.

##### Actions:
- `receiveAllNotesforTask`

##### Listeners:
- `Notes`


### LocationStore

Holds all persisted location data.

##### Actions:
- `receiveAllLocations`

##### Listeners:
- `Locations`
