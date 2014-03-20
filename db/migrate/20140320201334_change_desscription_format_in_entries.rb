class ChangeDesscriptionFormatInEntries < ActiveRecord::Migration
  def change
    change_column :entries, :description, :text
  end
end
