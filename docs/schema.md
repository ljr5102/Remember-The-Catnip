# Schema Information

## tasks
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
creator_id    | integer   | not null, foreign key (references users), indexed
due_date      | date      |
start_date    | date      |
priority      | string    |
list_id       | integer   | foreign key (references lists), indexed
repeat        | string    |
location_id   | integer   | foreign key (references locations), indexed
estimate      | string    |
owner_id      | integer   | not null, foreign key (references users), indexed
completed     | boolean   | not null, default: false

## lists
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
creator_id  | integer   | not null, foreign key (references users), indexed
name        | string    | not null

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
creator_id  | integer   | not null, foreign key (references users), indexed
name        | string    | not null

## taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
task_id     | integer   | not null, foreign key (references tasks), indexed, unique [tag_id]
tag_id      | integer   | not null, foreign key (references tags), indexed

## locations
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
creator_id  | integer   | not null, foreign key (references users), indexed
name        | string    | not null
address     | string    | not null

## notes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
task_id     | integer   | not null, foreign key (references tasks), indexed
body        | text      | not null


## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email_address   | string    | not null, indexed, unique
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
