Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :team, only: [:create, :index, :show]
  resources :game, only: [:index, :create]
  resources :result, only: [:create, :getByTeamId, :getByDate] do
    get "getByTeamId", on: :collection
    get "getByDate", on: :collection
  end
  resources :home, only: [:index]
  root to: "home#index"
end
