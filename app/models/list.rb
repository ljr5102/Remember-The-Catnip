class List < ActiveRecord::Base

  validates :name, :creator_id, presence: true
  validates :name, uniqueness: { scope: :creator_id, message: "user already has list of this name"}

  belongs_to(:user,
  class_name: 'User',
  primary_key: :id,
  foreign_key: :creator_id)

  has_many(:tasks,
  class_name: 'Task',
  primary_key: :id,
  foreign_key: :list_id)


end
