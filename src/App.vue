<template>
    <v-app>
<<<<<<< HEAD
=======
      <v-toolbar dark color="cyan darken-1" v-show="isLoggedIn">
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title class="white--text">{{title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn to="/dashboard" outline>
        <v-icon>person_add</v-icon>
          Dashboard
        </v-btn>
        <v-btn to="/add" outline>
        <v-icon>person_add</v-icon>
          Add Guest
        </v-btn>
        <v-btn flat @click="logout">
          <v-icon>exit_to_app</v-icon>
        </v-btn>
      </v-toolbar>
>>>>>>> feb45de64ec349a35717bf212a5be4b5b648b2ab
      <v-content >
        <navbar/>
        <v-container fluid fill-height >
            
          <v-layout justify-center>
            <v-flex xs12 sm12 md6>
            
              <router-view></router-view>
            </v-flex>
          </v-layout>
      </v-container>
    </v-content>
      <v-footer color="cyan darken-1" app>
      <span class="white--text">&copy; 2018</span>
    </v-footer>
    </v-app>
</template>
<script>
import Navbar from './components/navbar';
export default {
<<<<<<< HEAD
  components: {
    Navbar
  }
=======
  data(){
    return{
       title: "BlakCoder's Guestbook",
       isLoggedIn: false,
       currentUser: '', 
    }
  },
    methods: {
      logout(e){
          firebase.auth().signOut()
          .then(() => {
              this.$router.push('/');
              this.isLoggedIn=false;
              this.currentUser = false;
          });
      },
   
   },
   created() {
       if(firebase.auth().currentUser){
           this.isLoggedIn = true;
           this.currentUser = firebase.auth().currentUser.email;
       }
   },
>>>>>>> feb45de64ec349a35717bf212a5be4b5b648b2ab
}
</script>


<style>

</style>
