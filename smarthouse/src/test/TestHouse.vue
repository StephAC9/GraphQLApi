 <template>
         <div class="container-devices" >
                <v-card class="device-contain" v-for="(device,index) in houseDevices" :key="index"> 
                    <div class="device-image">
<!--                            <img :src="require(`@/assets/${device.image.imageUrl}.jpg`)" alt="Avatar" style="height: 50px; width:90%">
 -->                    </div>
                    <div style="margin:3px">
                        <h4><b>{{device.deviceName}}</b></h4>
                    </div>
                    <div style="margin:3px">
                    </div>
                    <div class="container-action">
                        <div>
                            <v-switch v-model="status" color="yellow" style="height: 20px"></v-switch>
                        </div>
                        <div style="height:20px">
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
    name:'TestHouse',

    data () {
      return {
        status: false,
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
    created(){
      this.$store.dispatch('device/setFavorites')
      console.log(this.houseDevices)
    },

    computed:{
      ...mapGetters('house',['houseDevices'])
    },

    watch:{
        favorites(v){
            if(v !== null || v !== undefined){
                this.favoriteDevices = this.favorites
            }
        },
        houseDevices(v){
            if(v !== null || v !== undefined){
                console.log(v)
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
            this.$store.dispatch('owner/removeFromFavorites',{id: this.id})
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
        background: rgb(100, 99, 97);
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