<template>
  <v-app id="app">
    <MainHeader></MainHeader>
    <v-content>
      <v-container fluid>
          <!-- <Alert-Danger></Alert-Danger>
          <WarningAlert></WarningAlert> -->
        <!--  <v-alert v-model="getsignUpSuccessAlert" type="success">
            Account created successfuly. <span style="margin:3px;color:white;font-size:17px">YOU CAN LOGIN NOW !!!</span>
        </v-alert>
        <v-alert v-model="getsignInSuccessAlert" type="success">
            Welcome  <span style="margin:3px;color:white;font-size:17px">{{user.name}}</span>
        </v-alert> -->
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer style="background:rgb(200,200,200.2)">
      <div class="px-4">&copy; {{ new Date().getFullYear() }}  <span style="font-size: 11px">Smart House web remote control. A Software Engineering project. By Stephan Ngaha</span></div>
    </v-footer>
  </v-app>
</template>

<script>
import MainHeader from './components/MainHeader'
import {mapGetters} from 'vuex'

  export default {
    name:'app',

    data(){
      return{
        alertOn: false,
      }
    },

    components:{
      MainHeader,
    },
    computed:{
      ...mapGetters('house',['alarms']),
      //...mapGetters(['getsignUpSuccessAlert']),
      //...mapGetters(['getsignInSuccessAlert']),
    },

    created(){
      //console.log(this.alarms[0].status)
    },

     watch:{
      
       
      /* getsignUpSuccessAlert(value){
        setTimeout(() => (this.$store.dispatch('users/resetSignUpSuccessAlert')), 5000)
      },

      getsignInSuccessAlert(value){
        setTimeout(() => (this.$store.dispatch('users/resetSignInSuccessAlert')), 3000)
      }, */
    } 
  }
</script>

<style>

#app { 
  background-image: url("./assets/bg11.jpg");
  background-size: cover;
  overflow:hidden;
}
  
</style>
