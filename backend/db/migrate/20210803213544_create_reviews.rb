class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.string :restaurant
      t.string :rating
      t.string :likes
      t.string :dislikes
      t.integer :user_id

      t.timestamps
    end
  end
end
