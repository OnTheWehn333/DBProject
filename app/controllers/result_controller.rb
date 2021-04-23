class ResultController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def getByTeamId
    begin
      id = params[:id]
      team = Team.find(id)
      results = Result.where(team1: id).or(Result.where(team2: id)).all.to_a
      resultsArray = Array.new
      hash = Hash.new
      results.each do |result|
        hash = { "Game" => result.game, "Result" => result, "Team1" => Team.find(result.team1), "Team2" => Team.find(result.team2) }
        resultsArray << hash
      end

      if resultsArray.empty?
        render json: { "HasError" => true, "Message" => "Results are empty for teamid #{id}" }
      else
        render json: { "HasError" => false, "Results" => resultsArray, "Team" => team }
      end
    rescue => exception
      render json: { "HasError" => true, "Message" => "Crash" }
    end
  end

  def getByDate
    begin
      date = params[:date]
      date = Date.parse(date)
      games = Game.where(date: date).all.to_a
      resultsArray = Array.new
      games.each do |game|
        result = Result.find_by(game: game)
        if result.nil?
          render json: { "HasError" => true, "Message" => "Couldn't find result for game #{game.id}" }
          return
        end
        hash = { "Game" => game, "Result" => result, "Team1" => Team.find(result.team1), "Team2" => Team.find(result.team2) }
        resultsArray << hash
      end
      if resultsArray.empty?
        render json: { "HasError" => true, "Message" => "There are no games for date: #{date}" }
      else
        render json: { "HasError" => false, "Results" => resultsArray }
      end
    rescue => exception
      render json: { "HasError" => true, "Message" => "Crash" }
    end
  end

  def create
    begin
      game = params[:game]
      team1 = params[:team1]
      team2 = params[:team2]
      team1_score = params[:score1]
      team2_score = params[:score2]

      result = Result.new
      result.game = Game.find(game)
      result.team1 = Team.find(team1).id
      result.team2 = Team.find(team2).id
      result.team1_score = team1_score.to_i
      result.team2_score = team2_score.to_i

      if result.save
        render json: { "HasError" => false, "Message" => "Saved result" }
      else
        render json: { "HasError" => true, "Message" => "Couldn't save result" }
      end
    rescue => exception
      render json: { "HasError" => true, "Message" => "Crashed" }
    end
  end
end
