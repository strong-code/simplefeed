class FeedsController < ApplicationController

  def create
    feed = Feed.find_or_create(params[:feed][:url], current_user.id)

    if feed
      redirect_to user_url(current_user)
    else
      flash[:errors] = ["Unable to parse RSS/Atom feed from the supplied URL"]
      redirect_to user_url(current_user)
    end
  end

  def feed_params
    params.require(:feed).permit(:title, :url, :user_id)
  end
end
