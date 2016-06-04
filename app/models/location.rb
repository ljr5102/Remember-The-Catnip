class Location < ActiveRecord::Base

  validates :name, :creator_id, :address, presence: true
  validates :name, uniqueness: { scope: :creator_id, message: "user already has location of this name"}

  belongs_to(:user,
  class_name: 'User',
  primary_key: :id,
  foreign_key: :creator_id)

  has_many(:tasks,
  class_name: 'Task',
  primary_key: :id,
  foreign_key: :location_id)

end
