import Vue from "vue"
import App from "@/App.vue";
import router from "@/router/index";
import store from "@/store";
import "@/css/index.less"

new Vue({
	store,
	router,
	render: (h) => h(App)
}).$mount("#app")