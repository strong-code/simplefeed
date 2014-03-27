SimpleFeed::Application.routes.draw do
  root to: "sessions#new"
  resources :users
  resources :feeds do
    resources :entries, only: [:update, :destroy]
  end
  resource :session
end
