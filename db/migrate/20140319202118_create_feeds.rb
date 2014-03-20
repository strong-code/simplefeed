class CreateFeeds < ActiveRecord::Migration
  def change
    create_table :feeds do |t|
      t.text :url, null: false
      t.string :title, null: false
      t.integer :user_id, null: false
      t.text :description, null: false

      t.timestamps
    end
    add_index :feeds, :url, unique: true
  end
end
