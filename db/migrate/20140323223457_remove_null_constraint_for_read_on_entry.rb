class RemoveNullConstraintForReadOnEntry < ActiveRecord::Migration
  def change
  	change_column_null :entries, :read, true
  end
end
