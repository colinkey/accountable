class AppController < ApplicationController

  # Load static data for app
  def index
    activity_categories = ActivityCategory.all

    render json: { activityCategories: activity_categories }
  end

end
