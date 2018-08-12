import 'vuetify/dist/vuetify.min.css';
import Vuetify from 'vuetify';
import firebase from 'firebase';
import VueFire from 'vuefire';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';

Vue.use(Vuetify);
Vue.use(VueFire);
Vue.config.productionTip = true;

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyA33xqa6tmGwPH4gkT6-YsBJWM6qKL8-V0',
  authDomain: 'myguestbook-f8e43.firebaseapp.com',
  databaseURL: 'https://myguestbook-f8e43.firebaseio.com',
  projectId: 'myguestbook-f8e43',
  storageBucket: 'myguestbook-f8e43.appspot.com',
  messagingSenderId: '563880477285',
};

firebase.initializeApp(config);

export const db = firebase.database();
export const friendsRef = db.ref();

// Check before each page load whether the page requires authentication/
// if it does check whether the user is signed into the web app or
// redirect to the sign-in page to enable them to sign-in
let app;
firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App),
    }).$mount('#app');
  }
});
