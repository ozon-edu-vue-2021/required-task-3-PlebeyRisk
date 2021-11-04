import Vue from 'vue';
import App from './App.vue';
import 'normalize.css';
import notifyErrorPlugin from './plugins/notifyErrorPlugin';

Vue.config.productionTip = false;

Vue.use(notifyErrorPlugin);

new Vue({
    render: (h) => h(App),
}).$mount('#app');
