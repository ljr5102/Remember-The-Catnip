class Task < ActiveRecord::Base

  validates :owner_id, :name, presence: true
  validates :completed, inclusion: {in: [true, false]}

  belongs_to(:user,
  class_name: 'User',
  primary_key: :id,
  foreign_key: :owner_id)

end
