Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/app', to: 'app#index'

  post '/accounts', to: 'accounts#create'
  get '/accounts', to: 'accounts#list'
  delete '/accounts/:id', to: 'accounts#destroy'

  get '/user', to: 'users#show'
end
