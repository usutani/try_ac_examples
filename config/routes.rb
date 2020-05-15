Rails.application.routes.draw do
  resource :session, only: %i[new create]
  resources :examples, only: :index

  root 'examples#index'
end
