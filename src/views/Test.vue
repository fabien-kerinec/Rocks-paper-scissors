<template>
  <div class="container">
    <h1>salut</h1>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data() {
    return {
      me: {}
    };
  },
  sockets: {
    yourID(data) {
      this.me = data;
    }
  }
};
</script>

<style></style>
