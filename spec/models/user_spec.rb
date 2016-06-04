require 'rails_helper'

RSpec.describe User, type: :model do

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

  it { should have_many(:tasks).class_name('Task').with_primary_key('id').with_foreign_key('owner_id')}
  it { should have_many(:lists).class_name('List').with_primary_key('id').with_foreign_key('creator_id')}
  it { should have_many(:location).class_name('Location').with_primary_key('id').with_foreign_key('creator_id')}

end
