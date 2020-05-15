Rails.application.routes.draw do
  resource :session, only: %i[new create destroy]
  resources :examples, only: :index

  root 'examples#index'
end
