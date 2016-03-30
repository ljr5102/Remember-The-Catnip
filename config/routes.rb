Rails.application.routes.draw do
  root to: "sessions#new"
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :tasks, only: [:create, :destroy, :update, :index, :show]
  end
end
