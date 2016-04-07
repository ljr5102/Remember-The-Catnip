class AddLngLatToLocations < ActiveRecord::Migration
  def change
    add_column :locations, :lng, :float
    add_column :locations, :lat, :float
  end
end
