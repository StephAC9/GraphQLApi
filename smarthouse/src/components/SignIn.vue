<template>
    <div class="welcome-container">
            <div class="container-child"></div>
        
            <div class="container-child">
                <v-card class="elevation-12">
                    <v-toolbar color="rgb(209, 230, 225)" dark >
                        <v-toolbar-title style="color:grey">Login</v-toolbar-title>
                        <div class="flex-grow-1"></div>
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="valid" ref="form">
                            <div class="login-detail">
                                <span style="margin-top:24px;margin-right:10px"><v-icon>{{ icons.mdiAccount }}</v-icon></span>
                                
                                <v-text-field
                                    v-model="email"
                                    :rules="emailRules"
                                    color="dark"
                                    label="Email"
                                    name="email"
                                    type="email" >
                                </v-text-field>
                            </div>
                            <div class="login-detail">
                                <span style="margin-top:24px;margin-right:10px"><v-icon>{{ icons.mdiLock }}</v-icon></span>
                                <v-text-field
                                    v-model="password"
                                    id="password"
                                    color="dark"
                                    label="Password"
                                    name="password"
                                    type="password" >
                                </v-text-field>
                            </div>
                        </v-form>
                            <v-card-actions style="margin-top:20px">
                                <div class="flex-grow-1"></div>
                                    <v-btn
                                    class="btn"
                                    @click="logMeIn"
                                    :disabled="!valid" 
                                    color="dark"
                                    style="margin-right:10px; font-size:10px; font-style:bold"
                                    >
                                    <strong>Login</strong>
                                    </v-btn>

                                    <v-overlay :value="overlay">
                                    <v-progress-circular indeterminate size="64"></v-progress-circular>
                                    </v-overlay>
                            </v-card-actions>
                    </v-card-text>
                    <v-btn @click="gotoSignup" text style="margin-left: 25px; text-align: center"><label><strong>Create new account</strong></label></v-btn><hr> 
                    <v-btn x-large color="rgb(250, 250, 250)" dark style="width:100%; font-size:10px"><label><strong>Recover your password</strong></label></v-btn>                    
                    </v-card>

                    <v-dialog
                        v-model="loginFailed"
                        hide-overlay
                        persistent
                        max-width="290"
                        >
                        <v-card color="red">

                            <v-card-title class="headline"><b>Oops!!</b></v-card-title>
                        </v-card>

                        <v-card-text class="white">
                            <span style="color:red">Incorrect Email or Password!</span>
                        </v-card-text>

                        <v-card-actions class="white">

                        <div class="flex-grow-1"></div>
                        <v-btn color="gray" @click="resetLoginFailed"> 
                            OK
                        </v-btn>
                        </v-card-actions>
                </v-dialog>

            </div>
            <div class="container-child">
                
            </div> 
    </div>      
</template>

<script>
    import {
    mdiAccount,
    mdiDelete,
    mdiLock
    } from '@mdi/js'
    import {mapGetters} from 'vuex'

export default {
    name :'WelcomePage',

     props: {
      prepend: String,
    },

    data(){
        return{
            valid: true,
            show1: false,
            email:'',
            password:'',
            icons: {
                mdiAccount,
                mdiDelete,
                mdiLock
            },
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(v).toLowerCase()) || 'Invalid E-mail address',
            ],
            overlay: false,
           
        }
    },
    computed:{
      ...mapGetters('owner',['isOwnerAuthenticated','loginFailed']),    
    },

    created(){
        this.email = ''
        this.password = ''
    },

    methods: {
         reset () {
            this.$refs.form.reset()
        },
        resetValidation () {
            this.$refs.form.resetValidation()
        },

    logMeIn(){ 
         console.log('Signing in...')
          if (this.$refs.form.validate()) {
              this.snackbar = true
              this.$store.dispatch('owner/login',{email: this.email, password: this.password})
              this.$store.dispatch('house/setHouses')  
             this.overlay = !this.overlay
          }
            this.resetValidation() 
    },
     gotoSignup(){
        this.$router.push('/signup')
    },
    resetLoginFailed(){
        this.$store.dispatch('owner/resetLoginFailed')
        this.reset()
    }
    },

    watch: {
      loadingDialog (value) {
        if (!value) return
        setTimeout(() => (this.loadingDialog = false), 2000)
      },
      overlay (val) {
        val && setTimeout(() => {
          this.overlay = false
        }, 3000)
      },

    },

}
</script>

<style scoped>

.welcome-container{
    align-content: center;
    margin: 10%;
    display: flex;
    justify-content: space-evenly;
}

.container-child{
    min-width: 270px;
    flex-basis: 30%;
    align-content: center;
}

.login-detail{
    text-align: center;
    display: flex;
}

label{
    color:rgb(93, 107, 112);
}
label:hover{
    color: rgb(78, 240, 240);
}
.btn :hover{
    color: aliceblue;
}





</style>