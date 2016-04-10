# Phase 6: Locations (1 day)

## Rails
### Models
* Location

### Controllers
* LocationsController (index, create, show, update, destroy)

### Views
* JSON: index, show

## Flux
### Views (React Components)
* LocationsIndex
 - LocationsIndexItem

### Stores
* Location

### Actions
* LocationActions.receiveAllLocations
* LocationActions.receiveNewLocation

### ApiUtil
* ApiUtil.fetchAllLocations
* ApiUtil.createLocation
* ApiUtil.fetchCoordsForLocation

## Gems/Libraries
* Google maps
