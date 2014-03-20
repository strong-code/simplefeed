# == Schema Information
#
# Table name: feeds
#
#  id          :integer          not null, primary key
#  url         :text             not null
#  title       :text             not null
#  user_id     :integer          not null
#  description :text             not null
#  created_at  :datetime
#  updated_at  :datetime
#

require 'open-uri'
require 'simple-rss'

class Feed < ActiveRecord::Base
  validates :url, :title, presence: true
  validate :unique_feed_per_user

  has_many :entries, :dependent => :destroy

  #find an existing feed in our database by url (which is uniq)
  def self.find_or_create(url, user_id)
    user = User.find(user_id)
    feed = user.feeds.find_by_url(url)

    begin
      if feed
        return feed
      else
        feed_data = SimpleRSS.parse(open(url))
        feed = Feed.create(url: url, title: feed_data.title, user_id: user_id, description: feed_data.description)
        feed_data.entries.each { |en| Entry.create_from_JSON(en, feed) }
        return feed
      end
    rescue => e
      return nil
    end
  end

  #reload feed and fetch new entries only for current user
  def reload(user_id)
    feed_data = SimpleRSS.parse(open(self.url))
    existing_entry_links = Feed.where("user_id = ?", user_id).pluck(:url).sort

    feed_data.entries.each do |entry_data|
      unless existing_entry_links.include?(entry_data.link)
        Entry.create_from_JSON(entry_data, self)
      end
    end

    self.touch #update the timestamp in db after we do this
    self
  end

  def unique_feed_per_user
    self.class.exists?(
    :user_id => user_id,
    :url => url
    )
  end

  def clean_for_rendering
    self.entries.each do |entry|
      entry.attributes.each do |k,v|
        if entry.attributes[k].is_a?(String)
          entry.attributes[k] = v.force_encoding("ASCII-8BIT")
        end
      end
      entry.save
    end

    self.save
  end


end
