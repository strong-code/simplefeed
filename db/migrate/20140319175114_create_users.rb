class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.text :username, null: false, unique: true
      t.text :password_hash, null: false
      t.text :session_token

      t.timestamps
    end
  end
end
