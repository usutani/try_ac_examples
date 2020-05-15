class CommentRelayJob < ApplicationJob
  queue_as :default

  def perform(comment)
    html_string = CommentsController.render(
      partial: 'comments/comment',
      locals: { comment: comment }
    )
    ActionCable.server.broadcast(
      "messages:#{comment.message_id}:comments",
      comment: html_string
    )
  end
end
