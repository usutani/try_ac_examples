Rails.application.routes.draw do
  resource :session, only: %i[new create destroy]
  resources :examples, only: :index

  resources :messages, only: %i[index show] do
    resources :comments, only: :create
  end

  root 'examples#index'
end
