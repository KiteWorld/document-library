import {
	SET_TEXT
} from "../mutation_type"

const state = {
	vuexText: "123",
	getterValue: 'getter',
}



const mutations = {
	[SET_TEXT]: (state, text) => {
		state.vuexText = text
	},
}

const actions = {
	setText({
		commit
	}) {
		commit('SET_TEXT')
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}