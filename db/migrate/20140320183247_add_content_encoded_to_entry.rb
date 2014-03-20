class AddContentEncodedToEntry < ActiveRecord::Migration
  def change
    add_column :entries, :content_encoded, :string
  end
end
