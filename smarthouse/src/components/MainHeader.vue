<template>
    <div class="main-nav-bar"> 
      <div class="app-title">
        <h1>SMART HOUSE</h1>
      </div>
      <div class="bar-container">
        <div class="bar-element" style="padding:5px">
           <NavigationBtn @goBack="goBack" @goIn="goIn"></NavigationBtn>
        </div>
        <div class="bar-element b" style="font-weight:bold">
          <img class="logo" src="@/assets/smarthus.png" alt="smart house" style="margin-top:20px"><br>
          <span style="cursor:pointer; color:rgb(65, 62, 62); font-size:11px" @click="goHome">MAIN HOUSE</span>
        </div>
        <div class="bar-element" >
          <div class="bar_right_element" v-if="isOwnerAuthenticated">
           <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn
                color="transparent"
                dark
                v-on="on">
                <v-icon>{{ icons.mdiAccount }}</v-icon> 
                <label class="user-name">{{getCurrentOwner.name}}</label>
                </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in items" :key="index" @click="selectedAction(item.title)" >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          </div>

          <div class="bar_right_element" v-if="!isOwnerAuthenticated">
            <v-btn class="element a" @click="gotoSignIn">
              <v-icon style="color:gray">{{ icons.mdiLock }}</v-icon>
              <div class="el" style="margin-top:5px"><strong style="color:grey">LOG IN</strong></div>
            </v-btn>
          </div>
        </div>
    </div>
      <div>
<!--         <NotificationsBar></NotificationsBar>      
 -->      </div>
    </div>
</template>

<script>
import NotificationsBar from './NotificationsBar'
import NavigationBtn from './NavigationBtn'
import {mapGetters} from 'vuex'
import {
    mdiAccount,
    mdiLock
  } from '@mdi/js'
export default {
    name:'MainHeader',
    components:{
      NotificationsBar,
      NavigationBtn
    },
    props: {
      prepend: String,
    },


    data(){
      return{
        alertOn: false,
        actionTitle:'',
        items: [
          { title: 'Profile' },
          { title: 'Log out' },       
        ],
        ownerName:'',
    

          icons: {
              mdiAccount,
              mdiLock
              },
        }
    },
    computed:{
        ...mapGetters('owner',['isOwnerAuthenticated','getCurrentOwner']),
        ...mapGetters('helper',['inWlcPage'])
    },

   watch:{
        isOwnerAuthenticated(value){
          if(value === false){
            this.signOut()
            this.$router.replace('/')
          }
        },
        getCurrentOwner(value){
          if(value !== null || value !== undefined){
            this.ownerName = this.getCurrentOwner.name
          }else value === ''
        },
       
    }, 

    methods:{
      signOut(){
        this.$store.dispatch('owner/logout')
        this.$store.dispatch('house/logout')
      },

      gotoSignIn(){
        this.$router.push('/signin')
      },

      gotoSignUp(){
        this.$router.push('/signup')
      },

      goBack(){
        this.$router.go(-1)
      },

      goIn(){
        if(this.isOwnerAuthenticated){
          this.$router.replace({name: 'user-profile'})
        }else {
          this.$router.replace({name: 'signin'})
        }
      },
      goHome(){
        this.$router.replace('/')
      },

       selectedAction(value){
             this.itemTitle = value
            switch(this.itemTitle){
                case'Profile':
                this.$router.replace({name:'user-profile'})
                break
                case'Log out':
                  this.signOut()
                break
              
            }
        },
    }

}
</script>

<style scoped>
 .main-nav-bar{
    display: flex;
    flex-direction: column;
  }
  .app-title{
    background: rgb(245, 240, 240); 
    padding: 10px;
    color: rgb(214, 208, 208);
    text-align: center;
  }

  .back{
    text-align: left;
    color: rgb(238, 232, 232);
    font-weight: bold;
    cursor: pointer;
  }
  .b:hover{
    color: rgb(94, 91, 91);
  }

  .logo{
    width: 30px;
    height: 30px;
  }
  .bar-container{
    text-align: center; 
    background: rgb(219, 208, 208);

/*     background: rgb(209, 230, 225);
 */    display: flex;
    justify-content: space-between;
  }
  .bar-element{
    flex-basis: 30%;
  }

  .element{
    display: flex;
    cursor: pointer;
    color:rgb(243, 241, 241);
  }

  .bar_right_element{
    margin-top: 15px;
    flex-wrap:wrap;
    display: flex;
    justify-content: space-evenly;
  }

  label{
    color: rgb(247, 244, 244);
  }
  .element:hover{
    color: rgb(65, 62, 62);
  }


  .user-name {
    text-transform: lowercase;
    margin-top:6px;
    margin-left:5px;
    color:rgb(100, 100, 100);
}

  .user-name::first-letter {
      text-transform: uppercase;
      font-weight: bold;
  }
  .alerts{
        width: 60%;
        margin: 0 auto;
    }

    @media screen and (max-width: 660px) {
        .el{
          font-size: 10px;
        }   
    }
</style>