class AddCategoryColumnToFeeds < ActiveRecord::Migration
  def change
    add_column :feeds, :category, :text, default: "Uncategorized"
  end
end
