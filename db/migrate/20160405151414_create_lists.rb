class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.string :name, null: false
      t.integer :creator_id, null: false

      t.timestamps
    end
    add_index :lists, [:name, :creator_id], unique: true
  end
end
