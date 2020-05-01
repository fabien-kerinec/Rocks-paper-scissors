<template>
  <v-text-field
    ref="msg"
    label="Message..."
    outlined
    v-model="text"
    @click:append="send"
    @keydown.enter="send"
    append-icon="mdi-send-circle-outline"
  />
</template>

<script>
export default {
  data() {
    return {
      text: ''
    };
  },
  props: {
    user: Object
  },
  methods: {
    send() {
      if (this.text.length) {
        this.$socket.emit(
          'createMessage',
          {
            text: this.text,
            user: this.user,
            type: 'normal'
          },
          () => {
            this.text = '';
          }
        );
      }
    }
  }
};
</script>
