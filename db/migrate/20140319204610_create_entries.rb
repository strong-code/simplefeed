class CreateEntries < ActiveRecord::Migration
  def change
    create_table :entries do |t|
      t.string :title, null: false
      t.string :link, null: false
      t.integer :feed_id, null: false
      t.string :pubdate
      t.string :description
      t.string :comments_url
      t.string :category

      t.timestamps
    end
  end
end
