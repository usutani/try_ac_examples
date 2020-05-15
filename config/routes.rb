Rails.application.routes.draw do
  get 'examples/index'
  resource :session, only: %i[new create]
end
