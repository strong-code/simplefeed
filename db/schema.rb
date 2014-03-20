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

ActiveRecord::Schema.define(version: 20140320183247) do

  create_table "entries", force: true do |t|
    t.string   "title",           null: false
    t.string   "link",            null: false
    t.integer  "feed_id",         null: false
    t.string   "pubdate"
    t.string   "description"
    t.string   "comments_url"
    t.string   "category"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "content_encoded"
  end

  create_table "feeds", force: true do |t|
    t.string   "url",         null: false
    t.string   "title",       null: false
    t.integer  "user_id",     null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "description"
  end

  add_index "feeds", ["url"], name: "index_feeds_on_url", unique: true

  create_table "users", force: true do |t|
    t.string   "username",      null: false
    t.string   "password_hash", null: false
    t.string   "session_token"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
