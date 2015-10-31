Rails.application.routes.draw do
  resources :shops, only: [:index, :show]

  get 'search_shops', to: 'application#search_shops'
  get 'about', to: 'visitors#about'
  root to: 'visitors#index'
end
