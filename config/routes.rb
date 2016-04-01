Rails.application.routes.draw do
  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :tasks, only: [:create, :destroy, :update, :index, :show] do
      collection do
        get 'today'
        get 'tomorrow'
        get 'week'
      end
    end
    resource :session, only: [:show, :create, :destroy]
    resources :users, only: [:show, :create]
  end
end
