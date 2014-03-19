class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :password_hash, null: false
      t.string :session_token

      t.timestamps
    end
  end
end
