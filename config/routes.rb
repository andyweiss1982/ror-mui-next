Rails.application.routes.draw do
  resource :dashboard, only: [:show]
  root 'dashboard#show'
end
