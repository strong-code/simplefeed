class CreateEntries < ActiveRecord::Migration
  def change
    create_table :entries do |t|
      t.text :title, null: false
      t.text :link, null: false
      t.integer :feed_id, null: false
      t.text :pubdate
      t.text :description
      t.text :comments_url
      t.text :category
      t.text :content_encoded

      t.timestamps
    end
  end
end
