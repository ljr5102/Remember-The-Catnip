# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app


## JSON API

### Users

- `GET /api/users/:id`
- `POST /api/users`

### Session

- `GET /api/session`
- `POST /api/session`
- `DELETE /api/session`

### Tasks

- `GET /api/tasks/today`
- `GET /api/tasks/tomorrow`
- `GET /api/tasks/week`
- `GET /api/tasks/completed`
- `GET /api/tasks`
- `POST /api/tasks`
- `GET /api/tasks/:id`
- `PATCH /api/tasks/:id`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`
- `PATCH /api/tasks/:id/images`

### Lists

- `GET /api/lists`
- `POST /api/lists`
- `GET /api/lists/:id`
- `PATCH /api/lists/:id`
- `PUT /api/lists/:id`
- `DELETE /api/lists/:id`
- `GET /api/lists/:id/tasks`

### Locations

- `GET /api/locations`
- `POST /api/locations`
- `GET /api/locations/:id`
- `PATCH /api/locations/:id`
- `PUT /api/locations/:id`
- `DELETE /api/locations/:id`
- `GET /api/locations/:id/tasks`

### Omniauth

- `GET /auth/facebook/callback`
