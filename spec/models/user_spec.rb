require 'rails_helper'

RSpec.describe User, type: :model do

  describe "validations" do
    it { should validate_presence_of(:username) }
    it { should validate_presence_of(:password_digest) }
    it { should validate_presence_of(:email_address) }
    it { should validate_presence_of(:session_token) }

    it { should allow_value(nil).for(:password) }
    it { should validate_length_of(:password).is_at_least(6) }

    subject { FactoryGirl.build(:user) }
    it { should validate_uniqueness_of(:username) }
    it { should validate_uniqueness_of(:email_address) }
    it { should validate_uniqueness_of(:session_token) }
  end

  describe "associations" do
    it { should have_many(:tasks).class_name('Task').with_primary_key('id').with_foreign_key('owner_id')}
    it { should have_many(:lists).class_name('List').with_primary_key('id').with_foreign_key('creator_id')}
    it { should have_many(:location).class_name('Location').with_primary_key('id').with_foreign_key('creator_id')}
  end

  describe "auth" do
    it "find user when given proper credentials" do
      logged_in_user = FactoryGirl.create(:user)
      fetched_user = User.find_by_credentials("mr_smalz", "hello1")
      expect(fetched_user).to eq(logged_in_user)
    end

    it "will return nil when given invalid username" do
      logged_in_user = FactoryGirl.create(:user)
      fetched_user = User.find_by_credentials("mrsmalz", "hello1")
      expect(fetched_user).to be_nil
    end

    it "will return nil when given invalid password" do
      logged_in_user = FactoryGirl.create(:user)
      fetched_user = User.find_by_credentials("mr_smalz", "hello2")
      expect(fetched_user).to be_nil
    end
  end

  describe "omniauth" do
    it "creates a user when it cannot find provider and uid" do
      user_to_create = User.find_or_create_by_auth_hash(
        {provider: "facebook", uid: 151515151, extra: {raw_info: {email: "jim@gmail.com"}}}
      )
      preexisting_user = FactoryGirl.create(:user,
        username: SecureRandom::urlsafe_base64(16), password: SecureRandom::urlsafe_base64(16),
        email_address: "zuckerberg@facebook.com", provider: "facebook", uid: 1234567891234
      )
      expect(user_to_create).not_to eql(preexisting_user)
    end

    it "fetches the user when it finds provider and uid" do
      preexisting_user = FactoryGirl.create(:user,
        username: SecureRandom::urlsafe_base64(16), password: SecureRandom::urlsafe_base64(16),
        email_address: "zuckerberg@facebook.com", provider: "facebook", uid: 1234567891234
      )
      user_to_fetch = User.find_or_create_by_auth_hash(
        {provider: "facebook", uid: 1234567891234, extra: {raw_info: {email: "jim@gmail.com"}}}
      )
      expect(user_to_fetch).to eq(preexisting_user)
    end
  end

end
