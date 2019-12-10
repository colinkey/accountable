class Account < ApplicationRecord
  belongs_to :user
  has_many :activities

  attr_accessor :balance

end
