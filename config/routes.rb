SimpleFeed::Application.routes.draw do
  root to: "sessions#new"
  resources :users
  resource :session
end
