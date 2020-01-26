<template>
 <div class="main-container-devices">
    <div>
      <h2 style="text-transform: uppercase"><strong>{{roomDescriptor}} DEVICES</strong></h2>
      <div>
          <AddDevice :roomId="roomId"></AddDevice>
      </div>
    </div>

         <div class="container-devices" >
                <v-card class="device-contain" v-for="(device,index) in devices" :key="index"> 
                    <div class="device-image">
                          <img :src="require(`@/assets/${device.image.imageUrl}.jpg`)" alt="Avatar" style="height: 50px; width:90%">
                   </div>
                    <div style="margin:3px">
                        <h4><b>{{device.descriptor}}</b></h4>
                    </div>
                    <div class="container-action">
                        <div>
                            <v-switch v-model="deviceStatus" color="yellow" style="height: 20px"></v-switch>
                        </div>
                        <div style="text-align:end">
                            <v-btn text icon color="rgb(255, 100, 200,1)">
                                <v-icon style="width:5px;" @click="addToFavorite(device.id)">mdi-heart</v-icon>
                            </v-btn>
                             <v-icon color="rgb(255, 50, 50,1)" left style="width:20px" @click="openDeleteNotice(device.id, device.descriptor)">{{ icons.mdiDelete }}</v-icon>

                            </div>
                    </div> 
                    <v-dialog v-model="dialog" persistent max-width="290">
                    <v-card>
                        <v-card-title class="headline">DELETION NOTICE</v-card-title>
                        <v-card-text>The {{descriptor}} will be permanently removed <span style="font-size:25px; color:red;font-style:bold">!!!</span></v-card-text>
                        <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn color="grey darken-1" text @click="dialog = false">Cancel</v-btn>
                        <v-btn color="red darken-1" text @click="removeDevice()">Delete</v-btn>  
                        </v-card-actions>
                    </v-card>
                    </v-dialog>           
            </v-card>
         </div>

</div>
</template>

<script>
import AddDevice from './AddDevice'
import {mapGetters} from 'vuex'
import {
    mdiDelete,
    mdiHeart
  } from '@mdi/js'
export default {
    name:'Devices',

    props:['roomId','roomDescriptor'],

    components:{
        AddDevice
    },

    data(){
        return{
            deviceStatus: false,
            dialog: false,
            showList: false,
            id: null,
            descriptor: null,
            icons: {
                mdiDelete,
                mdiHeart
            },
            devicesNames: [
                { text: 'Lamp' },
                { text: 'Coffe maker' },
                { text: 'Air-conditioner' },
                { text: 'Dishwasher' },
                { text: 'SmartTv' },
                { text: 'Windows blind' },
            ],
            closeOnContentClick: true,
        }
    },

    computed:{
        ...mapGetters('device',['devices']),
        
    },
    
    methods:{
        openDeleteNotice(deviceId, name){
            this.id = deviceId
            this.descriptor = name
            this.dialog = true
        },
        removeDevice(){
            this.$store.dispatch('device/removeDevice',{id: this.id})
            this.dialog = false
        },
    

        addToFavorite(value){
            console.log('addToFav id: '+value)
            this.$store.dispatch('device/addToFavorites',{id: value})
        },


    }
    
}
</script>

<style scoped>
  .main-container-devices{
      text-align: center;
      display: flex;
      flex-direction:column;
      border-radius: 10px;
      background: rgb(114, 114, 112);
      padding: 10px;
      justify-content: space-between;
      flex-wrap:wrap;
  }

  .container-devices{
      background-color: rgb(153, 149, 149,1);
      border-radius: 10px;
      display: flex;
      justify-content: space-evenly;      
      padding: 10px;
      flex-wrap:wrap;     
      background-size: cover;
      overflow:hidden;
  }

  .device-contain {
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: space-around;   
    max-width: 130px;
    min-width: 130px;
    margin: 10px;
    padding: 5px; 
    border-radius: 10px;
}
    .container-action {
        border-radius: 10px;
        background: rgb(241, 238, 230);
        display: flex;
        padding: 5px;
        flex-direction: column;
    }


</style>