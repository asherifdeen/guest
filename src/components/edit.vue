<template>
<div>
    <v-card class="elevation-12">
        <v-toolbar dark color="cyan darken-1">
            <v-icon>person_add</v-icon>
            <v-toolbar-title>Update Guest</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
        <v-form ref="form" lazy-validation>
            <v-text-field
              v-model="newGuest.name"
              :rules="nameRules"
              label="Name"
              autofocus
              required></v-text-field>
              <v-text-field
              v-model="newGuest.address"
              :rules="adddressRules"
              label="Address"
              required></v-text-field>
              <v-text-field
              v-model="newGuest.phone"
              :rules="phonesRules"
              label="Phone"
              required></v-text-field>
              <v-text-field
                v-model="newGuest.email"
                :rules="emailRules"
                label="E-mail"
                required
                ></v-text-field>
                <v-text-field
                v-model="newGuest.lat"
                label="Latitude"
                required
                ></v-text-field>
               
                <v-text-field
                v-model="newGuest.long"
                label="Longitude"
                required
                ></v-text-field>   
                 <v-text-field
                v-model="newId"
                label="ID"
                required
                ></v-text-field>
        </v-form>
        </v-card-text>
            <v-card-actions>
                
                <v-spacer></v-spacer>
                <v-btn :disabled="!valid" v-on:click.prevent="updateGuest" dark color="cyan darken-1">Update Guest</v-btn> 
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
import { db } from '../main';
import { friendsRef } from '../main';
import firebase from 'firebase';
export default {
    data(){
        return{
            guest:{},
            newId:'',
            newGuest:{
                   },
            valid:true,
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length >= 10) || 'Name must be greater than 10 characters'
            ],
            addressRules:[
                v => !!v || 'Address is required'
            ],
            phoneRules:[
                v => !!v || 'Phone number is required',
                v => (v && v.length >= 10) || 'Number must be less than 10 characters',
                v => (isNaN(v)) || 'Phone must be a number',
            ],
             emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
        }
    },
    methods:{
        load(gid){
         const singleGuest = friendsRef.child('guests/'+gid);
          singleGuest.on('value', snapshot => {
              this.guest = snapshot.val();
              this.newGuest={
                  name: snapshot.val().name,
                  address: snapshot.val().address,
                  phone: snapshot.val().phone,
                  email: snapshot.val().email,
                  lat: snapshot.val().lat,
                  long: snapshot.val().long
              }

          }, errorObject => {
              console.log('Error retrieving thoughts: ' + errorObject.code);
          }
          )
           
        },
        
        updateGuest(){
            friendsRef.child('guests/'+this.newId).set({
                  name:this.newGuest.name,
                  address:this.newGuest.address,
                  phone: this.newGuest.phone,
                  email: this.newGuest.email,
                  lat:this.newGuest.lat,
                  long:this.newGuest.long,
              }).then(ref =>{
                alert('Guest Edited Successfully');
                this.$router.push('/dashboard');
              }).catch(err => {
                  alert(err);
              })
            
        }
    },
    mounted(){
        const { gid } = this.$route.params;
        this.load(gid);
        this.newId = gid;
      
    }
}
</script>
<style>

</style>

