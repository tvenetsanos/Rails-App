Rails.application.routes.draw do

  post '/reviews', to: "reviews#create"
  put '/reviews', to: "reviews#update"
  delete '/reviews', to: "reviews#delete"
  get '/reviews', to: "reviews#get"
  post '/login', to: 'sessions#login'
  post '/logout', to: 'sessions#logout'
  get '/check_session', to: 'sessions#get_session'
  post '/signup', to: "sessions#signup"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
