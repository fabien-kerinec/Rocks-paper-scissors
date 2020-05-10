import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: "",
    roomName: ""
  },
  mutations: {
    SET_USERNAME: (state, data) => {
      state.userName = data;
    },
    SET_ROOMNAME: (state, data) => {
      state.roomName = data;
    }
  },
  actions: {
    CHANGE_INFO: async ({
      commit
    }, data) => {
      await commit('SET_USERNAME', data.user);
      await commit('SET_ROOMNAME', data.room);
      router.push({
        name: "Game",
        params: {
          idRoom: data.room
        }
      });
    }
  },
  modules: {}
});
