<template>
     <div>
                  <h1>My Guest book</h1>
                  <v-card class="elevation-12">
                    <v-toolbar dark color="cyan darken-1">
                      <v-icon>supervised_user_circle</v-icon>
                      <v-toolbar-title>{{title}}</v-toolbar-title>
                    </v-toolbar>
                      <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                          <v-text-field 
                          prepend-icon="person" 
                          name="email" 
                          label="Email" 
                          type="email" 
                          v-model="user.email" 
                          :rules="emailRules"></v-text-field>
                          <v-text-field 
                          id="password" 
                          hint="At least 6 characters" 
                          prepend-icon="lock" 
                          name="password" 
                          label="Password"
                           v-model="user.password" 
                           type="password" 
                           :rules="[rules.required, rules.min]"></v-text-field>
                        </v-form>
                      </v-card-text>
                      <v-card-actions>
                       <router-link :to="{ name: 'register' }"><v-btn flat>Register here</v-btn></router-link> 
                        <v-spacer></v-spacer>
                        <v-btn @click="login" dark color="cyan darken-1">Login</v-btn>
                      </v-card-actions>
                  </v-card>
                  
    </div>
</template>
<script>
import firebase,{ functions } from 'firebase';
export default {
  name: 'Login',
  data(){
    return{
       valid: true,
       title: 'Login',
       user: {
         email:'',
         password: '',
       },
       emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
        }
      
    }
  },
  methods:{
    
      login (e){
         if (this.$refs.form.validate()){
         firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(user =>{
            this.$emit('loginStatus', true);
            //this.$router.push('/');//re-rendering th path
            this.$router.go({path: this.$router.path});
        }),
        err => {
            alert(err.message);
        }
      }
      e.preventDefault();
      }
      
  },

  
}
</script>


<style>

</style>
