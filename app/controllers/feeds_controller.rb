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

  def update
    feed = current_user.feeds.find_by_id(params[:id])
    feed.reload
    redirect_to user_url(current_user)
  end

  def destroy
    feed = current_user.feeds.find_by_id(params[:id]);
    feed.destroy();
    @user = current_user
    @feeds = @user.feeds
    @feeds.each { |f| f.reload }
    redirect_to user_url(@user)
  end

  def feed_params
    params.require(:feed).permit(:title, :url, :user_id)
  end
end
