<template>
  <!-- <v-card dark> -->
  <!-- <v-toolbar dark color="primary" text>
      <v-toolbar-title>{{ $t('qrcode.title') }}</v-toolbar-title>
      <v-spacer></v-spacer>
  </v-toolbar>-->

  <!-- <v-card-title primary-title> -->
  <div style="margin:auto">
    <canvas id="qrcode"></canvas>
    <hr />
    <h4>{{ $t('qrcode.description') }}</h4>
  </div>
  <!-- </v-card-title>
  </v-card>-->
</template>

<script>
import qrious from 'qrious';

export default {
  name: 'qrcode',
  props: {
    link: String
  },
  mounted() {
    this.generate();
  },
  updated() {
    this.generate();
  },
  data() {
    return {
      qrcode: null
    };
  },
  methods: {
    generate() {
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
