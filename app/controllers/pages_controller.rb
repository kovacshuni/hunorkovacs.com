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

  def githelp
    render(:content_type => 'text/plain', :file => "app/views/pages/githelp.txt")
  end

end
