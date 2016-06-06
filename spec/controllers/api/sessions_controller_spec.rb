require 'rails_helper'

RSpec.describe Api::SessionsController, type: :controller do

  describe "routing" do
    it { should route(:get, '/api/session').to(action: :show, format: :json) }
    it { should route(:post, '/api/session').to(action: :create, format: :json)}
    it { should route(:delete, '/api/session').to(action: :destroy, format: :json)}
  end

end
