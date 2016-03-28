# Phase 6: Tags (1.5 days)

## Rails
### Models
* Tag
* Tagging

### Controllers
* TagsController (index, create, new, edit, update, destroy)

### Views

## Flux
### Views (React Components)
* TagsIndex
 - TagsIndexItem
  - TagEditForm
 - TagNewForm

### Stores
* Tag

### Actions
* TagActions.receiveAllTags
* TagActions.receiveAllTagsforTask

### ApiUtil
* ApiUtil.fetchAllTags
* ApiUtil.createTag
* ApiUtil.editTag
* ApiUtil.destroyTag
* ApiUtil.fetchTagsforTask
* ApiUtil.fetchTasksforTag
* ApiUtil.destroyTagfromTask

## Gems/Libraries
