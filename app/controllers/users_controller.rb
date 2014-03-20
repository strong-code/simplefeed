class UsersController < ApplicationController

  def new
    @user = User.new()
    render :new
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
      #t @feeds.each { |f| f.clean_for_rendering }
      render :show
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
