class CommentRelayJob < ApplicationJob
  include CableReady::Broadcaster
  queue_as :default

  def perform(comment)
    html_comment = CommentsController.render comment
    channel_name = "messages:#{comment.message_id}:comments"
    cable_ready[channel_name].insert_adjacent_html(
      selector: '#comments',
      html: html_comment
    )
    cable_ready.broadcast
  end
end
