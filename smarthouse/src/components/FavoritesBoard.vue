 <template>
         <div class="container-devices" >
                <v-card class="device-contain" v-for="(device,index) in favoriteDevices" :key="index"> 
                    <div>
                        <v-dialog v-model="dialog" persistent max-width="290">
                        <v-card>
                            <v-card-title class="headline">REMOVAL NOTICE</v-card-title>
                            <v-card-text>{{descriptor}} locate in your {{roomDescriptor}} will be removed from your favorites.<span style="font-size:25px; color:red;font-style:bold">!!!</span></v-card-text>
                            <v-card-actions>
                            <div class="flex-grow-1"></div>
                            <v-btn color="grey darken-1" text @click="dialog = false">Cancel</v-btn>
                            <v-btn color="red darken-1" text @click="removeFromFav()">Remove</v-btn>  
                            </v-card-actions>
                        </v-card>
                        </v-dialog>           
                    </div>
                    <div class="device-image">
                           <img :src="require(`@/assets/${device.image.imageUrl}.jpg`)" alt="Avatar" style="height: 50px; width:90%">
                    </div>
                    <div style="margin:3px">
                        <h4><b>{{device.descriptor}}</b></h4>
                    </div>
                    <div style="margin:3px">
                        <span>in</span><br>
                          <h4><b>{{device.room.descriptor}}</b></h4>
                      </div>
                    <div class="container-action">
                        <div>
                            <v-switch color="yellow" style="height: 20px"></v-switch>
                        </div>
                        <div style="text-align:end">
                             <v-icon color="rgb(255, 50, 50,1)" left style="width:20px" @click="removeNotice(device.id, device.descriptor,device.room.descriptor)">{{ icons.mdiDelete }}</v-icon>
                        </div>
                    </div> 
            </v-card>
         </div>

</template> 

<script>
import {mapGetters} from 'vuex'
import {
    mdiDelete,
    mdiHeart
  } from '@mdi/js'
  export default {
    name:'FavoritesBoard',

    data () {
      return {
        dialog: false,
        id: null,
        descriptor: null,
        roomDescriptor: null,
        icons: {
                mdiDelete,
                mdiHeart
            },
            favoriteDevices:[]
      }
    },
   

    computed:{
      ...mapGetters('device',['favorites'])
    },

    watch:{
        favorites(v){
            if(v !== null || v !== undefined){
                this.favoriteDevices = this.favorites
            }
        }
    },

    methods:{
        removeNotice(deviceId, deviceDescriptor,roomDescriptor){
            this.descriptor = deviceDescriptor
            this.id = deviceId
            this.roomDescriptor = roomDescriptor
            this.dialog = true
        },
        removeFromFav(){
            this.$store.dispatch('device/removeFromFavorites',{id: this.id})
            this.dialog = false
        }
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

    @media screen and (max-width: 660px) {
        .btn{
            font-size:5px;
            margin-right:5px;
            width: 30px;
        }
    }
</style>