<template>
  <v-app dark>
    <v-content dark v-if="render">
      <!-- Notification -->
      <v-snackbar
        :timeout="2000"
        color="info"
        :bottom="true"
        v-model="snackbar"
      >{{ haveChoice.pseudo }} {{ $t('notification.text') }}</v-snackbar>
      <v-snackbar
        :timeout="2000"
        color="info"
        :bottom="true"
        v-model="snackbarClipboard"
      >{{ $t('notification.textClip') }}</v-snackbar>

      <!-- Pseudo-->
      <modal-view></modal-view>

      <!-- Game -->
      <v-container dark grid-list-md mx-auto>
        <v-layout row wrap>
          <!-- AWAIT -->
          <v-flex dark xs12 v-if="game.player.length === 1">
            <v-card dark>
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>{{ $t('await.title') }}</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>

              <v-card-text primary-title>
                <div style="margin:auto">
                  <div>
                    <v-avatar size="128px">
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

                  <div class="mt-3">
                    <v-tooltip top>
                      <!-- eslint-disable -->
                      <v-btn
                        slot="activator"
                        slot-scope="{ on }"
                        depressed
                        class="btn-copy-link white--text"
                        :data-clipboard-text="sharedLink"
                        color="primary"
                      >{{ $t('await.clipboard.description') }}</v-btn>
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
              </v-card-text>
              <p></p>
            </v-card>
          </v-flex>

          <!-- QRCode -->
          <v-flex dark xs12 v-if="game.player.length === 1">
            <qrcode-view dark :link="sharedLink"></qrcode-view>
          </v-flex>

          <!-- GAME -->
          <v-flex dark xs12 sm10 v-if="game.player.length === 2">
            <v-card dark style="height:100%; display:flex; flex-direction:column; " d-flex>
              <v-toolbar color="primary" style="flex: initial" dark flat>
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
                        >{{ $t('game.me') }}</v-chip>
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
                        >{{ $t('game.me') }}</v-chip>
                      </h3>
                      <v-icon style="font-size: 7em" v-if="me.idPlayer == player.idPlayer">
                        {{
                        getIcon(myChoice)
                        }}
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
                    >{{ $t('game.continue') }}</v-btn>
                  </v-flex>
                </v-layout>
              </div>
              <!-- ACTION -->
              <v-flex
                class="pb-3 pt-3"
                v-if="showAction && checkPlayer"
                d-flex
                flex-column
                justify-space-between
              >
                <h2 class="mb-2">{{ $t('game.action.title') }}</h2>
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
              </v-flex>
              <div v-else>
                <h3>{{ $t('game.viewerWaiting') }}</h3>
              </div>
            </v-card>
          </v-flex>

          <!-- BOTTOM -->
          <v-flex dark xs12 sm2 v-if="game.player.length === 2">
            <v-card color="primary" dark>
              <v-toolbar color="primary" flat>
                <v-toolbar-title>{{ $t('stats.score') }}</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <div>
                <v-list two-line subheader flat style="border-radius:0">
                  <v-list-item v-for="player in game.player" v-bind:key="player.idPlayer" flat>
                    <v-list-item-avatar>
                      <v-icon class="grey lighten-1 white--text">star</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content flat>
                      <v-list-item-title>{{ player.pseudo }}</v-list-item-title>
                      <v-list-item-subtitle>{{ player.point }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </div>
            </v-card>
          </v-flex>

          <v-flex xs12 v-if="game.player.length === 2" class="justify-space-between">
            <v-card minHeight="300" maxHeight="700" dark>
              <v-toolbar color="primary" flat>
                <v-toolbar-title>{{ $t('stats.allparty') }}</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <div class="pb-3 pt-3 align-self-end">
                <Message
                  v-for="(message,index) in game.message"
                  :key="`message-${index}`"
                  :name="message.user.pseudo"
                  :text="message.text"
                  :time="message.time"
                  :owner="message.user.idPlayer === me.idPlayer"
                  :type="message.type"
                />
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
    },
    checkPlayer() {
      if (this.game.viewer) {
        this.game.viewer.forEach(function(item) {
          if (item.idPlayer === this.me.idPlayer) {
            return true;
          }
          return false;
        });
      }
      return false;
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
