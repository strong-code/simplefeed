module ApplicationHelper

  def csrf_token
    "<input name=\"authenticity_token\" type=\"hidden\" value=\"#{form_authenticity_token}\">".html_safe
  end
end
