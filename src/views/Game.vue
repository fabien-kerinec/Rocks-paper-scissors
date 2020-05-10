<template>
  <v-app dark v-if="game.player">
    <v-container
      grid-list-md
      dark
      class="fill-height fill-width justify-center"
      fluid
      v-if="!userName && !me.pseudo"
    >
      <dialog-create :room="this.$route.params.idRoom"></dialog-create>
    </v-container>
    <v-container
      grid-list-md
      dark
      class="fill-height fill-width justify-center"
      fluid
      v-else-if="me.pseudo"
    >
      <waiting-screen :link="sharedLink" v-if="game.player.length === 1"></waiting-screen>
      <game-screen :game="game" :me="me" v-else></game-screen>
    </v-container>
    <beautiful-chat
      :participants="participants"
      :titleImageUrl="titleImageUrl"
      :onMessageWasSent="onMessageWasSent"
      :messageList="messageList"
      :newMessagesCount="newMessagesCount"
      :isOpen="isChatOpen"
      :close="closeChat"
      :icons="icons"
      :open="openChat"
      :showEmoji="false"
      :showFile="false"
      :showTypingIndicator="showTypingIndicator"
      :showLauncher="true"
      :showCloseButton="true"
      :colors="colors"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :messageStyling="messageStyling"
      @onType="handleOnType"
      @edit="editMessage"
      style="z-index:100"
      v-if="game.player.length > 1"
    >
      <template v-slot:header>
        <div class="sc-header--title">chat</div>
      </template>
    </beautiful-chat>

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
import Vue from 'vue';
import Chat from 'vue-beautiful-chat';
import { mapState } from 'vuex';
import CloseIcon from 'vue-beautiful-chat/src/assets/close-icon.png';
import OpenIcon from 'vue-beautiful-chat/src/assets/logo-no-bg.svg';
import FileIcon from 'vue-beautiful-chat/src/assets/file.svg';
import CloseIconSvg from 'vue-beautiful-chat/src/assets/close.svg';
import dialogCreate from '../components/dialogCreate.vue';
import WaitingScreen from '../components/Waiting.vue';
import GameScreen from '../components/GameScreen.vue';

Vue.use(Chat);
export default {
  name: 'Game',
  components: {
    dialogCreate,
    WaitingScreen,
    GameScreen
  },
  computed: {
    ...mapState(['userName']),
    sharedLink() {
      return `${window.location.protocol}//${window.location.hostname}${
        window.location.port ? `:${window.location.port}` : ''
      }/${this.game.session}`;
    },
    messageList() {
      let list = [];
      // let user;
      if (this.game.message) {
        /* eslint-disable */
        list = this.game.message.map((mess) => {
          if (mess.type === 'admin') {
            return {
              type: 'system',
              data: {
                text: mess.text,
                meta: mess.time
              }
            };
          } else if (mess.user.pseudo === this.me.pseudo) {
            return {
              type: 'text',
              author: 'me',
              data: {
                text: mess.text,
                meta: mess.time
              }
            };
          }
          return {
            type: 'text',
            author: mess.user.pseudo,
            data: {
              text: mess.text,
              meta: mess.time
            }
          };
        });
        /* eslint-enable */
      }
      return list;
    },
    participants() {
      let listplayer = [];
      let listviewer = [];
      let finalList = [];
      if (this.game) {
        if (this.game.player > 0) {
          listplayer = this.game.player.map((item) => ({
            id: item.idPlayer,
            name: item.pseudo,
            imageUrl:
              'https://api.adorable.io/avatars/200/5b0a544b7c382892455174aeebafe26f.png'
          }));
        }
        if (this.game.viewer > 0) {
          listviewer = this.game.viewer.map((item) => ({
            id: item.idPlayer,
            name: item.pseudo,
            imageUrl:
              'https://api.adorable.io/avatars/200/5b0a544b7c382892455174aeebafe26f.png'
          }));
        }
      }
      finalList = listplayer.concat(listviewer);
      return finalList;
    }
  },
  mounted() {
    this.$socket.emit('newChan', this.$route.params.idRoom);
    if (this.userName) {
      this.$socket.emit('changePseudo', {
        pseudo: this.userName,
        session: this.$route.params.idRoom
      });
    }
  },
  methods: {
    sendMessage(text) {
      if (text.length > 0) {
        const msg = text;
        this.newMessagesCount = this.isChatOpen
          ? this.newMessagesCount
          : this.newMessagesCount + 1;
        this.onMessageWasSent(msg);
      }
    },
    onMessageWasSent(message) {
      // called when the user sends a message
      /* eslint-disable */
      var m = new Date();
      var dateString =
        m.getUTCFullYear() +
        '/' +
        ('0' + (m.getUTCMonth() + 1)).slice(-2) +
        '/' +
        ('0' + m.getUTCDate()).slice(-2) +
        ' ' +
        ('0' + m.getUTCHours()).slice(-2) +
        ':' +
        ('0' + m.getUTCMinutes()).slice(-2) +
        ':' +
        ('0' + m.getUTCSeconds()).slice(-2);
      if (message.data.text) {
        const msg = {
          user: this.me,
          type: 'normal',
          text: message.data.text,
          time: dateString
        };
        this.$socket.emit('createMessage', msg, () => {
          this.$ga.event('Message', 'action', 'newMessage', 42);
        });
      }
      /* eslint-enable */
    },
    openChat() {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true;
      this.newMessagesCount = 0;
    },
    closeChat() {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false;
    },
    handleScrollToTop() {
      // called when the user scrolls message list to top
      // leverage pagination for loading another page of messages
    },
    handleOnType() {
      console.log('Emit typing event');
    },
    editMessage(message) {
      /* eslint-disable */
      const mess = this.messageList.find((mess) => mess.id === message.id);
      mess.isEdited = true;
      mess.data.text = message.data.text;

      /* eslint-enable */
    }
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
      qrcode: null,
      icons: {
        open: {
          img: OpenIcon,
          name: 'default'
        },
        close: {
          img: CloseIcon,
          name: 'default'
        },
        file: {
          img: FileIcon,
          name: 'default'
        },
        closeSvg: {
          img: CloseIconSvg,
          name: 'default'
        }
      },
      titleImageUrl:
        'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
      newMessagesCount: 0,
      isChatOpen: false,
      showTypingIndicator: '',
      colors: {
        header: {
          bg: '#66bb6a',
          text: '#ffffff'
        },
        launcher: {
          bg:
            '#66bb6a                                                                                                 '
        },
        messageList: {
          bg: '#424242'
        },
        sentMessage: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        receivedMessage: {
          bg: '#757575',
          text: '#fff'
        },
        systemMessage: {
          bg: '#757575',
          text: '#fff'
        },
        userInput: {
          bg: '#424242',
          text: '#fff'
        }
      },
      alwaysScrollToBottom: false,
      messageStyling: true
      //  messageList: [
      //   { type: 'text', author: 'me', data: { text: 'Say yes!' } },
      //   { type: 'text', author: 'user1', data: { text: 'No.' } }
      // ],
    };
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
    },
    newMessage() {
      console.log('newmless');

      this.newMessagesCount += 1;
      console.log(this.newMessagesCount);
    }
  }
};
</script>

<style>
.sc-message--avatar {
  display: none !important;
}
.sc-message--text {
  padding: 10px 10px;
  width: 70%;
}
.sc-message--text-content {
  margin-bottom: 10px !important;
  text-align: left !important;
}
.sc-message--meta {
  margin-bottom: 0px !important;
}
.sc-message {
  width: 90% !important;
}

.sc-message--content.sent .sc-message--text p {
  text-align: right !important;
}
</style>
