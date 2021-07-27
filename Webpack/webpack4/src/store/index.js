import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
	text: '默认值'
}

const getters = {
	getText(state) {
		return state.text
	}
}
const actions = {
	setText: ({ commit }, text) => {
		return commit('setText', text)
	}
}
const mutations = {
	setText: (state, text) => {
		state.text = text
	}
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
	getters
})
