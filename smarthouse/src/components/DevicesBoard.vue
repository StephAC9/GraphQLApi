<template>
    <div>
        <div class="devices-board">
            <div class="column" style="flex:1;color:grey">
            </div>
            <div class="column" style="flex:2; color:rgb(233, 226, 226);">
                <Devices :roomId="roomId" :roomDescriptor="roomDescriptor"></Devices> 
            </div>
            <div class="column" style="flex:1;"></div>
        </div>

    </div>
</template>
<script>
import Devices from './Devices'
import {mapGetters} from 'vuex'

export default {
    name:'DevicesBoard',

     components:{
         Devices
     },
     data(){
         return{
             roomId : '',
             roomDescriptor: ''
         }
     },

     created () {
      this.roomId = this.$route.params.id
      this.roomDescriptor = this.$route.params.descriptor
    },
}
</script>
<style scoped>
    .devices-board{
      display: flex;
    }

    .column{
        text-align: center;
    }

    main-column{
        display: flex;
        flex-direction: column;
    }

</style>