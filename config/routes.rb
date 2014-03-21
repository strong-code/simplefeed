SimpleFeed::Application.routes.draw do
  root to: "sessions#new"
  resources :users
  resources :feeds
  resource :session
end
