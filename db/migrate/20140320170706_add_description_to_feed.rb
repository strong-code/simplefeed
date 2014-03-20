class AddDescriptionToFeed < ActiveRecord::Migration
  def change
    add_column :feeds, :description, :text
  end
end
