class AnswersController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => :create

  def create
    answer_candidate = request.body.read
    if answer_candidate.nil? || answer_candidate.empty?
      head :bad_request
    else
      @answer = Answer.new(:answer => answer_candidate)
      @answer.save
      head :created, :content_type => 'text/plain'
    end
  end

  def index
    @answers = Answer.all
  end
end
