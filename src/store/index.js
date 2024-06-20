import Vuex from 'vuex';
import api from '../services/api';
import sessionStoragePlugin from '../plugins/sessionStoragePlugin';


export default new Vuex.Store({
  state: {
    user: null,
    userToken: sessionStorage.getItem('userToken') || null,
    items: [],
    formError: null,
    formMessage: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setItems(state, items) {
      state.items = items;
    },
    setFormError(state, error) {
      state.formError = error;
    },
    setFormMessage(state, message) {
      state.formMessage = message;
    },
    setUserToken(state, token) {
      state.userToken = token;
    },
    clearUserToken(state) {
      state.userToken = null;
      sessionStorage.removeItem('userToken');
    }
  },
  actions: {
    async register({ commit }, user) {
      try {
        const response = await api.registerUser(user);

        if (response && response.data ) {
          commit('setFormMessage', response.data.message + ".\nPlease go to login.");
          commit('setFormError', null);
          return response.data
        }
        else if ( response.response && response.response.data && response.response.data.message ) {
          commit('setFormError', response.response.data.message || "Registration failed error")
          console.log("STORE-ACTIONS ERROR: ", response)
          return response.response.data
        }
        else {
          commit('setFormError', "Registration failed response")
          console.log("STORE-ACTIONS ERROR: ", response)
        }
        return false
      } catch (error) {
        console.log("STORE-ACTIONS CATCH ERROR: ", error)
        commit('setFormError', 'Registration failed fatal');
        return false
      }
    },
    async login({ commit }, user) {
      const response = await api.loginUser(user);

      if (response && response.data ) {

        if (response.data.access_token) {
          commit('setFormMessage', null);
          commit('setFormError', null);
          commit('setUserToken', response.data.access_token)
        } else {
          commit('setFormMessage', null);
          commit('setFormError', "Unable to get access token.");
          commit('setUser', null)
        }
        return response.data
      }
      else if ( response.response && response.response.data && response.response.data.message ) {
        commit('setFormError', response.response.data.message || "Registration failed error")
        console.log("STORE-ACTIONS ERROR: ", response)
        return response.response.data
      }
      else {
        commit('setFormError', "Registration failed response")
        console.log("STORE-ACTIONS ERROR: ", response)
      }
      return false
    },
    async fetchItems({ commit, state }) {
      const response = await api.getItems(state.userToken);
      commit('setItems', response.data);
    },
    async createItem({ dispatch, state }, item) {
      await api.createItem(state.userToken, item);
      dispatch('fetchItems');
    },
    async updateItem({ dispatch, state }, { id, item }) {
      await api.updateItem(state.userToken, id, item);
      dispatch('fetchItems');
    },
    async deleteItem({ dispatch, state }, id) {
      await api.deleteItem(state.userToken, id);
      dispatch('fetchItems');
    },
    async logout({ commit }) {
      commit('clearUserToken')
    }
  },
  modules: {},
  getters: {
    isAuthenticated(state) {
      return !!state.userToken;
    }
  },
  plugins: [sessionStoragePlugin]
});
