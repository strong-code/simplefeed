class FeedsController < ApplicationController

  def index
    @user = current_user
    @user.feeds.each { |f| f.reload(@user.id) }
    # @user.feeds.to_json(include: :entries, methods: :get_unread_entry_count) }
    respond_to do |format|
      format.html { redirect_to user_url(@user) }
      format.json { render :json => @user.feeds.to_json(methods: :get_unread_entry_count, include: :entries) }
    end
  end

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
    user = current_user
    feed = user.feeds.find_by_id(params[:id])
    feed.reload(user.id)
    redirect_to user_url(user)
  end

  def destroy
    feed = current_user.feeds.find_by_id(params[:id]);
    feed.destroy();
    @user = current_user
    @feeds = @user.feeds
    redirect_to user_url(@user)
  end

  def feed_params
    params.require(:feed).permit(:title, :url, :user_id)
  end
end
