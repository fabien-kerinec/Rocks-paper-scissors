<template>
  <v-container grid-list-md mx-auto fill-height d-flex align-start class="containerzero">
    <v-card
      class="containerfirst flex d-flex flex-column xs12 sm10 px-2"
      height="100%"
      min-height=""
      fill-height
      flat
      dark
    >
      <v-toolbar color="primary" dark style="max-height:64px">
        <v-toolbar-title>{{ $t('game.title') }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <!-- AWAIT/CONTINUE -->
      <v-flex
        class="mx-0 d-flex flex-column grey darken-3 px-0 py-0"
        style="flex:1"
        xs12
        fill-height
        justify-center
        column
      >
        <div class="mx-0 d-flex flex-column grey darken-3 px-0 py-0" v-if="!showAction">
          <h3 v-if="!results.win">{{ $t('game.waiting') }}</h3>
          <v-layout column justify-center>
            <v-layout row wrap xs4 v-if="checkPlayer()">
              <div class="d-flex row xs12" v-if="results.win">
                <v-flex
                  xs6
                  d-flex
                  flex-column
                  align-center
                  justify-center
                  v-for="player in results.player"
                  v-bind:key="player.idPlayer"
                  class="column"
                >
                  <h3>
                    {{ player.pseudo }}
                    <v-chip
                      color="primary"
                      text-color="white"
                      v-if="me.idPlayer == player.idPlayer"
                    >
                      {{ $t('game.me') }}
                    </v-chip>
                  </h3>
                  <v-icon style="font-size: 7em">{{ getIcon(player.choice) }}</v-icon>
                </v-flex>
              </div>

              <div class="d-flex row xs12" v-if="!results.win">
                <v-flex
                  xs6
                  d-flex
                  flex-column
                  align-center
                  justify-center
                  v-for="player in game.player"
                  v-bind:key="player.idPlayer"
                  class="column"
                >
                  <h3>
                    {{ player.pseudo }}
                    <v-chip
                      color="primary"
                      text-color="white"
                      v-if="me.idPlayer == player.idPlayer"
                    >
                      {{ $t('game.me') }}
                    </v-chip>
                  </h3>
                  <v-icon style="font-size: 7em" v-if="me.idPlayer == player.idPlayer">{{
                    getIcon(myChoice)
                  }}</v-icon>
                  <v-icon style="font-size: 7em" v-else>{{ blinkIcon }}</v-icon>
                </v-flex>
              </div>
            </v-layout>
            <v-layout row wrap xs4 v-else-if="!checkPlayer() && results.player.length === 2">
              <v-flex
                xs6
                d-flex
                flex-column
                align-center
                justify-center
                v-for="player in results.player"
                v-bind:key="player.idPlayer"
              >
                <h3>
                  {{ player.pseudo }}
                  <v-chip color="primary" text-color="white" v-if="me.idPlayer == player.idPlayer">
                    {{ $t('game.me') }}
                  </v-chip>
                </h3>
                <v-icon style="font-size: 7em">{{ getIcon(player.choice) }}</v-icon>
              </v-flex>
            </v-layout>
            <v-flex xs4 class="mt-5" v-if="results.win">
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
                v-if="checkPlayer()"
                color="primary"
                class="white--text"
              >
                {{ $t('game.continue') }}
              </v-btn>
            </v-flex>
          </v-layout>
        </div>
        <!-- ACTION -->
        <div
          dark
          class="grey darken-3 d-flex flex-column justify-center"
          fill-height
          v-if="showAction && checkPlayer()"
        >
          <h2 class="mb-5">{{ $t('game.action.title') }}</h2>
          <div
            class=" btn d-flex flex-column flex-sm-row justify-center px-5 "
            d-flex
            xs6
            align-end
          >
            <v-btn large depressed color="info" class=" white--text btnicon" @click="setChoice(0)">
              {{ $t('game.action.rock') }}
              <v-icon right dark>far fa-hand-rock</v-icon>
            </v-btn>

            <v-btn large depressed color="info" class="white--text btnicon" @click="setChoice(1)">
              {{ $t('game.action.paper') }}
              <v-icon right dark>far fa-hand-paper</v-icon>
            </v-btn>

            <v-btn large depressed color="info" class="white--text btnicon" @click="setChoice(2)">
              {{ $t('game.action.scissors') }}
              <v-icon right dark>far fa-hand-scissors</v-icon>
            </v-btn>
          </div>
        </div>
        <div class="grey darken-3 d-flex flex-column justify-center" v-else-if="!checkPlayer()">
          <h3>{{ $t('game.viewerWaiting') }}</h3>
        </div>
      </v-flex>
    </v-card>
    <v-card
      class=" containerfirst flex d-flex flex-column xs12 sm2 px-2"
      height="100%"
      fill-height
      flat
      dark
    >
      <v-toolbar color="primary" style="max-height:64px">
        <v-toolbar-title>{{ $t('stats.score') }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <div class="grey darken-3 d-flex flex-column justify-center align-center" style="flex:1">
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
  </v-container>
</template>

<script>
let blinkIconAnimation = 0;
const blinkIconArray = [
  'far fa-hand-rock',
  'far fa-hand-paper',
  'far fa-hand-scissors',
  'fas fa-question'
];

export default {
  name: 'GameScreen',
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

    // clip.on('success', () => {
    //   // console.log('succs');
    //   this.snackbarClipboard = true;
    // });
    /* Animation */
    funcChangeIcon();
    this.$ga.page('/game');
  },
  data() {
    return {
      render: false,

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
  props: {
    game: Object,
    me: Object
  },
  methods: {
    checkPlayer() {
      let value = false;
      if (!this.game.player) {
        // console.log('ok');
        return false;
      }

      this.game.player.forEach((item) => {
        if (item.idPlayer === this.me.idPlayer) {
          console.log('yes');
          value = true;
        }
      });

      return value;
    },
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
      this.$socket.emit('continueGame');
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
    }
  },
  sockets: {
    // connected(data) {
    //   this.game = data;
    //   this.render = true;
    // },
    // yourID(data) {
    //   this.me = data;
    // },
    stats(data) {
      this.stats = data;
      if (!this.checkPlayer) {
        this.showAction = false;
        this.results = {};
      }
    },
    haveChoice(data) {
      this.haveChoice = data;
      this.snackbar = true;
      if (!this.checkPlayer) {
        this.showAction = false;
        this.results = {};
      }
    },
    results(data) {
      this.results = data;
      this.showContinue = true;
      this.showAction = false;
    },
    resetResult() {
      console.log('yo');

      if (!this.checkPlayer) {
        this.results = {};
        this.showAction = true;
      }
    }
  }
};
</script>

<style>
@media screen and (max-width: 600px) {
  .containerzero {
    height: auto !important;
  }
  .containerfirst {
    min-height: 80vh !important;
    margin-bottom: 20px !important;
  }
  .btnicon {
    margin-bottom: 15px !important;
  }
}
@media screen and (min-width: 600px) {
  .containerzero {
    height: 100% !important;
  }
  .btnicon {
    margin: 0 10px !important;
  }
}
</style>
