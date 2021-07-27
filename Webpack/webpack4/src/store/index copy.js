import Vue from "vue";
import Vuex from "vuex";
import test from "./modules/test"
import getters from "./getters"
Vue.use(Vuex)
const store = new Vuex.Store({
	modules: {
		test
	},
	getters,
})

export default store