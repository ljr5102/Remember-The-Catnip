require 'rails_helper'

RSpec.describe Task, type: :model do

  describe "validations" do
    it { should validate_presence_of(:owner_id) }
    it { should validate_presence_of(:name) }

    it { should validate_inclusion_of(:priority).in_array([1, 2, 3]) }
    it { should allow_value(nil).for(:priority) }
  end

  describe "associations" do
    it { should belong_to(:user).class_name('User').with_primary_key('id').with_foreign_key('owner_id')}
    it { should belong_to(:list).class_name('List').with_primary_key('id').with_foreign_key('list_id')}
    it { should belong_to(:location).class_name('Location').with_primary_key('id').with_foreign_key('location_id')}
  end

  describe "default tasks as incomplete" do
    it "should default completed column to false when task initially created" do
      task = FactoryGirl.build(:task)
      expect(task.completed).to be false
    end
  end

end
