class HomeController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:index]

  def index
    render(component: "Home")
  end
end
