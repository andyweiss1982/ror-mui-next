Rails.application.routes.draw do
  devise_for :users
  devise_scope :user do
    authenticated :user do
      resource :dashboard, only: [:show]
      root 'dashboard#show'
    end
    unauthenticated do
      root 'devise/sessions#new'
      get '*path', to: 'devise/sessions#new'
    end
  end
end
