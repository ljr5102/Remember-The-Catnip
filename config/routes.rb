Rails.application.routes.draw do
  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :tasks, only: [:create, :destroy, :update, :index, :show]
    resource :session, only: [:show, :create, :destroy]
    resources :users, only: [:show, :create]
  end
end
