<template>
  <v-text-field
    ref="msg"
    label="Message..."
    outlined
    v-model="text"
    @click:append="send"
    @keydown.enter="send"
    append-icon="mdi-send-circle-outline"
    class="mt-5"
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
            type: 'normal',
            time: new Date().toString().slice(15, 24)
          },
          () => {
            this.text = '';
            document.querySelector('.msg').scrollTop = document.querySelector(
              '.msg'
            ).scrollHeight;
          }
        );
      }
    }
  }
};
</script>
<style>
.v-text-field__details {
  display: none;
}
</style>
