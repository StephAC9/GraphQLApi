<template>
 <div class="main-container-rooms">
    <div>
      <h2><strong>AVAILABLE ROOMS</strong></h2>
    </div>

    <div>
        <AddRoom :houseId="houseId"></AddRoom>
    </div>
    <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
            <v-card-title class="headline">DELETION NOTICE</v-card-title>
            <v-card-text>This room with all the devices in it will be completely removed <span style="font-size:25px; color:red;font-style:bold">!!!</span></v-card-text>
            <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="grey darken-1" text @click="dialog = false">Cancel</v-btn>
            <v-btn color="red darken-1" text @click="deleteRoom">Delete</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>

        <RoomItem @showDeleteDialog="showDeleteDialog"></RoomItem>
</div>
</template>

<script>
import DeleteNotice from './DeleteNotice'
import AddRoom from './AddRoom'
import RoomItem from './RoomItem'
import {mapGetters} from 'vuex'
import {
    mdiDelete,
  } from '@mdi/js'
export default {
    name:'Rooms',
    props:['houseId'],

    components:{
        AddRoom,
        RoomItem,
        DeleteNotice
    },

    data(){
        return{
            dialog: false,
            roomId:'',

            icons: {
                mdiDelete,
            }
        }
    },

     created () {
      this.$vuetify.theme.dark = true
    },

    methods:{
        showDeleteDialog(roomId){ 
            this.roomId = roomId
            this.dialog = true
        },

        deleteRoom(){
            this.dialog = false
            this.$store.dispatch('room/removeRoom',{roomId: this.roomId}) 
        }
    }
    
}
</script>

<style scoped>


  .main-container-rooms{
      text-align: center;
      display: flex;
      flex-direction:column;
      border-radius: 10px;
      background: transparent;
/*       background: rgb(114, 114, 112);
 */      padding: 10px;
      justify-content: space-between;
      flex-wrap:wrap;
  }

</style>