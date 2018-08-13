<template>
    <v-toolbar dark color="cyan darken-1">
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title class="white--text">{{title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn v-if="isLoggedIn" to="/">
        <v-icon>person_add</v-icon>
          Dashboard
        </v-btn>
        <v-btn v-if="isLoggedIn" to="/add" dark>
        <v-icon>person_add</v-icon>
          Add Guest
        </v-btn>
         <v-btn v-if="!isLoggedIn" to="/login" dark>
          Login
        </v-btn>
         <v-btn v-if="!isLoggedIn" to="/register" dark>
          Register
        </v-btn>
        <v-btn v-if="isLoggedIn" flat @click="logout">
          <v-icon>exit_to_app</v-icon>
          Logout
        </v-btn>
    </v-toolbar>
</template>
<script>
import firebase from 'firebase';
export default {
  data(){
    return{
       title: "BlakCoder's Guestbook",
       isLoggedIn: false,
       currentUser: false, 
    }
  },
    methods: {
      logout(e){
          firebase.auth().signOut()
          .then(() => {
              //this.$router.push('/login');
              //re-rendering th path
              this.$router.go({path: this.$router.path});
              this.isLoggedIn=false;
              this.currentUser = false;
          });
      },
   },
   created() {
       if (firebase.auth().currentUser){
           this.isLoggedIn = true;
           this.currentUser = firebase.auth().currentUser.email;
       }
   },
}
</script>

