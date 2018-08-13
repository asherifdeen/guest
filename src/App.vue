<template>
    <v-app>
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
  components: {
    Navbar
  }
}
</script>


<style>

</style>
