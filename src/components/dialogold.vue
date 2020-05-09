<template>
  <v-dialog dark v-model="dialogPseudo" max-width="700px" persistent>
    <v-card class="grey darken-3" dark text-xs-center>
      <!-- eslint-disable -->
      <v-img :src="require('@/assets/rockPaperScissors.svg')" :aspect-ratio="21 / 9"></v-img>
      <!-- eslint-enable -->
      <v-card-title>
        <h3 style="word-break: break-word;">{{ $t('username.title') }}</h3>
      </v-card-title>

      <v-card-text style="padding-top:0">
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex xs12 sm4>
              <v-btn
                class="xs-12"
                :class="locale === 'fr' ? 'active' : null"
                depressed
                color="primary"
                @click="changeLocal('fr')"
                style="width: 100%;"
              >
                <span class="flag-icon flag-icon-fr mr-2"></span>
                Français
              </v-btn>
            </v-flex>
            <v-flex xs12 sm4>
              <v-btn
                :class="locale === 'en' ? 'active' : null"
                color="primary"
                @click="changeLocal('en')"
                style="width: 100%;"
              >
                <span class="flag-icon flag-icon-gb mr-2"></span>
                English
              </v-btn>
            </v-flex>
            <v-flex xs12 sm4>
              <v-btn
                :class="locale === 'it' ? 'active' : null"
                @click="changeLocal('it')"
                color="primary"
                style="width: 100%;"
              >
                <span class="flag-icon flag-icon-it mr-2"></span>
                Italiano
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>

        <v-form
          ref="form"
          v-model="validPseudo"
          v-on:submit.prevent="changePseudo()"
          lazy-validation
        >
          <v-text-field
            v-model="myPseudo"
            :rules="[
              (v) => !!v || $t('username.errors.required'),
              (v) => v.length <= 10 || $t('username.errors.length')
            ]"
            counter="10"
            :label="$t('username.field')"
            required
          ></v-text-field>

          <div class="text-xs-center">
            <v-btn color="primary" :disabled="!validPseudo" @click="changePseudo()">{{
              $t('username.submit')
            }}</v-btn>
            <v-btn text @click="myPseudo = ''">{{ $t('username.clear') }}</v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
// import qrious from 'qrious';

export default {
  name: 'modalView',
  data() {
    return {
      validPseudo: true,
      dialogPseudo: true,
      myPseudo: ''
    };
  },
  methods: {
    changePseudo() {
      if (this.$refs.form.validate()) {
        this.dialogPseudo = false;
        this.$socket.emit('changePseudo', { pseudo: this.myPseudo });
      }
    },
    changeLocal(local) {
      this.$i18n.locale = local;
      this.$ga.event('lang', 'choose', local, 41);
    }
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    }
  }
};
</script>
<style scoped>
/* button.v-btn {

} */
button.v-btn.active,
.theme--dark.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: #0eab00 !important;
  color: #fff !important;
  pointer-events: none;
}
button.active {
  background-color: #0eab00 !important;
  color: #fff !important;
}
</style>
