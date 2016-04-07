# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160407024926) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "lists", force: :cascade do |t|
    t.string   "name",       null: false
    t.integer  "creator_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "lists", ["name", "creator_id"], name: "index_lists_on_name_and_creator_id", unique: true, using: :btree

  create_table "locations", force: :cascade do |t|
    t.integer  "creator_id", null: false
    t.string   "name",       null: false
    t.string   "address",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "locations", ["name", "creator_id"], name: "index_locations_on_name_and_creator_id", unique: true, using: :btree

  create_table "pg_search_documents", force: :cascade do |t|
    t.text     "content"
    t.integer  "searchable_id"
    t.string   "searchable_type"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "pg_search_documents", ["searchable_type", "searchable_id"], name: "index_pg_search_documents_on_searchable_type_and_searchable_id", using: :btree

  create_table "tasks", force: :cascade do |t|
    t.integer  "owner_id",                           null: false
    t.string   "name",                               null: false
    t.boolean  "completed",          default: false, null: false
    t.date     "start_date"
    t.date     "due_date"
    t.integer  "priority"
    t.string   "estimate"
    t.integer  "list_id"
    t.integer  "location_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  add_index "tasks", ["list_id"], name: "index_tasks_on_list_id", using: :btree
  add_index "tasks", ["location_id"], name: "index_tasks_on_location_id", using: :btree
  add_index "tasks", ["owner_id"], name: "index_tasks_on_owner_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "email_address",   null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email_address"], name: "index_users_on_email_address", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
