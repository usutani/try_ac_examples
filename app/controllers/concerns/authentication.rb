module Authentication
  extend ActiveSupport::Concern

  private
    def authenticate_user(user_id)
      if authenticated_user = User.find_by(id: user_id)
        cookies.encrypted[:user_id] ||= user_id
        @current_user = authenticated_user
      end
    end
 end
