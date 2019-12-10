class Activity < ApplicationRecord
  belongs_to :activity_category
  belongs_to :account
end
