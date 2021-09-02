# app/controllers/application_controller.rb
class ApplicationController < ActionController::API
    include ActionController::Cookies    
    def isLoggedIn?
        if session[:user_id]
            return true
        end
        return false
    end
end 
