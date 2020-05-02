<template>
  <v-app dark>
    <v-content dark v-if="render">
      <!-- Notification -->
      <v-snackbar
        :bottom="'top' === 'bottom'"
        color="success"
        :left="null === 'left'"
        :right="'right' === 'right'"
        :top="'top' === 'top'"
        vertical="vertical"
        :timeout="2000"
        v-model="snackbar"
      >
        {{ haveChoice.pseudo }} {{ $t('notification.text') }}
        <v-btn dark text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
      <v-snackbar
        :bottom="'top' === 'bottom'"
        color="success"
        :left="null === 'left'"
        :right="'right' === 'right'"
        :top="'top' === 'top'"
        vertical="vertical"
        :timeout="2000"
        v-model="snackbarClipboard"
      >
        {{ $t('notification.textClip') }}
        <v-btn dark text @click="snackbarClipboard = false">Close</v-btn>
      </v-snackbar>

      <!-- Pseudo-->
      <modal-view></modal-view>

      <!-- Game -->
      <v-container dark grid-list-md mx-auto>
        <v-layout row wrap>
          <!-- AWAIT -->
          <v-flex dark xs12 v-if="game.player.length === 1">
            <v-card class="grey darken-3" dark>
              <v-toolbar color="primary" flat>
                <v-toolbar-title>{{ $t('await.title') }}</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>

              <v-card-text primary-title color="grey" dark>
                <div style="margin:auto" color="grey" dark>
                  <div>
                    <v-avatar size="256px">
                      <!-- <img src="../assets/spinner.gif" /> -->
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        style="
                        margin: auto;
                        background: none;
                        display: block;
                        shape-rendering: auto;"
                        width="200px"
                        height="200px"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="xMidYMid"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="16.3004"
                          fill="none"
                          stroke="#0051a2"
                          stroke-width="1"
                        >
                          <animate
                            attributeName="r"
                            repeatCount="indefinite"
                            dur="1s"
                            values="0;21"
                            keyTimes="0;1"
                            keySplines="0 0.2 0.8 1"
                            calcMode="spline"
                            begin="-0.5s"
                          />
                          <animate
                            attributeName="opacity"
                            repeatCount="indefinite"
                            dur="1s"
                            values="1;0"
                            keyTimes="0;1"
                            keySplines="0.2 0 0.8 1"
                            calcMode="spline"
                            begin="-0.5s"
                          />
                        </circle>
                        <circle
                          cx="50"
                          cy="50"
                          r="5.41541"
                          fill="none"
                          stroke="#1b75be"
                          stroke-width="1"
                        >
                          <animate
                            attributeName="r"
                            repeatCount="indefinite"
                            dur="1s"
                            values="0;21"
                            keyTimes="0;1"
                            keySplines="0 0.2 0.8 1"
                            calcMode="spline"
                          />
                          <animate
                            attributeName="opacity"
                            repeatCount="indefinite"
                            dur="1s"
                            values="1;0"
                            keyTimes="0;1"
                            keySplines="0.2 0 0.8 1"
                            calcMode="spline"
                          />
                        </circle>
                      </svg>
                    </v-avatar>
                    <h4>{{ $t('await.title') }}</h4>
                  </div>

                  <hr />

                  <div class="text-xs-center">{{ $t('await.invite') }}</div>
                  <div class="text-xs-center">{{ $t('await.warning') }}</div>
                  <v-spacer></v-spacer>
                  <!-- eslint-disable -->
                  <div
                    class="bot d-flex flex xs12 sm10 justify-space-around align-center mt-10 mx-auto flex-wrap"
                  >
                    <div class="left d-flex flex flex-column xs12 sm6">
                      <div class="mt-3">
                        <v-tooltip top>
                          <!-- eslint-disable -->
                          <v-btn
                            slot="activator"
                            slot-scope="{ on }"
                            depressed
                            class="btn-copy-link white--text xs12"
                            :data-clipboard-text="sharedLink"
                            color="primary"
                            style="width:100%"
                            >{{ $t('await.clipboard.description') }}</v-btn
                          >
                          <!-- eslint-enable -->
                          <!-- <span>{{ $t('await.clipboard.description') }}</span> -->
                        </v-tooltip>
                      </div>
                      <div class="text-xs-center">
                        <p color="accent">{{ sharedLink }}</p>
                        <!-- <v-tooltip dark top>
                        <span>{{ $t('await.clipboard.description') }}</span>
                        </v-tooltip>-->
                      </div>
                    </div>
                    <div class="right d-flex flex flex-column xs12 sm6">
                      <qrcode-view dark :link="sharedLink"></qrcode-view>
                    </div>
                  </div>
                  <!-- eslint-enable -->
                </div>
              </v-card-text>
            </v-card>
          </v-flex>

          <!-- QRCode -->
          <!-- <v-flex dark xs12 v-if="game.player.length === 1">
            <qrcode-view dark :link="sharedLink"></qrcode-view>
          </v-flex>-->

          <!-- GAME -->
          <div class="flex xs12 sm8" style dark v-if="game.player.length === 2">
            <v-card
              class="flex d-flex flex-column grey darken-3 xs12 px-0 pt-0"
              dark
              style=" height:100%;"
            >
              <v-toolbar color="primary" dark style="max-height:64px">
                <v-toolbar-title>{{ $t('game.title') }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <!-- eslint-disable -->

                <v-btn
                  class="btn-copy-link white--text"
                  :data-clipboard-text="sharedLink"
                  color="accent"
                  style="text-transform:lowercase;"
                  >copy : {{ sharedLink }}</v-btn
                >
                <!-- eslint-enable -->
                <!-- <v-spacer></v-spacer> -->
              </v-toolbar>

              <!-- AWAIT/CONTINUE -->
              <div class="mt-5 mb-2 d-flex flex-column" v-if="!showAction">
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
                      <v-icon style="font-size: 7em" v-if="me.idPlayer == player.idPlayer">
                        {{ getIcon(myChoice) }}
                      </v-icon>
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
                    <v-btn
                      depressed
                      large
                      @click="setContinue()"
                      color="primary"
                      class="white--text"
                      >{{ $t('game.continue') }}</v-btn
                    >
                  </v-flex>
                </v-layout>
              </div>
              <!-- ACTION -->
              <div
                dark
                class="mt-5 mb-2 grey darken-3 d-flex flex-column justify-space-between"
                v-if="showAction && checkPlayer"
              >
                <h2 class="mb-5">{{ $t('game.action.title') }}</h2>
                <div class="btn" d-flex xs6 align-end>
                  <v-btn
                    large
                    depressed
                    color="info"
                    class="white--text ms-5"
                    @click="setChoice(0)"
                  >
                    {{ $t('game.action.rock') }}
                    <v-icon right dark>far fa-hand-rock</v-icon>
                  </v-btn>

                  <v-btn
                    large
                    depressed
                    color="info"
                    class="white--text ms-5"
                    @click="setChoice(1)"
                  >
                    {{ $t('game.action.paper') }}
                    <v-icon right dark>far fa-hand-paper</v-icon>
                  </v-btn>

                  <v-btn
                    large
                    depressed
                    color="info"
                    class="white--text ms-5"
                    @click="setChoice(2)"
                  >
                    {{ $t('game.action.scissors') }}
                    <v-icon right dark>far fa-hand-scissors</v-icon>
                  </v-btn>
                </div>
              </div>
              <div v-else>
                <h3>{{ $t('game.viewerWaiting') }}</h3>
              </div>
            </v-card>
          </div>
          <!-- <v-spacer></v-spacer> -->
          <!-- BOTTOM -->
          <div dark class="flex d-flex flex-column xs12 sm4" v-if="game.player.length === 2">
            <v-card
              class="flex d-flex flex-column grey darken-3 px-0 pt-0"
              dark
              style=" height:100%;"
            >
              <v-toolbar color="primary" style="max-height:64px">
                <v-toolbar-title>{{ $t('stats.score') }}</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <div class="mt-5 mb-2 grey darken-3" style="flex:1">
                <div
                  class="grey darken-3 d-flex flex-column justify-center"
                  style="height:100%"
                  dark
                  two-line
                  subheader
                >
                  <p
                    v-for="(player, index) in game.player"
                    :key="index"
                    style="text-align: left"
                    class="px-5"
                  >
                    {{ player.pseudo }} : {{ player.point }}
                  </p>
                </div>
              </div>
            </v-card>
          </div>

          <v-flex xs12 v-if="game.player.length === 2" class="justify-space-between pb-5 pt-5">
            <v-card
              class="d-flex flex-column grey darken-3"
              style="overflow:hidden"
              minHeight="300"
              maxHeight="600"
              dark
            >
              <v-toolbar color="primary" flat>
                <v-toolbar-title>{{ $t('stats.allparty') }}</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <div class="d-flex flex-column pb-3 pt-3 pr-5 pl-5" style="overflow: auto;">
                <div class="msg mb-0" style="overflow: auto;">
                  <Message
                    v-for="(message, index) in game.message"
                    :key="`message-${index}`"
                    :name="message.user.pseudo"
                    :text="message.text"
                    :time="message.time"
                    :owner="message.user.idPlayer === me.idPlayer"
                    :type="message.type"
                  />
                </div>
                <ChatForm :user="me" />
              </div>
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
          <a
            @click="this.$ga.event('github', 'link', local, 41)"
            href="https://github.com/fabien-kerinec"
            ><strong>fabien</strong></a
          >
          - Fabien KERINEC
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
import modalView from '../components/dialog.vue';
import ChatForm from '../components/ChatForm.vue';
import Message from '../components/Message.vue';
/* Copy link */
const clip = new clipboard('.btn-copy-link');

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
  components: {
    qrcodeView,
    modalView,
    ChatForm,
    Message
  },
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
      this.$socket.emit('join', {
        session: window.location.pathname.split('/')[1]
      });
    }
    clip.on('success', () => {
      // console.log('succs');
      this.snackbarClipboard = true;
    });
    /* Animation */
    funcChangeIcon();
    this.$ga.page('/');
  },
  data() {
    return {
      render: false,
      me: {},
      game: {},
      stats: {},
      results: {},
      myChoice: 3,
      showAction: true,
      haveChoice: {},
      snackbar: false,
      snackbarClipboard: false,
      blinkIcon: '',
      player: false,
      qrcode: null
    };
  },
  methods: {
    setChoice(choice) {
      let value;
      this.$socket.emit('choice', { choice });
      this.myChoice = choice;
      this.showAction = false;
      switch (choice) {
        case 0:
          value = 'pierre';
          break;
        case 1:
          value = 'feuille';
          break;
        case 2:
          value = 'ciseaux';
          break;
        default:
          value = 'default';
          break;
      }
      this.$ga.event('GameAction', 'action', value, 123);
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

    // clickClip() {
    //   console.log('test');
    // }
  },
  computed: {
    sharedLink() {
      return `${window.location.protocol}//${window.location.hostname}${
        window.location.port ? `:${window.location.port}` : ''
      }/${this.game.session}`;
    },
    locale() {
      return this.$i18n.locale;
    },
    checkPlayer() {
      let value = false;
      if (!this.game.player) {
        // console.log('ok');
        return false;
      }

      this.game.player.forEach((item) => {
        // console.log(this);
        if (item.idPlayer === this.me.idPlayer) {
          console.log('yes');
          value = true;
        }
      });

      return value;
    }
  },
  sockets: {
    connected(data) {
      this.game = data;
      this.render = true;
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
<style>
a {
  text-decoration: none;
  color: inherit !important;
}
a:visited {
  color: inherit !important;
}
</style>
