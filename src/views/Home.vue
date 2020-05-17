<template>
  <v-app>
    <v-container grid-list-md dark class="fill-height fill-width justify-center" fluid>
      <modal-view></modal-view>
    </v-container>
    <v-footer height="auto" class="grey darken-3">
      <v-layout row wrap justify-center>
        <v-flex xs12 py-3 text-xs-center white--text>
          &copy;2020 —
          <a
            @click="this.$ga.event('github', 'link', local, 41)"
            href="https://github.com/fabien-kerinec"
          >
            <strong>fabien</strong>
          </a>
          - Fabien KERINEC
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import modalView from '../components/dialog.vue';

export default {
  name: 'Home',
  components: {
    modalView
  },
  computed: {
    ...mapState(['userName', 'roomName'])
  },
  mounted() {
    this.$ga.page('/home');
  }
};
</script>

<style></style>
