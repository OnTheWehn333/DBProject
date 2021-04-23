class CreateResults < ActiveRecord::Migration[6.1]
  def change
    create_table :results do |t|
      t.belongs_to :game, null: false
      t.integer :team1, null: false
      t.integer :team2, null: false
      t.integer :team1_score, null: false
      t.integer :team2_score, null: false
      t.timestamps
    end
  end
end
