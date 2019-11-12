import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import { resolve } from 'dns'
// import { reject } from 'q'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, token, user) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = ''
      state.token = ''
    }
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: `https://test.ia.h3online.hu/api/login`, data: user, method: 'POST' })
          .then((result) => {
            console.log('t', result)
            const token = result.data.token
            const user = result.data.user
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user)
            resolve(result)
          }).catch((err) => {
            console.log('e', err)
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          });
      })
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: `http://localhost:3000/register`, data: user, method: 'POST' })
          .then((res) => {
            const token = res.data.token
            let user = res.data.user
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Autorization'] = token
            commit('auth_success', token, user)
            resolve(res)
          }).catch((err) => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          });
      })
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve();
      })
    }
  },
  modules: {
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
})
