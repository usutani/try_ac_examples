class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :message

  after_commit do
    comment = CommentsController.render(
      partial: 'comments/comment',
      locals: { comment: self }
    )
    ActionCable.server.broadcast(
      "messages:#{message_id}:comments",
      comment: comment
    )
  end
end
