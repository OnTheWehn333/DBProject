class CreateGames < ActiveRecord::Migration[6.1]
  def change
    create_table :games do |t|
      t.integer :rank1, null: false
      t.integer :rank2, null: false
      t.string :location, null: false
      t.datetime :date, null: false
      t.timestamps
    end
  end
end
