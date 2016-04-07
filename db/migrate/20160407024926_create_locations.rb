class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.integer :creator_id, null: false
      t.string :name, null: false
      t.string :address, null: false

      t.timestamps
    end
    add_index :locations, [:name, :creator_id], unique: true
  end
end
