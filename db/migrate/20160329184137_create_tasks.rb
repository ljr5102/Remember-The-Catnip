class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.integer :owner_id, null: false
      t.string :name, null: false
      t.boolean :completed, null: false, default: false
      t.date :start_date
      t.date :due_date
      t.integer :priority
      t.string :estimate
      t.integer :list_id
      t.integer :location_id

      t.timestamps
    end

    add_index :tasks, :owner_id
    add_index :tasks, :list_id
    add_index :tasks, :location_id
  end
end
