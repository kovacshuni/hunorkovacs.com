class PagesController < ActionController::Base

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def home
  end

  def resume
  end

  def technical
  end

  def video
  end

  #def :'Who-Am-I-Comics'
  #  render :file => "/resume.html"
  #end
end
