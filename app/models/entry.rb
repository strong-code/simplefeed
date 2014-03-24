# == Schema Information
#
# Table name: entries
#
#  id              :integer          not null, primary key
#  title           :text             not null
#  link            :text             not null
#  feed_id         :integer          not null
#  pubdate         :text
#  description     :text
#  comments_url    :text
#  category        :text
#  content_encoded :text
#  created_at      :datetime
#  updated_at      :datetime
#  read            :boolean          default(FALSE)
#


class Entry < ActiveRecord::Base
  validates :title, :link, :feed_id, presence: true

  belongs_to :feed

  def self.create_from_JSON(entryData, feed)
    clean_encode(entryData)

    Entry.create({
     title: entryData[:title],
     link: entryData[:link],
     feed_id: feed.id,
     pubdate: entryData[:pubDate],
     description: entryData[:description],
     content_encoded: entryData[:content_encoded],
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
