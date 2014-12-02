class AnswersController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => :create

  def create
    @answer = Answer.new(:answer => request.body.read)
    @answer.save
    head :created
  end

  def index
    @answers = Answer.all
  end
end
