# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

### Users

- `GET /users/new`
- `POST /users`
- `PATCH /users`

### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

## JSON API

### Tasks

- `GET /api/tasks`
- `POST /api/tasks`
- `GET /api/tasks/:id`
- `PATCH /api/tasks/:id`
- `DELETE /api/tasks/:id`

### Lists

- `GET /api/lists`
- `POST /api/lists`
- `PATCH /api/lists/:id`
- `DELETE /api/lists/:id`
- `GET /api/lists/:id/tasks`

### Tags

- `GET /api/tags`
- `GET /api/tags/:tag_id/tasks`
- `GET /api/tasks/:task_id/tags`
- `POST /api/tasks/:task_id/tags`
- `PATCH /api/tags/:tag_id`
- `DELETE /api/tasks/:task_id/tags/:tag_id`
- `DELETE /api/tags/:tag_id`

### Locations

- `GET /api/locations`
- `POST /api/locations`
- `PATCH /api/locations/:location_id`
- `DELETE /api/locations/:location_id`
- `GET /api/locations/:location_id/tasks`

### Notes

- `GET /api/tasks/:task_id/notes`
- `POST /api/tasks/:task_id/notes`
- `PATCH /api/notes/:note_id`
- `DELETE /api/notes/:note_id`
