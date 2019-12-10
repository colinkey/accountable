class AccountsController < ApplicationController
  before_action :authenticate_user!

  def show
    @account = Account.find(params[:id])

    render json: @account
  end

  def create
    @account = Account.create(account_params)

    render json: @account
  end

  def list
    @accounts = Account.where(user_id: current_user.id)

    sum = 0
    @accounts.each do |account|
      
      account.activities.each do |activity|
        sum += activity.amount
      end

      account.balance = sum
    end

    render json: @accounts.to_json(:methods => [:balance])
  end

  def destroy
    Account.destroy(params[:id])

    head :ok
  end

  private
    def account_params
      params.require(:account).permit(:id, :name, :description).merge({user_id: current_user.id})
    end
end
