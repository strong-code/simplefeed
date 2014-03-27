class EntriesController < ApplicationController

  def update
    entry = Entry.find_by_link(entry_params[:link])
    entry.read = true

    if entry.save
      render :json => entry.to_json
    else
      flash[:errors] = entry.errors.full_messages
      #respond with some json error
    end
  end

  private
  def entry_params
    params.require(:entry).permit(:link)
  end

end
