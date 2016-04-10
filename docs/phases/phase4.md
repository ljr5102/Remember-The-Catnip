# Phase 4: Inbox, Tasks Stats, and Search (1 day)

## Rails
### Models

### Controllers
* TasksController (today, tomorrow, week)
* SearchesController (index)

### Views
* JSON: Searches - index

## Flux
### Views (React Components)
* AllTasks
* Today
* Tomorrow
* Week
* Search

### Stores
* Inbox
* SearchResults

### Actions
* InboxActions.receiveClickedInbox
* SearchResultActions.receiveResults

### ApiUtil
* ApiUtil.getAllTasks
* ApiUtil.getTodayTasks
* ApiUtil.getTomorrowTasks
* ApiUtil.getWeekTasks
* ApiUtil.search

## Gems/Libraries
* pgsearch (Gem)
* kaminari (Gem)
