require 'rails_helper'

RSpec.describe List, type: :model do

  describe "validations" do
    it { should validate_presence_of(:creator_id) }
    it { should validate_presence_of(:name) }

    subject { FactoryGirl.build(:list) }
    it {
      should validate_uniqueness_of(:name).
      scoped_to(:creator_id).
      with_message("user already has list of this name")
    }
  end

  describe "associations" do
    it { should have_many(:tasks).class_name('Task').with_primary_key('id').with_foreign_key('list_id') }
    it { should belong_to(:user).class_name('User').with_primary_key('id').with_foreign_key('creator_id') }
  end

  describe "list deletion" do
    it "sets task list id's to nil when a list is deleted" do
      list_to_delete = FactoryGirl.build(:list)
      list_not_being_deleted = FactoryGirl.build(:list, name: "Dog Stuff")
      task1 = FactoryGirl.build(:task, list_id: list_to_delete.id)
      task2 = FactoryGirl.build(:task, list_id: list_to_delete.id)
      task3 = FactoryGirl.build(:task, list_id: list_to_delete.id)
      task4 = FactoryGirl.build(:task, list_id: list_not_being_deleted.id)
      list_to_delete.destroy

      expect(task1.list_id).to be_nil
      expect(task2.list_id).to be_nil
      expect(task3.list_id).to be_nil
      expect(task4.list_id).to eq(list_not_being_deleted.id)
    end
  end
end
