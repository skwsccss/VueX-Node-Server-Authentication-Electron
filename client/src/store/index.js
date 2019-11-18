import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import env from '../env'
// import { ipcRenderer } from "electron";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    cookie: '',
    user: {}
  },
  mutations: {
    rgst(state) {
      state.status = 'loading'
    },
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, token, user) {
      state.status = 'loading'
      state.token = token
      state.user = user
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = ''
      state.token = ''
    },
    error(state) {
      state.status = 'error'
    },
    success(state) {
      state.status = 'success'
    }
  },
  actions: {
    registerDevice({ commit }, deviceId) {
      commit('rgst');
      return new Promise((resolve, reject) => {
        commit('rgst')
        let deviceID = deviceId.arg
        let API_URL = env.API_URL;
        let token = localStorage.getItem('token')
        axios.defaults.headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type':'application/json'
        }
        // console.log('sers', deviceID)
        // console.log('sers', axios.defaults.headers.Authorization)
        axios({ url: `${API_URL}register-deviceid`, data: JSON.stringify({ "device_id": deviceID }), method: 'POST' }).then((result) => {
          // console.log(result)
          resolve(result)
        }).catch((err) => {
          commit('error')
          reject(err)
        });
      })
    },
    getProduct({ commit }) {
      return new Promise((resolve, reject) => {
        commit('rgst')
        let token = localStorage.getItem('token')
        let API_URL = env.API_URL;
        axios.defaults.headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type':'application/json'
        }
        axios({ url: `${API_URL}my-products`, method: 'GET' }).then((result) => {
          commit('success')
          resolve(result)
        }).catch((err) => {
          commit('error')
          reject(err)
        });
      })

    },
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: `https://test.ia.h3online.hu/api/login`, data: user, method: 'POST' })
          .then((result) => {
            const token = result.data.token
            const user = result.data.user
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user)
            resolve(result)
          }).catch((err) => {
            // console.log('e', err)
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
    currentStatus: state => state.status,
  }
})
