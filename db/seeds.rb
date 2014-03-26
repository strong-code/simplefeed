# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

testuser = User.create!(username: "TestUser", password: "password")

#create some default feeds
Feed.find_or_create("http://www.npr.org/rss/rss.php?id=1001", testuser.id)
Feed.find_or_create("http://kotaku.com/vip.xml", testuser.id)
Feed.find_or_create("http://www.theverge.com/rss/frontpage", testuser.id)
Feed.find_or_create("http://techspec.tumblr.com/rss", testuser.id)
Feed.find_or_create("https://news.ycombinator.com/rss", testuser.id)