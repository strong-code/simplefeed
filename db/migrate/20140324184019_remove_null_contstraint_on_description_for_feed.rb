class RemoveNullContstraintOnDescriptionForFeed < ActiveRecord::Migration
  def change
    change_column_null :feeds, :description, true
  end
end
