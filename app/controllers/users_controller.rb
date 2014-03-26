class UsersController < ApplicationController

  def new
    @user = User.new()
    render :new
  end

  def index
    if logged_in?
      respond_to do |format|
        #format.html { redirect_to user_url(current_user) }
        format.json { render :json => current_user.to_json(:only => [:username, :id]) }
      end
    else
      redirect_to "/"
    end
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      redirect_to user_url(@user)
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def show
    if !logged_in?
      flash[:errors] = ["You must be logged in to view that!"]
      redirect_to "/"
    else
      @user = current_user
      @feeds = @user.feeds
      @feeds.each { |f| f.reload }

      respond_to do |format|
        format.html { render :feed_loading_page }
        format.json { render :json => @user.as_json}
      end
    end

  end

  def update
    #
  end

  def destroy
    #
  end

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
