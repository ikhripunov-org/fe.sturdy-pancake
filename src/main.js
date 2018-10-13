import Vue from 'vue'
import App from './App.vue'
import Customer from './components/Customer.vue'
import Note from './components/Note.vue'
import bDropdown from 'bootstrap-vue/es/components/dropdown/dropdown';
import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.component('b-dropdown', bDropdown);
Vue.component('b-dropdown-item', bDropdownItem);

Vue.config.productionTip = false
Vue.component("Customer", Customer);
Vue.component("Note", Note);
new Vue({
  render: h => h(App),
  data: {

  }
}).$mount('#app')
