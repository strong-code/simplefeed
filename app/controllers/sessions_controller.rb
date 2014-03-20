class SessionsController < ApplicationController

  def new
    @user = User.new
    if logged_in?
      redirect_to user_url(current_user)
    else
      render :new
    end
  end

  def create
    @user = User.find_by_credentials(user_params)
    puts "--------------------"
    p @user
    puts "--------------------"

    if @user
      login!(@user)
      redirect_to user_url(@user)
    else
      flash.now[:errors] = ['username and password do not match!']
      @user = User.new
      render :new
    end
  end

  def destroy
    logout!
    redirect_to "/"
  end

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
