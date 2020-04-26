<template>
  <v-app>
    <v-content>
      <!-- Notification -->
      <v-snackbar :timeout="2000" color="info" :bottom="true" v-model="snackbar"
        >{{ haveChoice.pseudo }} {{ $t('notification.text') }}</v-snackbar
      >

      <!-- Pseudo-->
      <dialog-view></dialog-view>

      <!-- Game -->
      <v-container grid-list-md mx-auto>
        <v-layout row wrap>
          <!-- AWAIT -->
          <v-flex xs12 v-if="game.player.length == 1">
            <v-card>
              <v-toolbar color="primary" flat>
                <v-toolbar-title>{{ $t('await.title') }}</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>

              <v-card-text primary-title>
                <div style="margin:auto">
                  <div>
                    <v-avatar size="128px">
                      <img src="../assets/spinner.gif" />
                    </v-avatar>
                    <h4>{{ $t('await.title') }}</h4>
                  </div>

                  <hr />

                  <div class="text-xs-center">{{ $t('await.invite') }}</div>
                  <div class="text-xs-center">{{ $t('await.warning') }}</div>
                  <div class="text-xs-center">
                    <v-tooltip top>
                      <v-btn
                        slot="activator"
                        depressed
                        class="btn-copy-link"
                        :data-clipboard-text="sharedLink"
                        color="accent"
                        >{{ game.session }}</v-btn
                      >
                      <span>{{ $t('await.clipboard.description') }}</span>
                    </v-tooltip>
                  </div>

                  <div class="mt-3">
                    <v-tooltip top>
                      <v-btn
                        slot="activator"
                        depressed
                        class="btn-copy-link white--text"
                        :data-clipboard-text="sharedLink"
                        color="primary"
                        >{{ $t('await.clipboard.title') }}</v-btn
                      >
                      <span>{{ $t('await.clipboard.description') }}</span>
                    </v-tooltip>
                  </div>
                </div>
              </v-card-text>
              <p></p>
            </v-card>
          </v-flex>

          <!-- QRCode -->
          <v-flex xs12 v-if="game.player.length == 1">
            <qrcode-view :link="sharedLink"></qrcode-view>
          </v-flex>

          <!-- GAME -->
          <v-flex xs12 v-if="game.player.length == 2">
            <v-card>
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>{{ $t('game.title') }}</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>

              <!-- AWAIT/CONTINUE -->
              <div class="mt-5 mb-2" v-if="!showAction">
                <h3 v-if="!results.win">{{ $t('game.waiting') }}</h3>
                <v-layout row wrap>
                  <v-flex xs6 v-for="player in results.player" v-bind:key="player.idPlayer">
                    <div v-if="results.win">
                      <h3>
                        {{ player.pseudo }}
                        <v-chip
                          color="primary"
                          text-color="white"
                          v-if="me.idPlayer == player.idPlayer"
                          >{{ $t('game.me') }}</v-chip
                        >
                      </h3>
                      <v-icon style="font-size: 7em">{{ getIcon(player.choice) }}</v-icon>
                    </div>
                  </v-flex>

                  <v-flex xs6 v-for="player in game.player" v-bind:key="player.idPlayer">
                    <div v-if="!results.win">
                      <h3>
                        {{ player.pseudo }}
                        <v-chip
                          color="primary"
                          text-color="white"
                          v-if="me.idPlayer == player.idPlayer"
                          >{{ $t('game.me') }}</v-chip
                        >
                      </h3>
                      <v-icon style="font-size: 7em" v-if="me.idPlayer == player.idPlayer">{{
                        getIcon(myChoice)
                      }}</v-icon>
                      <v-icon style="font-size: 7em" v-else>{{ blinkIcon }}</v-icon>
                    </div>
                  </v-flex>

                  <v-flex xs12 class="mt-5" v-if="results.win">
                    <h1>
                      <v-icon>fas fa-trophy</v-icon>
                      {{ results.win[locale] }}
                      <v-icon>fas fa-trophy</v-icon>
                    </h1>
                    <h2>{{ results.result[locale] }}</h2>
                    <v-btn depressed large @click="setContinue()">{{ $t('game.continue') }}</v-btn>
                  </v-flex>
                </v-layout>
              </div>

              <!-- ACTION -->
              <div class="pb-3 pt-3" v-if="showAction">
                <h2 class="mb-2">{{ $t('game.action.title') }}</h2>

                <v-btn
                  mt-2
                  ml-2
                  large
                  depressed
                  color="info"
                  class="white--text"
                  @click="setChoice(0)"
                >
                  {{ $t('game.action.rock') }}
                  <v-icon right dark>far fa-hand-rock</v-icon>
                </v-btn>

                <v-btn
                  mt-2
                  ml-2
                  large
                  depressed
                  color="info"
                  class="white--text"
                  @click="setChoice(1)"
                >
                  {{ $t('game.action.paper') }}
                  <v-icon right dark>far fa-hand-paper</v-icon>
                </v-btn>

                <v-btn
                  mt-2
                  ml-2
                  large
                  depressed
                  color="info"
                  class="white--text"
                  @click="setChoice(2)"
                >
                  {{ $t('game.action.scissors') }}
                  <v-icon right dark>far fa-hand-scissors</v-icon>
                </v-btn>
              </div>
            </v-card>
          </v-flex>

          <!-- BOTTOM -->
          <v-flex xs12 sm6 v-if="game.player.length >= 2">
            <v-card color="primary">
              <v-toolbar color="primary" flat>
                <v-toolbar-title>{{ $t('stats.score') }}</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-list two-line subheader>
                <v-list-item v-for="player in game.player" v-bind:key="player.idPlayer">
                  <v-list-item-avatar>
                    <v-icon class="grey lighten-1 white--text">star</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-i-title>{{ player.pseudo }}</v-list-i-title>
                    <v-list-item-sub-title>{{ player.point }}</v-list-item-sub-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-flex>

          <v-flex sm6 v-if="game.player.length >= 2">
            <v-card color="primary">
              <v-toolbar color="primary" flat>
                <v-toolbar-title>{{ $t('stats.allparty') }}</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-list two-line subheader>
                <v-list-item>
                  <!-- <v-list-item-avatar>
                    <v-icon class="grey lighten-1 white--text">group</v-icon>
                  </v-list-item-avatar> -->
                  <v-list-item-content>
                    <v-list-item-title>{{ $t('stats.text') }}</v-list-item-title>
                    <!-- <v-list-item-sub-title>{{ $t('stats.online') }}</v-list-item-sub-title> -->
                  </v-list-item-content>
                </v-list-item>
                <!-- <v-list-item>
                  <v-list-item-avatar>
                    <v-icon class="grey lighten-1 white--text">games</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{ stats.party || 0 }}</v-list-item-title>
                    <v-list-item-sub-title>{{ $t('stats.party') }}</v-list-item-sub-title>
                  </v-list-item-content>
                </v-list-item> -->
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <!-- Footer -->
    <v-footer height="auto" class="grey darken-3">
      <v-layout row wrap justify-center>
        <v-flex xs12 py-3 text-xs-center white--text>
          &copy;2020 —
          <strong>fabien</strong> - Fabien KERINEC
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import clipboard from 'clipboard';
// import qrious from 'qrious';

