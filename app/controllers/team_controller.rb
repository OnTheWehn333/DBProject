class TeamController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def index
    teams = Team.all.to_a
    if teams.empty?
      render json: { "HasError" => true, "Message" => "teams are empty" }
    else
      render json: { "HasError" => false, "Teams" => teams }
    end
  end

  def show
  end

  def create
    begin
      name = params[:name]
      nickname = params[:nickname]
      rank = params[:rank]

      team = Team.new
      team.name = name
      team.nickname = nickname
      team.rank = rank.to_i

      if team.save!
        render json: { "HasError" => false, "Message" => "Saved team" }
      else
        return
        render json: { "HasError" => true, "Message" => "Couldn't save team" }
      end
    rescue => exception
      render json: { "HasError" => true, "Message" => "Crashed" }
    end
  end
end
