class Task < ActiveRecord::Base
  include PgSearch
  multisearchable :against => [:name]

  validates :owner_id, :name, presence: true
  validates :completed, inclusion: {in: [true, false]}
  validates :priority, inclusion: {in: [1, 2, 3]}

  has_attached_file :image, default_url: "missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  belongs_to(:user,
  class_name: 'User',
  primary_key: :id,
  foreign_key: :owner_id)

  belongs_to(:list,
  class_name: 'List',
  primary_key: :id,
  foreign_key: :list_id)

end