/* Components */
import qrcodeView from '../components/qrcode.vue';
import dialogView from '../components/dialog.vue';

/* Copy link */
new clipboard('.btn-copy-link');

/* Icons */
let blinkIconAnimation = 0;
const blinkIconArray = [
  'far fa-hand-rock',
  'far fa-hand-paper',
  'far fa-hand-scissors',
  'fas fa-question'
];

/* VueJS */
export default {
  components: { qrcodeView, dialogView },
  mounted() {
    /* Join session */
    const self = this;
    const funcChangeIcon = function() {
      if (blinkIconAnimation >= blinkIconArray.length - 1) {
        blinkIconAnimation = 0;
      } else {
        blinkIconAnimation++;
      }
      self.blinkIcon = blinkIconArray[blinkIconAnimation];
      setTimeout(() => {
        funcChangeIcon();
      }, 200);
    };
    // const joinSessionElement = document.getElementById('join-session-id');
    if (window.location.pathname.split('/')[1]) {
      this.$socket.emit('join', { session: window.location.pathname.split('/')[1] });
    }

    /* Animation */
    funcChangeIcon();
  },
  data() {
    return {
      me: {},
      game: {},
      stats: {},
      results: {},

      myChoice: 3,
      showAction: true,
      haveChoice: {},
      snackbar: false,
      blinkIcon: '',

      qrcode: null
    };
  },
  methods: {
    setChoice(choice) {
      this.$socket.emit('choice', { choice });
      this.myChoice = choice;
      this.showAction = false;
    },
    setContinue() {
      this.myChoice = 3;
      this.results = {};
      this.showAction = true;
    },
    getIcon(choice) {
      const icon = [
        'far fa-hand-rock',
        'far fa-hand-paper',
        'far fa-hand-scissors',
        'fas fa-question'
      ];
      return icon[choice];
    }
  },
  computed: {
    sharedLink() {
      return `${window.location.protocol}//${window.location.hostname}${
        window.location.port ? `:${window.location.port}` : ''
      }/${this.game.session}`;
    },
    locale() {
      return this.$i18n.locale;
    }
  },
  sockets: {
    connected(data) {
      this.game = data;
    },
    yourID(data) {
      this.me = data;
    },
    stats(data) {
      this.stats = data;
    },
    haveChoice(data) {
      this.haveChoice = data;
      this.snackbar = true;
    },
    results(data) {
      this.results = data;
      this.showContinue = true;
    }
  }
};
</script>
