class FeedsController < ApplicationController

  def index
    @user = current_user
    @user.feeds.each { |f| f.reload }

    respond_to do |format|
      format.html { redirect_to user_url(@user) }
      format.json { render :json => @user.feeds.to_json(methods: :get_unread_entry_count, include: :entries) }
    end
  end

  def create
    @user = current_user
    feed = Feed.find_or_create(params[:url], @user.id)

    if feed
      #feed.reload
      respond_to do |format|
        format.html { redirect_to user_url(@user) }
        format.json { render :json => feed.to_json(methods: :get_unread_entry_count, include: :entries) }
      end
    else
      flash[:errors] = ["Unable to parse RSS/Atom feed from the supplied URL"]
      redirect_to user_url(@user)
    end
  end

  def update
    user = current_user
    feed = user.feeds.find_by_id(params[:id])
    feed.reload
    redirect_to user_url(user)
  end

  def show
    user = current_user
    feed = user.feeds.find_by_id(params[:id])
    feed.reload
    render :json => feed.to_json(methods: :get_unread_entry_count, include: :entries)
  end

  def destroy
    feed = current_user.feeds.find_by_id(params[:id]);
    feed.destroy();
    @user = current_user
    @feeds = @user.feeds
    respond_to do |format|
      format.html { redirect_to user_url(@user) }
      format.json { render :json => @feed.to_json(methods: :get_unread_entry_count, include: :entries) }
    end
  end

  def feed_params
    params.require(:feed).permit(:title, :url, :user_id)
  end
end
