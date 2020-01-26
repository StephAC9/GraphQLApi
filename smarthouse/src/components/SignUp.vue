<template>
    <div class="sign-container">
            <div class="container-child"></div>
            <div class="container-child">
                <v-card class="elevation-12">
                    <v-toolbar color="dark" dark >
                        <v-toolbar-title style="color:gray">Create new account</v-toolbar-title>
                        <div class="flex-grow-1"></div>
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="valid" ref="form">
                            <div class="sign-detail">
                                <v-text-field
                                    v-model="fullname"
                                   :rules="nameRules"
                                    id="fullname"
                                    color="dark"
                                    label="FullName"
                                    name="name"
                                    type="text" 
                                    required>
                                </v-text-field>
                            </div>
                            <div class="sign-detail">
                                <v-text-field
                                    v-model="email"
                                    :rules="emailRules"
                                    id="email"
                                    color="dark"
                                    label="E-mail"
                                    name="email"
                                    type="email" 
                                    required>
                                </v-text-field>
                            </div>
                            <div class="sgin-detail">
                                <v-text-field
                                    v-model="password"
                                    :rules="passwordRules"
                                    id="password"
                                    color="dark"
                                    label="Password"
                                    name="password"
                                    type="password" >
                                </v-text-field>
                            </div>
                            <div class="sgin-detail">
                                <v-text-field
                                    v-model="confirmPassword"
                                    id="confirmPassword"
                                    color="dark"
                                    label="Confirm password"
                                    name="confirmPassword"
                                    type="password" 
                                    :rules="confirmPasswordRules"
                                    >
                                </v-text-field>
                            </div>
                            <v-card-actions style="margin-top:20px">
                                <div class="flex-grow-1"></div>
                                <v-btn 
                                :disabled="!valid && !loadingDialog && !userAlreadyExist" 
                                color="dark" 
                                style="margin-right:10px" 
                                @click="onSignup"
                                :loading="loadingDialog"
                                >Create</v-btn>
                            </v-card-actions>

                            <v-dialog
                                v-model="loadingDialog"
                                hide-overlay
                                persistent
                                width="300"
                                >
                                <v-card color="rgb(153, 149, 149,1)" dark >
                                    <v-card-text>
                                    Account creation...
                                    <v-progress-linear
                                        style="margin:3px"
                                        indeterminate
                                        color="white"
                                        class="mb-0"
                                    ></v-progress-linear>
                                    </v-card-text>
                                </v-card>
                            </v-dialog>
                        </v-form>
                    </v-card-text>
                    <v-btn @click="gotoLogin" text style="margin: 10px">Go back to login</v-btn>                     
                    </v-card>


                <v-dialog
                    v-model="userAlreadyExist"
                    hide-overlay
                    persistent
                    max-width="290"
                    >
                    <v-card color="red">

                        <v-card-title class="headline"><b>Oops!!</b></v-card-title>
                    </v-card>

                        <v-card-text class="white">
                            <span style="color:gray">Email provided is already linked to an account. Try with another email or go back to the login page please!</span>
                        </v-card-text>

                        <v-card-actions class="white">

                        <div class="flex-grow-1"></div>
                        <v-btn color="gray" @click="resetUserAlreadyExist"> 
                            OK
                        </v-btn>
                        </v-card-actions>
                </v-dialog>


            </div>
            <div class="container-child"> </div> 
    </div>      
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name :'SignUp',


    data(){
        return{
            emailExist: false,
            loadingDialog :false,

            fullname:'',
            email:'',
            // phoneNum:'',
            password:'',
            confirmPassword:'',
        
            valid: true,
            show1: false,

            nameRules: [
                v => !!v || 'Name is required',
                v => new RegExp('^(.{3,25}$)').test(v) || 'Name must be atleast 3 and atmost 25 characters long',
                v => /^([a-z']+(-| )?)+$/i.test(v) || 'Name is not valid'
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(v).toLowerCase()) || 'Invalid E-mail address',
            ],

            passwordRules: [
                v => !!v || 'Password is required',
                v => new RegExp('^(.{6,12}$)').test(v) || 'Password must be between 6 to 12 characters long',
                v => new RegExp('^(?=.*[A-Z])').test(v) || 'Password must contain at least 1 uppercase alphabetical character',
                v => new RegExp('^(?=.*[0-9])').test(v) || 'Password must contain at least 1 numeric character',
            ],

            confirmPasswordRules: [
                v => !!v || 'Password is required',
                v => this.password == this.confirmPassword || 'Passwords do not match'
            ],

        }
    },

     computed:{
        ...mapGetters('owner',['userAlreadyExist']),

    },

    methods: {
        reset () {
            this.$refs.form.reset()
        },
        resetValidation () {
            this.$refs.form.resetValidation()
        },

        gotoLogin(){
            this.$router.push('/signin')
        },
         onSignup(){
            console.log('Sign up...')
          if (this.$refs.form.validate()) {
            this.snackbar = true
             this.$store.dispatch('owner/signUp',{email: this.email, password: this.password, name: this.fullname})
             this.loadingDialog = true
          }
            this.resetValidation()
        },
        resetUserAlreadyExist(){
            this.$store.dispatch('owner/resetUserExist')
            this.reset()
        }
    },

     watch: {
      loadingDialog (value) {
        if (!value) return
        setTimeout(() => (this.loadingDialog = false), 2000)
      },
    },

}
</script>

<style scoped>

.sign-container{
    align-content: center;
    display: flex;
    justify-content: space-evenly;
    margin: 10%;
}

.container-child{
    min-width: 300px;
    flex-basis: 40%;
    align-content: center;
}


.a :hover{
    color: rgb(57, 209, 57);
}

.sign-detail{
    text-align: center;
    display: flex;
}

.white{
    background: white;
}





</style>
