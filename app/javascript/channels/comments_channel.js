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
    // Called when there's incoming data on the websocket for this channel
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
});
