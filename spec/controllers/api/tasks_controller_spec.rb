require 'rails_helper'

RSpec.describe Api::TasksController, type: :controller do

  describe "routing" do
    it { should route(:get, '/api/tasks').to(action: :index, format: :json) }
    it { should route(:post, '/api/tasks').to(action: :create, format: :json) }
    it { should route(:patch, '/api/tasks/1').to(action: :update, id: 1, format: :json) }
    it { should route(:get, '/api/tasks/1').to(action: :show, id: 1, format: :json) }
    it { should route(:delete, '/api/tasks/1').to(action: :destroy, id: 1, format: :json) }
    it { should route(:patch, '/api/tasks/1/images').to(action: :remove_image, id: 1, format: :json) }

    it { should route(:get, '/api/tasks/today').to(action: :today, format: :json) }
    it { should route(:get, '/api/tasks/tomorrow').to(action: :tomorrow, format: :json) }
    it { should route(:get, '/api/tasks/week').to(action: :week, format: :json) }
    it { should route(:get, '/api/tasks/completed').to(action: :completed, format: :json) }
  end

end
