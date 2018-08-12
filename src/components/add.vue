<template>
    <div>
    <v-card class="elevation-12">
        <v-toolbar dark color="cyan darken-1">
            <v-icon>person_add</v-icon>
            <v-toolbar-title>Add Guest</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
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
        </v-form>
        </v-card-text>
            <v-card-actions>
                 <v-btn v-on:click.prevent="clear" dark color="red">Clear</v-btn>  
                <v-spacer></v-spacer>
                <v-btn :disabled="!valid" v-on:click="addGuest" dark color="cyan darken-1">Add Guest</v-btn> 
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
import { db } from '../main';
import { friendsRef } from '../main';
export default {
data() {
        return{
            valid: true,
            newGuest:{
                name:'',
                address:'',
                phone:'',
                email:'',
                lat:'',
                long:'',
            },
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
   
    methods: {
        clear () {
        this.$refs.form.reset()
      },
      addGuest(e){
          if (this.$refs.form.validate()) {
              friendsRef.child('guests').push({
                  name:this.newGuest.name,
                  address:this.newGuest.address,
                  phone: this.newGuest.phone,
                  email: this.newGuest.email,
                  lat:this.newGuest.lat,
                  long:this.newGuest.long,
              }).then(ref =>{
                alert('Guest Added Successfully');
                this.newGuest.name ='';
                this.newGuest.address ='';
                this.newGuest.phone='';
                this.newGuest.email ='';
                this.newGuest.lat = '';
                this.newGuest.long = '';
                console.log(ref);
                this.$router.push('dashboard');
              }).catch(err => {
                  console.log(err);
              })
              
          }
          e.preventDefault();
      },
    },
 
}
</script>

<style scoped>

</style>


