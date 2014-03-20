# == Schema Information
#
# Table name: feeds
#
#  id         :integer          not null, primary key
#  url        :string(255)      not null
#  title      :string(255)      not null
#  user_id    :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

require 'open-uri'
require 'simple-rss'

class Feed < ActiveRecord::Base
  validates :url, :title, presence: true
  validates :url, uniqueness: true

  has_many :entries, :dependent => :destroy

  #find an existing feed in our database by url (which is uniq)
  def self.find_or_create(url, user_id)
    feed = Feed.find_by_url(url)

    begin
      if feed
        return feed
      else
        feed_data = SimpleRSS.parse(open(url))
        feed = Feed.create(url: url, title: feed_data.title, user_id: user_id)
        feed_data.entries.each { |en| Entry.create_from_JSON(en, feed) }
        return feed
      end
    rescue => e
      return nil
    end
  end

  #reload feed and fetch new entries
  def reload
    feed_data = SimpleRSS.parse(open(self.url))
    existing_entry_links = Entry.pluck(:link).sort

    feed_data.entries.each do |entry_data|
      unless existing_entry_links.include?(entry_data.link)
        Entry.create_from_JSON(entry_data, self)
      end
    end

    self.touch #update the timestamp in db after we do this
    self
  end


end
