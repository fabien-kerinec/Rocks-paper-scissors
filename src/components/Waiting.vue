<template>
  <v-flex dark xs12 sm8>
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
    <v-card class="grey darken-3" dark>
      <v-toolbar color="primary" flat>
        <v-toolbar-title>{{ $t('await.title') }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-card-text primary-title color="grey" dark>
        <div style="margin:auto" color="grey" dark>
          <div>
            <v-avatar size="50%">
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
                <circle cx="50" cy="50" r="16.3004" fill="none" stroke="#0051a2" stroke-width="1">
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
                <circle cx="50" cy="50" r="5.41541" fill="none" stroke="#1b75be" stroke-width="1">
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
          <!-- <div class="text-xs-center">{{ $t('await.warning') }}</div> -->
          <v-spacer></v-spacer>
          <!-- eslint-disable -->
          <div
            class="bot d-flex flex xs12 sm10 justify-space-around align-center mt-10 mx-auto flex-wrap"
          >
            <div class="left d-flex flex flex-column xs12">
              <!-- eslint-disable -->
              <v-tooltip top>
                <!-- eslint-disable -->
                <v-btn
                  slot="activator"
                  slot-scope="{ on }"
                  depressed
                  class="btn-copy-link white--text mx-auto"
                  :data-clipboard-text="link"
                  color="primary"
                  max-width="400"
                >{{ $t('await.clipboard.description') }}</v-btn>
                <!-- eslint-enable -->
                <!-- <span>{{ $t('await.clipboard.description') }}</span> -->
              </v-tooltip>
              <!-- eslint-enable -->
              <!-- <span>{{ $t('await.clipboard.description') }}</span> -->

              <div class="text-xs-center">
                <p color="accent">{{ link }}</p>
              </div>
            </div>
            <div class="right d-flex flex flex-column xs12">
              <div style="margin:auto">
                <canvas id="qrcode"></canvas>
                <hr />
                <h4>{{ $t('qrcode.description') }}</h4>
              </div>
            </div>
          </div>
          <!-- eslint-enable -->
        </div>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
import clipboard from 'clipboard';
import qrious from 'qrious';
/* Components */
// import qrcodeView from './qrcode.vue';

const clip = new clipboard('.btn-copy-link');

export default {
  name: 'waitingScreen',
  component: {
    // qrcodeView
  },
  props: {
    link: String
  },
  data() {
    return {
      qrcode: null,
      snackbarClipboard: false
    };
  },
  created() {},
  updated() {
    this.generate();
  },
  mounted() {
    this.generate();
    clip.on('success', () => {
      // console.log('succs');
      this.snackbarClipboard = true;
    });
  },
  methods: {
    generate() {
      console.log('wow');

      this.qrcode = new qrious({
        element: document.getElementById('qrcode'),
        level: 'H',
        size: 200,
        value: this.link
      });
    }
  }
};
</script>

<style></style>
