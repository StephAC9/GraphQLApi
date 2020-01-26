<template>  
<div class="adding-room-container">
   <!--  -->
    <div class="menus">
        <v-menu top :close-on-content-click="closeOnContentClick">
            <template v-slot:activator="{ on }">
                <v-btn class="add-room" color="grey" dark v-on="on" > <strong>ADD ROOM</strong> </v-btn>
            </template>
            <v-list>
                <v-list-item v-for="(title, index) in roomNames" :key="index" @click="selectRoom(title.text)" >
                <v-list-item-title>{{ title.text }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Confirm</v-card-title>

        <v-card-text>
            <span >Would like to add the <b>{{selectedRoom}}?</b></span>
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn
            color="gray"
            text
            @click="dialog = false" >
            ABANDON
          </v-btn>
          <Overlay @confirm="onAddClicked"></Overlay>
          <!-- <v-btn
            class="btn"
            @click="onAddClicked"
            color="gray"
            style="margin-right:10px; font-size:10px; font-style:bold"
            >
            ADD
            </v-btn> -->

           <!--  <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
            </v-overlay> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
</div>      


</template>

<script>
import Overlay from './Overlay'
import {mapGetters} from 'vuex'
export default {
    name:'AddRoom',
    components:{
        Overlay
    },

    data(){
        return{
            dialog: false,
            loadingDialog :false,
            selectedRoom:'',
            roomName:'',
            imgUrl:'',
            userID:'',
            roomNames: [
                { text: 'Livingroom' },
                { text: 'Bedroom' },
                { text: 'Kitchen' },
                { text: 'Office' },
                { text: 'Outdoor' },
            ],
            closeOnContentClick: true,
            overlay: false,
        }
    },
        computed:{
            ...mapGetters('house',['currentHouseId']),
        },
        
    methods:{
        selectRoom(value){
             this.selectedRoom = value
             this.dialog = true

            switch(this.selectedRoom){
                case'Livingroom':
                this.roomName = 'Livingroom'
                this.imgUrl = 'living_room'
                break
                case'Bedroom':
                this.roomName = 'Bedroom'
                this.imgUrl = 'bedroom'
                break
                case'Kitchen':
                this.roomName = 'Kitchen'
                this.imgUrl = 'kitchen'
                break
                case'Office':
                this.roomName = 'Office'
                this.imgUrl = 'office'
                break
                case'Outdoor':
                this.roomName = 'Outdoor'
                this.imgUrl = 'outdoor'
                break 
            }
        },


        onAddClicked () {
            this.overlay = true
            console.log('currentHouseId :',this.currentHouseId +' '+'Descriptor: '+this.roomName)
            this.dialog = false
            setTimeout(() => {
                this.overlay = false
                this.$store.dispatch('room/addNewRoom',{houseId: this.currentHouseId, descriptor: this.roomName})
                }, 3000)
            console.log('overlay: '+this.overlay) 
        },
    
    
    },



     watch: {
      /* overlay (val) {
          console.log('overlay: '+this.overlay)
        val && setTimeout(() => {
          this.overlay = false
        }, 3000)
      }, */
    },
    
}
</script>

<style scoped>
    .adding-room-container{
        text-align: center;
        border-radius: 10px;
        padding: 10px;
        max-width: 100px;
        min-width: 80px;
        margin: 20px;
        box-shadow: 0 10px 19px 0 rgba(0,0,0,0.2);
    }

    .add-btn{
        text-align: center;
        display: flex;
        justify-content: space-between;
        margin: 10px; 
    }

    .add-room {
        margin: 10px;
        width: 30px;
        font-size: 10px;  
        transition: 0.3s;
    }

    .add-room:hover {
        box-shadow: 0 10px 19px 0 rgba(0,0,0,0.2);
        background: grey;
        }

     .headline{
         background: rgb(233, 226, 226);
         padding: 20px;
         text-align: center;
         margin-bottom: 10px;
     }   

</style>