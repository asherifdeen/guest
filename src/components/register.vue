<template>
    <div>
                  <v-card class="elevation-12">
                    <v-toolbar dark color="cyan darken-1" >
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
                         <v-text-field 
                          id="confirmPassword"
                          prepend-icon="lock" 
                          name="cpassword" 
                          label="Confirm Password"
                          type="password" 
                          :rules="passwordConfirmationRules"></v-text-field>
                        </v-form>
                      </v-card-text>
                      <v-card-actions>
                       <router-link :to="{ name: 'login' }"><v-btn flat>Login</v-btn></router-link> 
                       <v-spacer></v-spacer>
                        <v-btn @click.prevent="register" dark color="cyan darken-1">Register</v-btn>
                      </v-card-actions>
                  </v-card>
         </div>
</template>
<script>
import firebase from 'firebase';
export default {
  name: 'Login',
 
  data(){
    return{
       title: 'Register',
       valid:true,
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
        },
      passwordConfirmationRules: [
        (v) => !!v || 'Confirmation Password is required',
        (v) => v == this.user.password || 'Password must match'
       ],
        
    }
  },
  methods: {
      register (e){
      if (this.$refs.form.validate()){
       firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password)
        .then(user =>{
            alert(`Account created for ${this.user.email}`);
            this.$router.push('/');
        }),
        err => {
            alert(err.message);
        }
      }
        e.preventDefault();
        
      }
}
}
</script>


<style>

</style>

