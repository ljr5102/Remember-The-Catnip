require 'rails_helper'

RSpec.describe Api::UsersController, type: :controller do

  describe "routing" do
    it { should route(:get, '/api/users/1').to(action: :show, id: 1, format: :json) }
    it { should route(:post, '/api/users').to(action: :create, format: :json)}
  end

end
