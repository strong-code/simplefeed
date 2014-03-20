SimpleFeed::Application.routes.draw do
  root to: "sessions#new"
  resources :users do
    resources :feeds
  end
  resource :session
end
