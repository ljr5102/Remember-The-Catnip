# Phase 1: User Authentication (0.5 days)

## Rails
### Models
* User

### Controllers
* UsersController (create, show)
* SessionsController (create, show, destroy)
* StaticPagesController (root)

### Views
* static_pages/root.html.erb

## Flux
### Views (React Components)
* Login
* UserNew

### Stores
* Session

### Actions
* SessionActions.currentUserReceived
* SessionActions.currentUserFetched
* SessionActions.logout

### ApiUtil
* ApiUtil.login
* ApiUtil.logout
* ApiUtil.fetchCurrentUser
* ApiUtil.createUser

## Gems/Libraries
* BCrypt (Gem)
