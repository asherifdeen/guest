<template>
  
    <v-layout row wrap>
    <v-flex xs4  v-for="(friend,key) of friends" v-bind:key="friend['.key']">
      <v-card>
        <!--<v-card-media
          :src="prod.image"
          height="200px"
        ></v-card-media>-->

        <v-card-title primary-title>
          <div>
            <h3>Name: {{friend.name}}</h3>
            <h4>Address: {{friend.address}}</h4>
            <h4>Phone: {{friend.phone}}</h4>
            <h4>Email: {{friend.email}}</h4>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn :to="{name: 'edit', params: {gid: key}}" dark color="cyan darken-1">Edit</v-btn>
          <v-btn @click="deleteGuest(key)" dark color="cyan darken-1">Delete</v-btn>
        </v-card-actions>
      </v-card>
      <br>
    </v-flex>
     <div v-if="loading">
          <img src="../assets/loader.gif"/>
          Loading.....
        </div>
  </v-layout>
</template>

<script>
import firebase from 'firebase';
import { friendsRef } from '../main';
export default { 
    data() {
        return{
        friends: [],
        loading: false,
        dialog: false,
        }
    },
  
    methods:{
        editPerson(key){
            console.log('this is the user key: ' + key);
        },
        deleteGuest(key){
         
           friendsRef.child('guests/'+key).remove();
           console.log(key);
           alert('Guest Deleted successfully');
           this.$router.push('dashboard');
        }
    },
   mounted() {
      this.loading = true;
          const newFriends = friendsRef.child('guests');
          newFriends.on('value', snapshot => {
              this.friends = snapshot.val();
              this.loading = false;
          }, errorObject => {
              console.log('Error retrieving thoughts: ' + errorObject.code);
              this.loading = false;
          }
          )
         
    }
 
}
</script>

<style>
  
</style>
