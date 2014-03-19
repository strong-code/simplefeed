# == Schema Information
#
# Table name: entries
#
#  id           :integer          not null, primary key
#  title        :string(255)      not null
#  link         :string(255)      not null
#  feed_id      :integer          not null
#  pubdate      :string(255)
#  description  :string(255)
#  comments_url :string(255)
#  category     :string(255)
#  created_at   :datetime
#  updated_at   :datetime
#

class Entry < ActiveRecord::Base
  validates :title, :link, :feed_id, presence: true
  validates :link, uniqueness: true

  belongs_to :feed

  def self.create_from_JSON(entryData, feed)
    clean_encode(entryData)

    Entry.create({
     title: entryData[:title],
     link: entryData[:link],
     feed_id: feed.id,
     pubdate: entryData[:pubDate],
     description: entryData[:description],
     comments_url: entryData[:comments],
     category: entryData[:category]
    })
  end

  #convert everything to utf-8 encoding so it plays nice with our db
  def self.clean_encode(data)
    data.each do |k, v|
      data[k].is_a?(String) ? v.force_encoding("utf-8") : v
    end
  end
end
