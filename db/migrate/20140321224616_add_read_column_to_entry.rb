class AddReadColumnToEntry < ActiveRecord::Migration
  def change
    add_column :entries, :read, :boolean, :null => false, :default => false
  end
end
