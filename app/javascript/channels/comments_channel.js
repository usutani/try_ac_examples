import consumer from "./consumer"

consumer.subscriptions.create("CommentsChannel", {
  connected() {
    // FIXME: While we wait for cable subscriptions to always be finalized before sending messages
    setTimeout(() => {
      this.followCurrentMessage()
      this.installPageChangeCallback()
    }, 1000)
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    const collection = this.collection()
    if (!collection) {
      return
    }
    const comment = data.comment
    if (this.userIsCurrentUser(comment)) {
      return
    }
    collection.insertAdjacentHTML('beforeend', comment)
  },

  collection() {
    return document.querySelector('[data-channel~=comments]')
  },

  messageId() {
    const collection = this.collection()
    if (collection) {
      return collection.getAttribute('data-message-id')
    }
    return null
  },

  followCurrentMessage() {
    const messageId = this.messageId()
    if (messageId) {
      this.perform('follow', { message_id: messageId })
    } else {
      this.perform('unfollow')
    }
  },

  installPageChangeCallback() {
    if (!this.installedPageChangeCallback) {
      this.installedPageChangeCallback = true
      document.addEventListener('turbolinks:load', event => {
        this.followCurrentMessage()
      })
    }
  },

  userIsCurrentUser(commentHtmlString) {
    const comment = this.createElementFromHtmlString(commentHtmlString)
    const commentUserId = comment.getAttribute('data-user-id')
    return commentUserId === this.currentUserId()
  },

  createElementFromHtmlString(htmlString) {
    const div = document.createElement('div')
    div.innerHTML = htmlString
    return div.firstElementChild
  },

  currentUserId() {
    return document.getElementsByName('current-user')[0].getAttribute('id')
  },
});
