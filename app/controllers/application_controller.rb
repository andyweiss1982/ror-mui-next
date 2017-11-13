class ApplicationController < ActionController::Base
  respond_to :html, :js, if: :devise_controller?
  protect_from_forgery with: :exception
  before_action :authenticate_user!
end
