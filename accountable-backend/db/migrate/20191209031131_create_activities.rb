class CreateActivities < ActiveRecord::Migration[5.2]
  def change
    create_table :activities do |t|
      t.string :memo
      t.references :activity_category, foreign_key: true
      t.references :account, foreign_key: true
      t.integer :amount

      t.timestamps
    end
  end
end
