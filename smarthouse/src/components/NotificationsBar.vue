<template>
    <div class="notification-main-container">
        <div class="my-2">
            <FavoriteBtn style="margin-top: 5px"></FavoriteBtn>
         </div>
        <div></div>
        <div class="temp-display">
            <div><strong><span class="ref">TEMPERATURE IN  </span> <span class="data">{{temperatureIn}}°C</span></strong></div>
            <div><strong><span class="ref">TEMPERATURE OUT </span> <span class="data">{{temperatureOut}}°C</span></strong></div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import FavoriteBtn from './FavoritesBtn'
  export default {
      name:'NotificationsBar',
      components:{
          FavoriteBtn
      },
     
        data () {
            return {
                temperatureIn: 0,
                temperatureOut: 0
            }
        },
        computed:{
           // ...mapGetters('house',['sensor'])
        },
        watch:{
        /*     sensor(val){
                if(val !== null || val !== undefined){
                    this.temperatureIn = this.sensor.internalTemp
                    this.temperatureOut = this.sensor.externalTemp
                    this.elConsumption = this.sensor.electricalConsumption
                }
            } */
        }
  }
</script>

<style scoped>
    .notification-main-container{
        display: flex;
        flex-basis: 20%;
        justify-content: space-around
    }
    .temp-display{
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        justify-content: end;        
    }

 
    .data{
        color: azure;
        font-size: 11px
    }
</style>
