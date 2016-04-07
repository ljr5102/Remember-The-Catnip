class User < ActiveRecord::Base

  attr_reader :password

  validates :username, :email_address, :session_token, uniqueness: true
  validates :username, :email_address, :session_token, :password_digest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  after_initialize :ensure_session_token

  has_many(:tasks,
  class_name: 'Task',
  primary_key: :id,
  foreign_key: :owner_id)

  has_many(:lists,
  class_name: 'List',
  primary_key: :id,
  foreign_key: :creator_id)

  has_many(:location,
  class_name: 'Location',
  primary_key: :id,
  foreign_key: :creator_id)

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    if user
      return user if user.is_password?(password)
    end
    return nil
  end

  def self.find_or_create_by_auth_hash(auth_hash)
    provider = auth_hash[:provider]
    uid = auth_hash[:uid]
    email_address = auth_hash[:extra][:raw_info][:email]

    user = User.find_by(provider: provider, uid: uid)
    return user if user

    user = User.new(provider: provider, uid: uid, email_address: email_address)
    user.username = SecureRandom::urlsafe_base64(16)
    user.password = SecureRandom::urlsafe_base64(16)
    user.save!
    return user
  end

  def password=(password)
    if password.present?
      @password = password
      self.password_digest = BCrypt::Password.create(password)
    end
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

end
