class GameController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def index
    games = Game.all.to_a
    render json: { "Games" => games }
  end

  def create
    begin
      rank1 = params[:rank1]
      rank2 = params[:rank2]
      location = params[:location]
      date = params[:date]

      game = Game.new
      game.rank1 = rank1
      game.rank2 = rank2
      game.location = location
      game.date = Date.parse(date)

      if game.save
        render json: { "HasError" => false, "Message" => "Saved game" }
      else
        render json: { "HasError" => true, "Message" => "Couldn't save game" }
      end
    rescue => exception
      render json: { "HasError" => true, "Message" => "Crash" }
    end
  end
end
