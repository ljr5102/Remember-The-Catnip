require 'rails_helper'

RSpec.describe Location, type: :model do

  describe "validations" do
    it { should validate_presence_of(:creator_id) }
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:address) }

    subject { FactoryGirl.build(:location) }
    it {
      should validate_uniqueness_of(:name).
      scoped_to(:creator_id).
      with_message("user already has location of this name")
    }
  end

  describe "associations" do
    it { should have_many(:tasks).class_name('Task').with_primary_key('id').with_foreign_key('location_id') }
    it { should belong_to(:user).class_name('User').with_primary_key('id').with_foreign_key('creator_id') }
  end

  describe "location deletion" do
    it "sets task location id's to nil when a location is deleted" do
      location_to_delete = FactoryGirl.create(:location)
      location_not_being_deleted = FactoryGirl.create(:location, name: "Dog Factory")
      task1 = FactoryGirl.create(:task, location_id: location_to_delete.id)
      task2 = FactoryGirl.create(:task, location_id: location_to_delete.id)
      task3 = FactoryGirl.create(:task, location_id: location_to_delete.id)
      task4 = FactoryGirl.create(:task, location_id: location_not_being_deleted.id)
      location_to_delete.destroy
      updated_task1 = Task.find(task1.id)
      updated_task2 = Task.find(task2.id)
      updated_task3 = Task.find(task3.id)
      updated_task4 = Task.find(task4.id)

      expect(updated_task1.location_id).to be_nil
      expect(updated_task2.location_id).to be_nil
      expect(updated_task3.location_id).to be_nil
      expect(updated_task4.location_id).to eq(location_not_being_deleted.id)
    end

  end

end
