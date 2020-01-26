<template>
    <div class="container-rooms" >
        <v-card class="room-contain" v-for="(room,index) in rooms" :key="index"> 
               <img @click="gotoRoom(room.id,room.descriptor)" :src="require(`@/assets/${room.image.imageUrl}.jpg`)" alt="Avatar" style="width:80%; height:70%">
            <div class="container">
            <div style="flex-basis:50%; text-align:end">
                <h2><b>{{room.descriptor}}</b></h2>
                <h4><span>2</span> devices </h4>  
            </div>
            <div style="flex-basis:50%; text-align:end; margin-top:15px">
                <v-icon color="rgb(255, 50, 50,1)" left style="width:25px" @click="showDeleteDialog(room.id)">{{ icons.mdiDelete }}</v-icon>
            </div>
            </div>            
       </v-card>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {
    mdiDelete,
  } from '@mdi/js'
export default {
    name:'RoomItem',
    data(){
        return{
            dialog: false,

            icons: {
                mdiDelete,
            }
        }
    },

    computed:{
        ...mapGetters('room',['rooms']),
         ...mapGetters('house',['currentHouse'])
    },

     methods:{
        showDeleteDialog(roomId){
            this.$emit('showDeleteDialog', roomId)
        },
        gotoRoom(roomId,descriptor){
            this.$store.dispatch('device/setDevices',{id: roomId})
            this.$router.push({name: 'in_room', params: {id:roomId ,descriptor:descriptor} })
        },


    }
}
</script>

<style scoped>

.container-rooms{
    background: rgb(245, 240, 240); 
    border-radius: 10px;
    display: flex;
    justify-content: space-around;      
    padding: 10px;
    flex-wrap:wrap;
    background-size: cover;
    overflow:hidden;
  }

  .room-contain {
    margin-top: 10px;  
    font-size: 10px;  
    box-shadow: 0 4px 8px 0 rgba(238, 235, 235, 0.2);
    transition: 0.3s; 
    max-width: 300px;
    min-width: 200px;
    max-height: 200px;
    padding: 10px; 
    border-radius: 10px;
    background-color: rgb(179, 166, 166)
}

.room-contain:hover {
  box-shadow: 0 10px 19px 0 rgba(251, 252, 252, 0.2);
} 

 .container {
    display: flex;
    padding: 5px;
}

</style>