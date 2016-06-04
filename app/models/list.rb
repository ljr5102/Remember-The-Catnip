class List < ActiveRecord::Base

  before_destroy do |list|
    Task.where(list_id: list.id).each do |task|
      task.update_attribute(:list_id, nil)
    end
  end

  validates :name, :creator_id, presence: true
  validates :name, uniqueness: { scope: :creator_id, message: "user already has list of this name"}

  belongs_to(:user,
  class_name: 'User',
  primary_key: :id,
  foreign_key: :creator_id)

  has_many(:tasks,
  class_name: 'Task',
  primary_key: :id,
  foreign_key: :list_id,
  inverse_of: :list)


end
