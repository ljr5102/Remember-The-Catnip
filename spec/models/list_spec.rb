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
      list_to_delete = FactoryGirl.create(:list)
      list_not_being_deleted = FactoryGirl.create(:list, name: "Dog Stuff")
      task1 = FactoryGirl.create(:task, list_id: list_to_delete.id)
      task2 = FactoryGirl.create(:task, list_id: list_to_delete.id)
      task3 = FactoryGirl.create(:task, list_id: list_to_delete.id)
      task4 = FactoryGirl.create(:task, list_id: list_not_being_deleted.id)
      list_to_delete.destroy
      updated_task1 = Task.find(task1.id)
      updated_task2 = Task.find(task2.id)
      updated_task3 = Task.find(task3.id)
      updated_task4 = Task.find(task4.id)

      expect(updated_task1.list_id).to be_nil
      expect(updated_task2.list_id).to be_nil
      expect(updated_task3.list_id).to be_nil
      expect(updated_task4.list_id).to eq(list_not_being_deleted.id)
    end
  end
end
