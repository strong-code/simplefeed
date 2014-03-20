class CreateEntries < ActiveRecord::Migration
  def change
    create_table :entries do |t|
      t.text :title, null: false
      t.text :link, null: false
      t.integer :feed_id, null: false
      t.string :pubdate
      t.text :description
      t.string :comments_url
      t.string :category
      t.text :content_encoded

      t.timestamps
    end
  end
end
