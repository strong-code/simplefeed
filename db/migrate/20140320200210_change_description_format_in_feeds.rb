class ChangeDescriptionFormatInFeeds < ActiveRecord::Migration
  def change
    change_column :feeds, :description, :text
  end
end
